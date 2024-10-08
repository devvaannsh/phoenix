/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */

// @INCLUDE_IN_API_DOCS

/*globals Phoenix, JSZip, Filer, path*/

define(function (require, exports, module) {
    const FileSystem = require("filesystem/FileSystem"),
        FileSystemError = require("filesystem/FileSystemError");

    const ignoredFolders = [ "__MACOSX" ];

    async function _ensureExistsAsync(path) {
        return new Promise((resolve, reject)=>{
            Phoenix.VFS.ensureExistsDir(path, (err)=>{
                if(err){
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    function _copyZippedItemToFS(path, item, destProjectDir, flattenFirstLevel, zipControl) {
        return new Promise(async (resolve, reject) =>{ // eslint-disable-line
            try {
                let destPath = `${destProjectDir}${path}`;
                if(flattenFirstLevel){
                    // contents/index.html to index.html
                    let newPath = path.substr(path.indexOf("/") + 1);
                    destPath = `${destProjectDir}${newPath}`;
                    console.log(destPath);
                }
                if(item.dir){
                    await _ensureExistsAsync(destPath);
                    resolve(destPath);
                } else {
                    await _ensureExistsAsync(window.path.dirname(destPath));
                    item.async("uint8array").then(function (data) {
                        if(zipControl && !zipControl.continueExtraction){
                            reject("aborted");
                            return;
                        }
                        window.fs.writeFile(destPath, Filer.Buffer.from(data),
                            {encoding: window.fs.BYTE_ARRAY_ENCODING}, writeErr=>{
                                if(writeErr){
                                    reject(writeErr);
                                } else {
                                    resolve(destPath);
                                }
                            });
                    }).catch(error=>{
                        reject(error);
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    function _isNestedContentDir(zip) {
        let keys = Object.keys(zip.files);
        let rootEntries = {};
        for(let path of keys){
            let filePath = path.endsWith("/") ? path.slice(0, -1) : path; // trim last slah if present
            let item = zip.files[path];
            if(!item.dir && !filePath.includes("/")) { // file in root folder means not nested zip
                return false;
            }
            let baseName = filePath.split("/")[0];
            if(!ignoredFolders.includes(baseName)){
                rootEntries[baseName] = true;
            }
        }
        if(Object.keys(rootEntries).length === 1) {
            // lone content folder
            return true;
        }
        return false;
    }

    /**
     * Extracts a given binary zip data array to a specified location.
     * @param {UInt8Array} zipData - Binary zip data.
     * @param {string} projectDir - Directory to extract to.
     * @param {boolean} flattenFirstLevel - If set to true, then if zip contents are nested inside a directory,
     *          the nested directory will be removed in the path structure in the destination. For example,
     *          some zip may contain a `contents` folder inside the zip which has all the files. If we blindly
     *          extract the zip, all the contents will be placed inside a `contents` folder in the root instead 
     *          of the root directory itself. 
     *          See a sample zip file here: https://api.github.com/repos/StartBootstrap/startbootstrap-grayscales/zipball
     * @param {function(number, number): boolean} [progressControlCallback] - A function that can be used
     *          to view the progress and stop further extraction. The function will be invoked with (doneCount, totalCount).
     *          The function should return `false` if further extraction needs to be stopped. If nothing or `true` is returned,
     *          it will continue extraction.
     * @returns {Promise} - A promise that resolves when extraction is complete.
     */
    function unzipBinDataToLocation(zipData, projectDir, flattenFirstLevel = false, progressControlCallback) {
        if(!projectDir.endsWith('/')){
            projectDir = projectDir + "/";
        }
        return new Promise((resolve, reject)=>{
            JSZip.loadAsync(zipData).then(async function (zip) {
                let keys = Object.keys(zip.files);
                try{
                    const extractBatchSize = 500;
                    const isNestedContent = _isNestedContentDir(zip);
                    let extractError;
                    let totalCount = keys.length,
                        doneCount = 0,
                        extractPromises = [],
                        zipControl = {
                            continueExtraction: true
                        };
                    function _unzipProgress() {
                        doneCount ++;
                        if(progressControlCallback){
                            zipControl.continueExtraction = zipControl.continueExtraction
                                && progressControlCallback(doneCount, totalCount);
                        }
                    }
                    function _extractFailed(err) {
                        extractError = err || "extract failed";
                    }
                    for(let path of keys){
                        // This is intentionally batched as fs access api hangs on large number of file access
                        let extractPromise = _copyZippedItemToFS(path, zip.files[path], projectDir,
                            isNestedContent && flattenFirstLevel, zipControl);
                        // eslint-disable-next-line no-loop-func
                        extractPromise.then(_unzipProgress)
                            .catch(_extractFailed);
                        extractPromises.push(extractPromise);
                        if(extractPromises.length === extractBatchSize){
                            await Promise.allSettled(extractPromises);
                            extractPromises = [];
                        }
                        if(zipControl.continueExtraction === false){
                            reject(`Extraction cancelled by progress controller`);
                            return;
                        }
                        if(extractError){
                            reject(extractError);
                            return;
                        }
                    }
                    if(extractPromises.length) {
                        await Promise.allSettled(extractPromises);
                    }
                    if(extractError){
                        reject(extractError);
                        return;
                    }
                    console.log("Unzip complete: ", projectDir);
                    resolve();
                } catch (err) {
                    console.error('unzip failed', err);
                    reject(err);
                }
            });
        });
    }

    function _readContent(fileEntry) {
        return new Promise((resolve, reject)=>{
            fileEntry.read({encoding: window.fs.BYTE_ARRAY_ENCODING}, function (err, content, encoding, stat) {
                if (err){
                    if(err === FileSystemError.NOT_FOUND){
                        // this error is ok as the file may have been deleted while we were doing the backup.
                        resolve(null);
                        return;
                    }
                    reject(err);
                    return;
                }
                let blob = new Blob([content], {type:"application/octet-stream"});
                resolve(blob);
            });
        });
    }

    /**
     * Zips a given folder located at path to a jsZip object.
     * @param {string} fullPath to zip
     * @return {Promise<JSZip>} zip object
     */
    function zipFolder(fullPath) {
        return new Promise((resolve, reject)=>{
            const zip = new JSZip();
            let directory = FileSystem.getDirectoryForPath(fullPath);
            FileSystem.getAllDirectoryContents(directory, true).then(async contents => {
                for(let entry of contents){
                    let relativePath = path.relative(fullPath, entry.fullPath);
                    if(entry.isDirectory){
                        zip.folder(relativePath);
                    } else {
                        let blob = await _readContent(entry);
                        if(blob){
                            zip.file(relativePath, blob);
                        }
                    }
                }
                resolve(zip);
            }).catch(reject);
        });
    }

    /**
     *
     * @param url the zip fle URL
     * @param projectDir To extract to
     * @param flattenFirstLevel if set to true, then if zip contents are nested inside a directory, the nexted dir will
     * be removed in the path structure in destination. For Eg. some Zip may contain a `contents` folder inside the zip
     * which has all the contents. If we blindly extract the zio, all the contents will be placed inside a `contents`
     * folder in root and not the root dir itself.
     * See a sample zip file here: https://api.github.com/repos/StartBootstrap/startbootstrap-grayscales/zipball
     * @returns {Promise}
     */
    function unzipURLToLocation(url, projectDir, flattenFirstLevel = false) {
        return new Promise((resolve, reject)=>{
            window.JSZipUtils.getBinaryContent(url, async function(err, data) {
                if(err) {
                    console.error(`could not load zip from URL: ${url}\n `, err);
                    reject();
                } else {
                    unzipBinDataToLocation(data, projectDir, flattenFirstLevel)
                        .then(resolve)
                        .catch(reject);
                }
            });
        });
    }
    exports.unzipBinDataToLocation = unzipBinDataToLocation;
    exports.unzipURLToLocation = unzipURLToLocation;
    exports.zipFolder = zipFolder;
});
