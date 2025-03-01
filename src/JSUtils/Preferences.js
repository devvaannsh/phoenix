/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 * Original work Copyright (c) 2013 - 2021 Adobe Systems Incorporated. All rights reserved.
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

/**

    This class parses configuration values from a JSON object. The expected
    name of the file is “.jscodehints” but this class does not actually read
    the file, it just provides a constant, FILE_NAME.

    The following properties are supported:

     "excluded-directories" - An array of directory strings that match
     directories that will be excluded from analysis. Directories may be
     excluded if they contain automated tests that aren’t relevant for code hinting.
     The wildcards “*” and “?” are supported in strings.

     "excluded-files" - An array of file strings that match files that will
     be excluded from analysis. Files are typically excluded because
     their API is in a JSON file or they are known to cause problems with either
     stability or performance. The wildcards “*” and “?” are supported in strings.

     "max-file-count" - Limits the total number of files that can be processed for
     hints.

     "max-file-size" - Files larger than this number of bytes will not be parsed.

     The strings in "excluded-directories" or "excluded-files" will be treated as a
     regular expression if the first and last characters of the string are the '/'
     character. Note the '\' character in a regular expression needs to be escaped
     to be valid in a JSON formatted file. For example "/[\d]/" becomes "/[\\d]/".

     Example file:

     {
     "excluded-directories" : ["/ex[\\w]*ed/"],
     "excluded-files" : ["require.js", "jquery*.js", "less*.min.js", "ember*.js", "d2?.js", "d3*"],
     "max-file-count": 100,
     "max-file-size": 524288
     }

 */

/*jslint regexp: true */

define(function (require, exports, module) {


    var StringUtils      = require("utils/StringUtils");

    /**
     *  Convert an array of strings with optional wildcards, to an equivalent
     *  regular expression.
     * @private
     * @param {Array.<string|RegExp>} settings from the file (note: this may be mutated by this function)
     * @param {?RegExp} baseRegExp - base regular expression that is always used
     * @param {?RegExp} defaultRegExp - additional regular expression that is only used if the user has not configured settings
     * @return {RegExp} Regular expression that captures the array of string
     * with optional wildcards.
     */
    function settingsToRegExp(settings, baseRegExp, defaultRegExp) {
        var regExpString = "";

        if (settings instanceof Array && settings.length > 0) {

            // Append base settings to user settings. The base
            // settings are builtin and cannot be overridden.
            if (baseRegExp) {
                settings.push("/" + baseRegExp.source + "/");
            }

            // convert each string, with optional wildcards to an equivalent
            // string in a regular expression.
            settings.forEach(function (value, index) {

                if (typeof value === "string") {
                    var isRegExp = value[0] === '/' && value[value.length - 1] === '/';

                    if (isRegExp) {
                        value = value.substring(1, value.length - 1);
                    } else {
                        value = StringUtils.regexEscape(value);

                        // convert user input wildcard, "*" or "?", to a regular
                        // expression. We can just replace the escaped "*" or "?"
                        // since we know it is a wildcard.
                        value = value.replace("\\?", ".?");
                        value = value.replace("\\*", ".*");

                        // Add "^" and "$" to prevent matching in the middle of strings.
                        value = "^" + value + "$";
                    }

                    if (index > 0) {
                        regExpString += "|";
                    }

                    regExpString = regExpString.concat(value);
                }
            });
        }

        if (!regExpString) {
            var defaultParts = [];
            if (baseRegExp) {
                defaultParts.push(baseRegExp.source);
            }
            if (defaultRegExp) {
                defaultParts.push(defaultRegExp.source);
            }
            if (defaultParts.length > 0) {
                regExpString  = defaultParts.join("|");
            } else {
                return null;
            }
        }

        return new RegExp(regExpString);
    }

    /**
     * Constructor to create a default preference object.
     *
     * @constructor
     * @param {Object=} prefs - preference object
     */
    function Preferences(prefs) {
        var BASE_EXCLUDED_DIRECTORIES = null, /* if the user has settings, we don't exclude anything by default */
            // exclude node_modules for performance reasons and because we don't do full hinting for those anyhow.
            DEFAULT_EXCLUDED_DIRECTORIES = /node_modules/,
            // exclude require and jquery since we have special knowledge of those
            BASE_EXCLUDED_FILES = /^require.*\.js$|^jquery.*\.js$/,
            DEFAULT_MAX_FILE_COUNT = 100,
            DEFAULT_MAX_FILE_SIZE = 512 * 1024;

        if (prefs) {
            this._excludedDirectories = settingsToRegExp(prefs["excluded-directories"],
                                                         BASE_EXCLUDED_DIRECTORIES,
                                                         DEFAULT_EXCLUDED_DIRECTORIES);
            this._excludedFiles = settingsToRegExp(prefs["excluded-files"],
                BASE_EXCLUDED_FILES);
            this._maxFileCount = prefs["max-file-count"];
            this._maxFileSize = prefs["max-file-size"];

            // sanity check values
            if (!this._maxFileCount || this._maxFileCount < 0) {
                this._maxFileCount = DEFAULT_MAX_FILE_COUNT;
            }

            if (!this._maxFileSize || this._maxFileSize < 0) {
                this._maxFileSize = DEFAULT_MAX_FILE_SIZE;
            }

        } else {
            this._excludedDirectories = DEFAULT_EXCLUDED_DIRECTORIES;
            this._excludedFiles = BASE_EXCLUDED_FILES;
            this._maxFileCount = DEFAULT_MAX_FILE_COUNT;
            this._maxFileSize = DEFAULT_MAX_FILE_SIZE;
        }
    }

    Preferences.FILE_NAME = ".jscodehints";

    /**
     * Get the regular expression for excluded directories.
     *
     * @return {?RegExp} Regular expression matching the directories that should
     * be excluded. Returns null if no directories are excluded.
     */
    Preferences.prototype.getExcludedDirectories = function () {
        return this._excludedDirectories;
    };

    /**
     * Get the regular expression for excluded files.
     *
     * @return {?RegExp} Regular expression matching the files that should
     * be excluded. Returns null if no files are excluded.
     */
    Preferences.prototype.getExcludedFiles = function () {
        return this._excludedFiles;
    };

    /**
     * Get the maximum number of files that will be analyzed.
     *
     * @return {number}
     */
    Preferences.prototype.getMaxFileCount = function () {
        return this._maxFileCount;
    };

    /**
     * Get the maximum size of a file that will be analyzed. Files that are
     * larger will be ignored.
     *
     * @return {number}
     */
    Preferences.prototype.getMaxFileSize = function () {
        return this._maxFileSize;
    };

    module.exports = Preferences;

});

