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

define(function (require, exports, module) {


    /**
     * Represents file or directory structure watched by the FileSystem. If the
     * entry is a directory, all children (that pass the supplied filter function)
     * are also watched. A WatchedRoot object begins and ends its life in the
     * INACTIVE state. While in the process of starting up watchers, the WatchedRoot
     * is in the STARTING state. When watchers are ready, the WatchedRoot enters
     * the ACTIVE state.
     *
     * See the FileSystem class for more details.
     *
     * @constructor
     * @param {File|Directory} entry
     * @param {function(string, string):boolean} filter
     * @param {string|Array<string>} filterGitIgnore
     */
    function WatchedRoot(entry, filter, filterGitIgnore) {
        this.entry = entry;
        this.filter = filter;
        this.filterGitIgnore = filterGitIgnore;
    }

    // Status constants
    /**
     * WatchedRoot inactive
     *
     * @const
     * @type {number}
     */
    WatchedRoot.INACTIVE = 0;

    /**
     * WatchedRoot starting
     *
     * @const
     * @type {number}
     */
    WatchedRoot.STARTING = 1;

    /**
     * WatchedRoot active
     *
     * @const
     * @type {number}
     */
    WatchedRoot.ACTIVE = 2;

    /**
     * @type {File|Directory}
     */
    WatchedRoot.prototype.entry = null;

    /**
     * @type {function(string, string):boolean}
     */
    WatchedRoot.prototype.filter = null;

    /**
     * @type {string|Array<string>}
     */
    WatchedRoot.prototype.filterGitIgnore = null;

    /**
     * @type {number}
     */
    WatchedRoot.prototype.status = WatchedRoot.INACTIVE;


    // Export this class
    module.exports = WatchedRoot;
});
