/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 * Original work Copyright (c) 2012 - 2021 Adobe Systems Incorporated. All rights reserved.
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

/*jslint regexp: true */
/*global unescape */

// @INCLUDE_IN_API_DOCS

/**
 * Set of utilities for working with files and text content.
 */
define(function (require, exports, module) {


    require("utils/Global");

    var FileSystemError     = require("filesystem/FileSystemError"),
        DeprecationWarning  = require("utils/DeprecationWarning"),
        LanguageManager     = require("language/LanguageManager"),
        PerfUtils           = require("utils/PerfUtils"),
        Strings             = require("strings"),
        StringUtils         = require("utils/StringUtils");

    // These will be loaded asynchronously
    var DocumentCommandHandlers, LiveDevelopmentUtils;

    /**
     * @const {Number} Maximium file size (in megabytes)
     * @private
     *   (for display strings)
     *   This must be a hard-coded value since this value
     *   tells how low-level APIs should behave which cannot
     *   have a load order dependency on preferences manager
     */
    var MAX_FILE_SIZE_MB = 16;

    /**
     * @const {Number} Maximium file size (in bytes)
     *   This must be a hard-coded value since this value
     *   tells how low-level APIs should behave which cannot
     *   have a load order dependency on preferences manager
     */
    var MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

    /**
     * @var {List} list of File Extensions which will be opened in external Application
     * @private
     */
    var extListToBeOpenedInExtApp = [];

    /**
     * Asynchronously reads a file as UTF-8 encoded text.
     * @param {!File} file File to read
     * @param {boolean?} bypassCache - an optional argument, if specified will read from disc instead of using cache.
     * @param {object} [options]
     * @param {boolean} [options.ignoreFileSizeLimits]. Will read larger files than 16MB limit. will bypassCache +
     *          won't cache if enabled.
     * @param {boolean} [options.doNotCache] will not cache if enabled. Auto-enabled if ignoreFileSizeLimits = true
     * @return {$.Promise} a jQuery promise that will be resolved with the
     *  file's text content plus its timestamp, or rejected with a FileSystemError string
     *  constant if the file can not be read.
     */
    function readAsText(file, bypassCache, options = {}) {
        const result = new $.Deferred();
        let doNotCache = options.doNotCache;
        if(options.ignoreFileSizeLimits) {
            bypassCache = true;
            doNotCache = true;
        }

        file.read({ bypassCache: bypassCache, ignoreFileSizeLimits: options.ignoreFileSizeLimits, doNotCache},
            function (err, data, _encoding, stat) {
                if(!err && typeof data !== "string"){
                    result.reject(FileSystemError.UNSUPPORTED_ENCODING);
                } else if (!err) {
                    result.resolve(data, stat.mtime);
                } else {
                    result.reject(err);
                }
            });

        return result.promise();
    }

    /**
     * Asynchronously writes a file as UTF-8 encoded text.
     * @param {!File} file File to write
     * @param {!string} text
     * @param {boolean=} allowBlindWrite Indicates whether or not CONTENTS_MODIFIED
     *      errors---which can be triggered if the actual file contents differ from
     *      the FileSystem's last-known contents---should be ignored.
     * @return {$.Promise} a jQuery promise that will be resolved when
     * file writing completes, or rejected with a FileSystemError string constant.
     */
    function writeText(file, text, allowBlindWrite) {
        const result = new $.Deferred(),
            options = {};

        if (allowBlindWrite) {
            options.blind = true;
        }

        file.write(text, options, function (err) {
            if (!err) {
                result.resolve();
            } else {
                result.reject(err);
            }
        });

        return result.promise();
    }

    /**
     * Line endings crlf
     * @enum {string}
     */
    const LINE_ENDINGS_CRLF = "CRLF";

    /**
     * Line endings lf
     * @enum {string}
     */
     const LINE_ENDINGS_LF   = "LF";

    /**
     * Returns the standard line endings for the current platform
     * @return {LINE_ENDINGS_CRLF|LINE_ENDINGS_LF}
     */
    function getPlatformLineEndings() {
        return brackets.platform === "win" ? LINE_ENDINGS_CRLF : LINE_ENDINGS_LF;
    }

    /**
     * Scans the first 1000 chars of the text to determine how it encodes line endings. Returns
     * null if usage is mixed or if no line endings found.
     * @param {!string} text
     * @return {null|LINE_ENDINGS_CRLF|LINE_ENDINGS_LF}
     */
    function sniffLineEndings(text) {
        var subset = text.substr(0, 1000);  // (length is clipped to text.length)
        var hasCRLF = /\r\n/.test(subset);
        var hasLF = /[^\r]\n/.test(subset);

        if ((hasCRLF && hasLF) || (!hasCRLF && !hasLF)) {
            return null;
        }
        return hasCRLF ? LINE_ENDINGS_CRLF : LINE_ENDINGS_LF;

    }

    /**
     * Translates any line ending types in the given text to the be the single form specified
     * @param {!string} text
     * @param {null|LINE_ENDINGS_CRLF|LINE_ENDINGS_LF} lineEndings
     * @return {string}
     */
    function translateLineEndings(text, lineEndings) {
        if (lineEndings !== LINE_ENDINGS_CRLF && lineEndings !== LINE_ENDINGS_LF) {
            lineEndings = getPlatformLineEndings();
        }

        var eolStr = (lineEndings === LINE_ENDINGS_CRLF ? "\r\n" : "\n");
        var findAnyEol = /\r\n|\r|\n/g;

        return text.replace(findAnyEol, eolStr);
    }

    /**
     * @param {!FileSystemError} name
     * @return {!string} User-friendly, localized error message
     */
    function getFileErrorString(name) {
        // There are a few error codes that we have specific error messages for. The rest are
        // displayed with a generic "(error N)" message.
        var result;

        if (name === FileSystemError.NOT_FOUND) {
            result = Strings.NOT_FOUND_ERR;
        } else if (name === FileSystemError.NOT_READABLE) {
            result = Strings.NOT_READABLE_ERR;
        } else if (name === FileSystemError.NOT_WRITABLE) {
            result = Strings.NO_MODIFICATION_ALLOWED_ERR_FILE;
        } else if (name === FileSystemError.CONTENTS_MODIFIED) {
            result = Strings.CONTENTS_MODIFIED_ERR;
        } else if (name === FileSystemError.UNSUPPORTED_ENCODING) {
            result = Strings.UNSUPPORTED_ENCODING_ERR;
        } else if (name === FileSystemError.EXCEEDS_MAX_FILE_SIZE) {
            result = StringUtils.format(Strings.EXCEEDS_MAX_FILE_SIZE, MAX_FILE_SIZE_MB);
        } else if (name === FileSystemError.ENCODE_FILE_FAILED) {
            result = Strings.ENCODE_FILE_FAILED_ERR;
        } else if (name === FileSystemError.DECODE_FILE_FAILED) {
            result = Strings.DECODE_FILE_FAILED_ERR;
        } else if (name === FileSystemError.UNSUPPORTED_UTF16_ENCODING) {
            result = Strings.UNSUPPORTED_UTF16_ENCODING_ERR;
        } else {
            result = StringUtils.format(Strings.GENERIC_ERROR, name);
        }

        return result;
    }

    /**
     * Shows an error dialog indicating that the given file could not be opened due to the given error
     * @private
     * @deprecated Use DocumentCommandHandlers.showFileOpenError() instead
     *
     * @param {!FileSystemError} name
     * @return {!Dialog}
     */
    function showFileOpenError(name, path) {
        DeprecationWarning.deprecationWarning("FileUtils.showFileOpenError() has been deprecated. " +
                                              "Please use DocumentCommandHandlers.showFileOpenError() instead.");
        return DocumentCommandHandlers.showFileOpenError(name, path);
    }

    /**
     * Creates an HTML string for a list of files to be reported on, suitable for use in a dialog.
     * @param {Array.<string>} Array of filenames or paths to display.
     */
    function makeDialogFileList(paths) {
        var result = "<ul class='dialog-list'>";
        paths.forEach(function (path) {
            result += "<li><span class='dialog-filename'>";
            result += StringUtils.breakableUrl(path);
            result += "</span></li>";
        });
        result += "</ul>";
        return result;
    }

    /**
     * Convert a URI path to a native path.
     * On both platforms, this unescapes the URI
     * On windows, URI paths start with a "/", but have a drive letter ("C:"). In this
     * case, remove the initial "/".
     * @param {!string} path
     * @return {string}
     */
    function convertToNativePath(path) {
        path = unescape(path);
        if (path.indexOf(":") !== -1 && path[0] === "/") {
            return path.substr(1);
        }

        return path;
    }

    /**
     * Convert a Windows-native path to use Unix style slashes.
     * On Windows, this converts "C:\foo\bar\baz.txt" to "C:/foo/bar/baz.txt".
     * On Mac, this does nothing, since Mac paths are already in Unix syntax.
     * (Note that this does not add an initial forward-slash. Internally, our
     * APIs generally use the "C:/foo/bar/baz.txt" style for "native" paths.)
     * @param {string} path A native-style path.
     * @return {string} A Unix-style path.
     */
    function convertWindowsPathToUnixPath(path) {
        if (brackets.platform === "win") {
            path = path.replace(/\\/g, "/");
        }
        return path;
    }

    /**
     * Removes the trailing slash from a path or URL, if it has one.
     * Warning: this differs from the format of most paths used in Brackets! Use paths ending in "/"
     * normally, as this is the format used by Directory.fullPath.
     *
     * @param {string} path or URL
     * @return {string}
     */
    function stripTrailingSlash(path) {
        if (path && path[path.length - 1] === "/") {
            return path.slice(0, -1);
        }
        return path;

    }

    /**
     * Get the name of a file or a directory, removing any preceding path.
     * @param {string} fullPath full path to a file or directory
     * @return {string} Returns the base name of a file or the name of a
     * directory
     */
    function getBaseName(fullPath) {
        var lastSlash = fullPath.lastIndexOf("/");
        if (lastSlash === fullPath.length - 1) {  // directory: exclude trailing "/" too
            return fullPath.slice(fullPath.lastIndexOf("/", fullPath.length - 2) + 1, -1);
        }
        return fullPath.slice(lastSlash + 1);

    }

    /**
     * Returns a native absolute path to the 'brackets' source directory.
     * Note that this only works when run in brackets/src/index.html, so it does
     * not work for unit tests (which is run from brackets/test/SpecRunner.html)
     *
     * WARNING: unlike most paths in Brackets, this path EXCLUDES the trailing "/".
     * @return {string}
     */
    function getNativeBracketsDirectoryPath() {
        var pathname = decodeURI(window.location.pathname);
        return pathname.substr(0, pathname.lastIndexOf("/")); // In the web, native path is the base url
    }

    /**
     * Given the module object passed to JS module define function,
     * convert the path to a native absolute path.
     * Returns a native absolute path to the module folder.
     *
     * WARNING: unlike most paths in Brackets, this path EXCLUDES the trailing "/".
     * @return {string}
     */
    function getNativeModuleDirectoryPath(module) {
        var path;

        if (module && module.uri) {
            path = decodeURI(module.uri);

            // Remove module name and trailing slash from path.
            path = path.substr(0, path.lastIndexOf("/"));
        }
        return path;
    }

    /**
     * Get the file extension (excluding ".") given a path OR a bare filename.
     * Returns "" for names with no extension. If the name starts with ".", the
     * full remaining text is considered the extension.
     *
     * @param {string} fullPath full path to a file or directory
     * @return {string} Returns the extension of a filename or empty string if
     * the argument is a directory or a filename with no extension
     */
    function getFileExtension(fullPath) {
        var baseName = getBaseName(fullPath),
            idx      = baseName.lastIndexOf(".");

        if (idx === -1) {
            return "";
        }

        return baseName.substr(idx + 1);
    }

    /**
     * Get the file extension (excluding ".") given a path OR a bare filename.
     * Returns "" for names with no extension.
     * If the only `.` in the file is the first character,
     * returns "" as this is not considered an extension.
     * This method considers known extensions which include `.` in them.
     * @private
     * @deprecated Use LanguageManager.getCompoundFileExtension() instead
     *
     * @param {string} fullPath full path to a file or directory
     * @return {string} Returns the extension of a filename or empty string if
     * the argument is a directory or a filename with no extension
     */
    function getSmartFileExtension(fullPath) {
        DeprecationWarning.deprecationWarning("FileUtils.getSmartFileExtension() has been deprecated. " +
                                              "Please use LanguageManager.getCompoundFileExtension() instead.");
        return LanguageManager.getCompoundFileExtension(fullPath);
    }

    /**
     * Computes filename as relative to the basePath. For example:
     * basePath: /foo/bar/, filename: /foo/bar/baz.txt
     * returns: baz.txt
     *
     * The net effect is that the common prefix is stripped away. If basePath is not
     * a prefix of filename, then undefined is returned.
     *
     * @param {string} basePath Path against which we're computing the relative path
     * @param {string} filename Full path to the file for which we are computing a relative path
     * @return {string} relative path
     */
    function getRelativeFilename(basePath, filename) {
        if (!filename || filename.substr(0, basePath.length) !== basePath) {
            return;
        }

        return filename.substr(basePath.length);
    }

    /**
     * Determine if file extension is a static html file extension.
     * @param {string} filePath could be a path, a file name or just a file extension
     * @return {boolean} Returns true if fileExt is in the list
     */
    function isStaticHtmlFileExt(filePath) {
        DeprecationWarning.deprecationWarning("FileUtils.isStaticHtmlFileExt() has been deprecated. " +
                                              "Please use LiveDevelopmentUtils.isStaticHtmlFileExt() instead.");
        return LiveDevelopmentUtils.isStaticHtmlFileExt(filePath);
    }

    /**
     * Get the parent directory of a file. If a directory is passed, the SAME directory is returned.
     * @param {string} fullPath full path to a file or directory
     * @return {string} Returns the path to the parent directory of a file or the path of a directory,
     *                  including trailing "/"
     */
    function getDirectoryPath(fullPath) {
        return fullPath.substr(0, fullPath.lastIndexOf("/") + 1);
    }

    /**
     * Get the parent folder of the given file/folder path. Differs from getDirectoryPath() when 'fullPath'
     * is a directory itself: returns its parent instead of the original path. (Note: if you already have a
     * FileSystemEntry, it's faster to use entry.parentPath instead).
     * @param {string} fullPath full path to a file or directory
     * @return {string} Path of containing folder (including trailing "/"); or "" if path was the root
     */
    function getParentPath(fullPath) {
        // Guard clause: ensure fullPath is a non-empty string
        if (typeof fullPath !== "string" || !fullPath) {
            return "";
        }
        if (fullPath === "/") {
            return "";
        }
        return fullPath.substring(0, fullPath.lastIndexOf("/", fullPath.length - 2) + 1);
    }

    /**
     * Get the file name without the extension. Returns "" if name starts with "."
     * @param {string} filename File name of a file or directory, without preceding path
     * @return {string} Returns the file name without the extension
     */
    function getFilenameWithoutExtension(filename) {
        var index = filename.lastIndexOf(".");
        return index === -1 ? filename : filename.slice(0, index);
    }

    /**
     * @private
     * OS-specific helper for `compareFilenames()`
     * @return {Function} The OS-specific compare function
     */
    var _cmpNames = (function () {
        if (brackets.platform === "win") {
            // Use this function on Windows
            return function (filename1, filename2, lang) {
                var f1 = getFilenameWithoutExtension(filename1),
                    f2 = getFilenameWithoutExtension(filename2);
                return f1.localeCompare(f2, lang, {numeric: true});
            };
        }

        // Use this function other OSes
        return function (filename1, filename2, lang) {
            return filename1.localeCompare(filename2, lang, {numeric: true});
        };
    }());

    /**
     * Compares 2 filenames in lowercases. In Windows it compares the names without the
     * extension first and then the extensions to fix issue #4409
     * @param {string} filename1
     * @param {string} filename2
     * @param {boolean} extFirst If true it compares the extensions first and then the file names.
     * @return {number} The result of the compare function
     */
    function compareFilenames(filename1, filename2, extFirst) {
        var lang = brackets.getLocale();

        filename1 = filename1.toLocaleLowerCase();
        filename2 = filename2.toLocaleLowerCase();

        function cmpExt() {
            var ext1 = getFileExtension(filename1),
                ext2 = getFileExtension(filename2);
            return ext1.localeCompare(ext2, lang, {numeric: true});
        }

        function cmpNames() {
            return _cmpNames(filename1, filename2, lang);
        }

        return extFirst ? (cmpExt() || cmpNames()) : (cmpNames() || cmpExt());
    }

    /**
     * Compares two paths segment-by-segment, used for sorting. When two files share a path prefix,
     * the less deeply nested one is sorted earlier in the list. Sorts files within the same parent
     * folder based on `compareFilenames()`.
     * @param {string} path1
     * @param {string} path2
     * @return {number} -1, 0, or 1 depending on whether path1 is less than, equal to, or greater than
     *     path2 according to this ordering.
     */
    function comparePaths(path1, path2) {
        var entryName1, entryName2,
            pathParts1 = path1.split("/"),
            pathParts2 = path2.split("/"),
            length     = Math.min(pathParts1.length, pathParts2.length),
            folders1   = pathParts1.length - 1,
            folders2   = pathParts2.length - 1,
            index      = 0;

        while (index < length) {
            entryName1 = pathParts1[index];
            entryName2 = pathParts2[index];

            if (entryName1 !== entryName2) {
                if (index < folders1 && index < folders2) {
                    return entryName1.toLocaleLowerCase().localeCompare(entryName2.toLocaleLowerCase());
                } else if (index >= folders1 && index >= folders2) {
                    return compareFilenames(entryName1, entryName2);
                }
                return (index >= folders1 && index < folders2) ? -1 : 1;
            }
            index++;
        }
        return 0;
    }

    /**
     * @param {string} path Native path in the format used by FileSystemEntry.fullPath
     * @return {string} URI-encoded version suitable for appending to 'file:///`. It's not safe to use encodeURI()
     *     directly since it doesn't escape chars like "#".
     */
    function encodeFilePath(path) {
        var pathArray = path.split("/");
        pathArray = pathArray.map(function (subPath) {
            return encodeURIComponent(subPath);
        });
        return pathArray.join("/");
    }

    /**
     * @param {string} ext extension string a file
     * @return {string} returns true If file to be opened in External Application.
     *
     */
    function shouldOpenInExternalApplication(ext) {
        return extListToBeOpenedInExtApp.includes(ext);
    }

    /**
     * @param {string} ext File Extensions to be added in External App List
     *
     */
    function addExtensionToExternalAppList(ext) {

        if(Array.isArray(ext)) {
            extListToBeOpenedInExtApp = ext;
        } else if (typeof ext === 'string'){
            extListToBeOpenedInExtApp.push(ext);
        }
    }

    // Asynchronously load DocumentCommandHandlers
    // This avoids a temporary circular dependency created
    // by relocating showFileOpenError() until deprecation is over
    require(["document/DocumentCommandHandlers"], function (dchModule) {
        DocumentCommandHandlers = dchModule;
    });

    // Asynchronously load LiveDevelopmentUtils
    // This avoids a temporary circular dependency created
    // by relocating isStaticHtmlFileExt() until deprecation is over
    require(["LiveDevelopment/LiveDevelopmentUtils"], function (lduModule) {
        LiveDevelopmentUtils = lduModule;
    });

    // Define public API
    exports.LINE_ENDINGS_CRLF              = LINE_ENDINGS_CRLF;
    exports.LINE_ENDINGS_LF                = LINE_ENDINGS_LF;
    exports.getPlatformLineEndings         = getPlatformLineEndings;
    exports.sniffLineEndings               = sniffLineEndings;
    exports.translateLineEndings           = translateLineEndings;
    exports.showFileOpenError              = showFileOpenError;
    exports.getFileErrorString             = getFileErrorString;
    exports.makeDialogFileList             = makeDialogFileList;
    exports.readAsText                     = readAsText;
    exports.writeText                      = writeText;
    exports.convertToNativePath            = convertToNativePath;
    exports.convertWindowsPathToUnixPath   = convertWindowsPathToUnixPath;
    exports.getNativeBracketsDirectoryPath = getNativeBracketsDirectoryPath;
    exports.getNativeModuleDirectoryPath   = getNativeModuleDirectoryPath;
    exports.stripTrailingSlash             = stripTrailingSlash;
    exports.isStaticHtmlFileExt            = isStaticHtmlFileExt;
    exports.getDirectoryPath               = getDirectoryPath;
    exports.getParentPath                  = getParentPath;
    exports.getBaseName                    = getBaseName;
    exports.getRelativeFilename            = getRelativeFilename;
    exports.getFilenameWithoutExtension    = getFilenameWithoutExtension;
    exports.getFileExtension               = getFileExtension;
    exports.getSmartFileExtension          = getSmartFileExtension;
    exports.compareFilenames               = compareFilenames;
    exports.comparePaths                   = comparePaths;
    exports.MAX_FILE_SIZE                  = MAX_FILE_SIZE;
    exports.encodeFilePath                 = encodeFilePath;
    exports.shouldOpenInExternalApplication = shouldOpenInExternalApplication;
    exports.addExtensionToExternalAppList = addExtensionToExternalAppList;
});
