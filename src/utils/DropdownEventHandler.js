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


    var KeyBindingManager = require("command/KeyBindingManager"),
        KeyEvent          = require("utils/KeyEvent"),
        PopUpManager      = require("widgets/PopUpManager"),
        ViewUtils         = require("utils/ViewUtils");

    /**
     * Object to handle events for a dropdown list.
     *
     * DropdownEventHandler handles these events:
     *
     * Mouse:
     * - click       - execute selection callback and dismiss list
     * - mouseover   - highlight item
     * - mouseleave  - remove mouse highlighting
     *
     * Keyboard:
     * - Enter       - execute selection callback and dismiss list
     * - Esc         - dismiss list
     * - Up/Down     - change selection
     * - PageUp/Down - change selection
     *
     * Items whose "a" has the .disabled class do not respond to selection.
     *
     * @constructor
     * @param {jQueryObject} $list  associated list object
     * @param {Function} selectionCallback  function called when list item is selected.
     * @param {Function} closeCallback  function called when list item is selected.
     * @param {Function} keyDownCallback  function called when list item is selected.
     */
    function DropdownEventHandler($list, selectionCallback, closeCallback, keyDownCallback) {

        this.$list = $list;
        this.$items = $list.find("li");
        this.selectionCallback = selectionCallback;
        this.closeCallback = closeCallback;
        this.keyDownCallback = keyDownCallback;
        this.scrolling = false;

        /**
         * The selected position in the list; otherwise -1.
         *
         * @private
         * @type {number}
         */
        this._selectedIndex = -1;
    }

    /**
     * Public open method
     */
    DropdownEventHandler.prototype.open = function () {
        var self = this;

        /**
         * Convert keydown events into hint list navigation actions.
         *
         * @private
         * @param {KeyboardEvent} event
         * @return {boolean} true if key was handled, otherwise false.
         */
        function _keydownHook(event) {
            var keyCode;

            // (page) up, (page) down, enter and tab key are handled by the list
            if (event.type === "keydown") {
                keyCode = event.keyCode;

                if (keyCode === KeyEvent.DOM_VK_TAB) {
                    self.close();
                } else if (keyCode === KeyEvent.DOM_VK_UP) {
                    // Move up one, wrapping at edges (if nothing selected, select the last item)
                    self._tryToSelect(self._selectedIndex === -1 ? -1 : self._selectedIndex - 1, -1);
                } else if (keyCode === KeyEvent.DOM_VK_DOWN) {
                    // Move down one, wrapping at edges (if nothing selected, select the first item)
                    self._tryToSelect(self._selectedIndex === -1 ? 0 : self._selectedIndex + 1, +1);
                } else if (keyCode === KeyEvent.DOM_VK_PAGE_UP) {
                    // Move up roughly one 'page', stopping at edges (not wrapping) (if nothing selected, selects the first item)
                    self._tryToSelect((self._selectedIndex || 0) - self._itemsPerPage(), -1, true);
                } else if (keyCode === KeyEvent.DOM_VK_PAGE_DOWN) {
                    // Move down roughly one 'page', stopping at edges (not wrapping) (if nothing selected, selects the item one page down from the top)
                    self._tryToSelect((self._selectedIndex || 0) + self._itemsPerPage(), +1, true);

                } else if (keyCode === KeyEvent.DOM_VK_HOME) {
                    self._tryToSelect(0, +1);
                } else if (keyCode === KeyEvent.DOM_VK_END) {
                    self._tryToSelect(self.$items.length - 1, -1);

                } else if (self._selectedIndex !== -1 &&
                    (keyCode === KeyEvent.DOM_VK_RETURN)) {

                    // Trigger a click handler to commmit the selected item
                    self._selectionHandler();
                } else {
                    if(self.keyDownCallback){
                        return self.keyDownCallback(event);
                    }
                    // Let the event bubble.
                    return false;
                }

                event.stopImmediatePropagation();
                event.preventDefault();
                return true;
            }

            // If we didn't handle it, let other global keydown hooks handle it.
            return false;
        }

        /**
         * PopUpManager callback
         *
         * @private
         */
        function closeCallback() {
            KeyBindingManager.removeGlobalKeydownHook(_keydownHook);
            self._cleanup();
        }

        KeyBindingManager.addGlobalKeydownHook(_keydownHook);

        if (this.$list) {
            this._registerMouseEvents();
            PopUpManager.addPopUp(this.$list, closeCallback, true, {closeCurrentPopups: true});
        }
    };

    /**
     * Public close method
     */
    DropdownEventHandler.prototype.close = function () {
        if (this.$list) {
            PopUpManager.removePopUp(this.$list);
        }
    };

    /**
     * Cleanup
     *
     * @private
     */
    DropdownEventHandler.prototype._cleanup = function () {
        if (this.$list) {
            this.$list.off(".dropdownEventHandler");
        }
        if (this.closeCallback) {
            this.closeCallback();
        }
    };

    /**
     * Try to select item at the given index. If it's disabled or a divider, keep trying by incrementing
     * index by 'direction' each time (wrapping around if needed).
     *
     * @private
     * @param {number} index  If out of bounds, index either wraps around to remain in range (e.g. -1 yields
     *                      last item, length+1 yields 2nd item) or if noWrap set, clips instead (e.g. -1 yields
     *                      first item, length+1 yields last item).
     * @param {number} direction  Either +1 or -1
     * @param {boolean=} noWrap  Clip out of range index values instead of wrapping. Default false (wrap).
     */
    DropdownEventHandler.prototype._tryToSelect = function (index, direction, noWrap) {
        // Fix up 'index' if out of bounds (>= len or < 0)
        var len = this.$items.length;
        if (noWrap) {
            // Clip to stay in range (and set direction so we don't wrap in the recursion case either)
            if (index < 0) {
                index = 0;
                direction = +1;
            } else if (index >= len) {
                index = len - 1;
                direction = -1;
            }
        } else {
            // Wrap around to keep index in bounds
            index %= len;
            if (index < 0) {
                index += len;
            }
        }

        var $item = this.$items.eq(index);
        if ($item.hasClass("divider") || $item.hasClass("sticky-li-top") || $item.find("a.disabled").length || !$item.is(':visible')) {
            // Desired item is ineligible for selection: try next one
            this._tryToSelect(index + direction, direction, noWrap);
        } else {
            this._setSelectedIndex(index, true);
        }
    };

    /**
     * @private
     * @return {number} The number of items per scroll page.
     */
    DropdownEventHandler.prototype._itemsPerPage = function () {
        var itemsPerPage = 1,
            itemHeight;

        if (this.$items.length !== 0) {
            itemHeight = $(this.$items[0]).height();
            if (itemHeight) {
                // round down to integer value
                itemsPerPage = Math.floor(this.$list.height() / itemHeight);
                itemsPerPage = Math.max(1, Math.min(itemsPerPage, this.$items.length));
            }
        }

        return itemsPerPage;
    };

    /**
     * Call selectionCallback with selected index
     *
     * @private
     */
    DropdownEventHandler.prototype._selectionHandler = function () {

        if (this._selectedIndex === -1) {
            return;
        }

        var $link = this.$items.eq(this._selectedIndex).find("a");
        this._clickHandler($link);
    };

    /**
     * Call selectionCallback with selected item
     *
     * @private
     * @param {jQueryObject} $link
     */
    DropdownEventHandler.prototype._clickHandler = function ($link) {

        if (!this.selectionCallback || !this.$list || !$link) {
            return;
        }
        if ($link.hasClass("disabled")) {
            return;
        }

        this.selectionCallback($link);
        PopUpManager.removePopUp(this.$list);
    };

    /**
     * Select the item in the hint list at the specified index, or remove the
     * selection if index < 0.
     *
     * @private
     * @param {number} index
     */
    DropdownEventHandler.prototype._setSelectedIndex = function (index, scrollIntoView) {

        // Range check
        index = Math.max(-1, Math.min(index, this.$items.length - 1));

        // Clear old highlight
        if (this._selectedIndex !== -1) {
            this.$items.eq(this._selectedIndex).find("a").removeClass("selected");
        }

        this._selectedIndex = index;

        // Highlight the new selected item, if necessary
        if (this._selectedIndex !== -1) {
            var $item = this.$items.eq(this._selectedIndex);

            $item.find("a").addClass("selected");
            if (scrollIntoView) {
                this.scrolling = true;
                ViewUtils.scrollElementIntoView(this.$list, $item, false);
            }
        }
    };

    /**
     * Register mouse event handlers
     *
     * @private
     */
    DropdownEventHandler.prototype._registerMouseEvents = function () {
        var self = this;

        this.$list
            .on("click.dropdownEventHandler", "a", function () {
                self._clickHandler($(this));
            })
            .on("mouseover.dropdownEventHandler", "a", function (e) {
                // Don't select item under mouse cursor when scrolling.
                if (self.scrolling) {
                    self.scrolling = false;
                    return;
                }

                var $link = $(e.currentTarget),
                    $item = $link.closest("li"),
                    viewOffset = self.$list.offset(),
                    elementOffset = $item.offset();

                // Only set selected if enabled & in view
                // (dividers are already screened out since they don't have an "a" tag in them)
                if (!$link.hasClass("disabled")) {
                    if (elementOffset.top < viewOffset.top + self.$list.height() && viewOffset.top <= elementOffset.top) {
                        self._setSelectedIndex(self.$items.index($item), false);
                    }
                }
            });
    };

    /**
     * Re-register mouse event handlers
     *
     * @param {!jQueryObject} $list  newly updated list object
     */
    DropdownEventHandler.prototype.reRegisterMouseHandlers = function ($list) {
        if (this.$list) {
            this.$list.off(".dropdownEventHandler");

            this.$list = $list;
            this.$items = $list.find("li");

            this._registerMouseEvents();
        }
    };

    // Export public API
    exports.DropdownEventHandler    = DropdownEventHandler;
});
