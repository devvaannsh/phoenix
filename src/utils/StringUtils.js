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

// @INCLUDE_IN_API_DOCS

/* The hash code routne is taken from http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
   @CC wiki attribution: esmiralha
*/

/*eslint no-bitwise: off */
/*jslint bitwise: true */

/**
 *  Utilities functions related to string manipulation
 *
 * @module utils/StringUtils
 */
define(function (require, exports, module) {


    var _ = require("thirdparty/lodash");

    /**
     * Format a string by replacing placeholder symbols with passed in arguments.
     *
     * Example: var formatted = StringUtils.format("Hello {0}", "World");
     *
     * @param {string} str The base string
     * @param {rest} Arguments to be substituted into the string
     *
     * @return {string} Formatted string
     */
    function format(str) {
        // arguments[0] is the base string, so we need to adjust index values here
        var args = [].slice.call(arguments, 1);
        return str.replace(/\{\s*(\d+)\s*\}/g, function (match, num) {
            return typeof args[num] !== "undefined" ? args[num] : match;
        });
    }

    /**
     * Regex escape
     *
     * @param {string} str
     * @returns {string}
     */
    function regexEscape(str) {
        return str.replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1");
    }

    /**
     * Periods (aka "dots") are allowed in HTML identifiers, but jQuery interprets
     * them as the start of a class selector, so they need to be escaped
     *
     * @param {string} str
     * @returns {string}
     */
    function jQueryIdEscape(str) {
        return str.replace(/\./g, "\\.");
    }

    /**
     * Splits the text by new line characters and returns an array of lines
     *
     * @param {string} text
     * @return {Array.<string>} lines
     */
    function getLines(text) {
        return text.split("\n");
    }

    /**
     * Returns a line number corresponding to an offset in some text. The text can
     * be specified as a single string or as an array of strings that correspond to
     * the lines of the string.
     *
     * Specify the text in lines when repeatedly calling the function on the same
     * text in a loop. Use getLines() to divide the text into lines, then repeatedly call
     * this function to compute a line number from the offset.
     *
     * @param {string | Array.<string>} textOrLines - string or array of lines from which
     *      to compute the line number from the offset
     * @param {number} offset
     * @return {number} line number
     */
    function offsetToLineNum(textOrLines, offset) {
        if (Array.isArray(textOrLines)) {
            var lines = textOrLines,
                total = 0,
                line;
            for (line = 0; line < lines.length; line++) {
                if (total < offset) {
                    // add 1 per line since /n were removed by splitting, but they needed to
                    // contribute to the total offset count
                    total += lines[line].length + 1;
                } else if (total === offset) {
                    return line;
                } else {
                    return line - 1;
                }
            }

            // if offset is NOT over the total then offset is in the last line
            if (offset <= total) {
                return line - 1;
            }
            return undefined;

        }
        return textOrLines.substr(0, offset).split("\n").length - 1;

    }

    /**
     * Returns true if the given string starts with the given prefix.
     *
     * @param   {String} str
     * @param   {String} prefix
     * @return {Boolean}
     */
    function startsWith(str, prefix) {
        return str.slice(0, prefix.length) === prefix;
    }

    /**
     * Returns true if the given string ends with the given suffix.
     *
     * @param {string} str
     * @param {string} suffix
     */
    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    /**
     * sort two urls alphabetically
     * ensure folders appear before files on windows
     *
     * @param {string} a
     * @param {string} b
     * @returns {number}
     */
    function urlSort(a, b) {
        var a2, b2;
        function isFile(s) {
            return ((s.lastIndexOf("/") + 1) < s.length);
        }

        if (brackets.platform === "win") {
            // Windows: prepend folder names with a '0' and file names with a '1' so folders are listed first
            a2 = ((isFile(a)) ? "1" : "0") + a.toLowerCase();
            b2 = ((isFile(b)) ? "1" : "0") + b.toLowerCase();
        } else {
            a2 = a.toLowerCase();
            b2 = b.toLowerCase();
        }

        if (a2 === b2) {
            return 0;
        }
        return (a2 > b2) ? 1 : -1;

    }

    /**
     * Return an escaped path or URL string that can be broken near path separators.
     *
     * @param {string} url the path or URL to format
     * @return {string} the formatted path or URL
     */
    function breakableUrl(url) {
        // This is for displaying in UI, so always want it escaped
        var escUrl = _.escape(url);

        // Inject zero-width space character (U+200B) near path separators (/) to allow line breaking there
        return escUrl.replace(
            new RegExp(regexEscape("/"), "g"),
            "/" + "&#8203;"
        );
    }

    /**
     * Converts number of bytes into human readable format.
     * If param bytes is negative it returns the number without any changes.
     *
     * @param {number} bytes     Number of bytes to convert
     * @param {number} precision Number of digits after the decimal separator
     * @return {string}
     */
    function prettyPrintBytes(bytes, precision) {
        var kilobyte = 1024,
            megabyte = kilobyte * 1024,
            gigabyte = megabyte * 1024,
            terabyte = gigabyte * 1024,
            returnVal = bytes;

        if ((bytes >= 0) && (bytes < kilobyte)) {
            returnVal = bytes + " B";
        } else if (bytes < megabyte) {
            returnVal = (bytes / kilobyte).toFixed(precision) + " KB";
        } else if (bytes < gigabyte) {
            returnVal = (bytes / megabyte).toFixed(precision) + " MB";
        } else if (bytes < terabyte) {
            returnVal = (bytes / gigabyte).toFixed(precision) + " GB";
        } else if (bytes >= terabyte) {
            return (bytes / terabyte).toFixed(precision) + " TB";
        }

        return returnVal;
    }

    /**
     * Truncate text to specified length.
     *
     * @param {string} str Text to be truncated.
     * @param {number} len Length to which text should be truncated
     * @return {?string} Returns truncated text only if it was changed
     */
    function truncate(str, len) {
        // Truncate text to specified length
        if (str.length > len) {
            str = str.substr(0, len);

            // To prevent awkwardly truncating in the middle of a word,
            // attempt to truncate at the end of the last whole word
            var lastSpaceChar = str.lastIndexOf(" ");
            if (lastSpaceChar < len && lastSpaceChar > -1) {
                str = str.substr(0, lastSpaceChar);
            }
            return str;
        }
    }

    /**
     * Computes a 32bit hash from the given string
     * Taken from http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
     * @CC wiki attribution: esmiralha
     * @param   {string}   str The string for which hash is to be computed
     * @return {number} The 32-bit hash
     */
    function hashCode(str) {
        var hash = 0, i, chr, len;
        if (str.length === 0) {
            return hash;
        }
        for (i = 0, len = str.length; i < len; i++) {
            chr   = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    /**
     * Generates a random nonce string of the specified length.
     *
     * !!!Should not be used for crypto secure workflows.!!!
     *
     * @param {number} stringLength - The length of the nonce in bytes. default 10.
     * @param {string} [prefix] - optional prefix
     * @returns {string} - The randomly generated nonce.
     */
    function randomString(stringLength=10, prefix="") {
        const randomBuffer = new Uint8Array(stringLength);
        crypto.getRandomValues(randomBuffer);

        // Define the character set for the random string
        const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        // Convert the ArrayBuffer to a case-sensitive random string with numbers
        let randomId = prefix || '';
        Array.from(randomBuffer).forEach(byte => {
            randomId += charset[byte % charset.length];
        });

        return randomId;
    }

    /**
     * Check if value is a valid number
     *
     * @param {string} value
     * @returns {boolean} true if value is valid number, else false
     */
    function isNumber(value) {
        return parseFloat(value).toString() === value;
    }

    // Define public API
    exports.format              = format;
    exports.regexEscape         = regexEscape;
    exports.jQueryIdEscape      = jQueryIdEscape;
    exports.getLines            = getLines;
    exports.offsetToLineNum     = offsetToLineNum;
    exports.urlSort             = urlSort;
    exports.breakableUrl        = breakableUrl;
    exports.startsWith          = startsWith;
    exports.endsWith            = endsWith;
    exports.prettyPrintBytes    = prettyPrintBytes;
    exports.truncate            = truncate;
    exports.hashCode            = hashCode;
    exports.randomString        = randomString;
    exports.isNumber            = isNumber;
});
