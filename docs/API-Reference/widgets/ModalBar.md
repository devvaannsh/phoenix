### Import :
```js
const ModalBar = brackets.getModule("widgets/ModalBar")
```

<a name="ModalBar"></a>

## ModalBar
**Kind**: global class  

* [ModalBar](#ModalBar)
    * [new ModalBar(template, autoClose, animate)](#new_ModalBar_new)
    * [._$root](#ModalBar+_$root)
    * [._autoClose](#ModalBar+_autoClose)
    * [.isLockedOpen](#ModalBar+isLockedOpen) : <code>function</code>
    * [.height()](#ModalBar+height) ⇒ <code>number</code>
    * [.prepareClose([restoreScrollPos])](#ModalBar+prepareClose)
    * [.close([restoreScrollPos], [animate], [_reason])](#ModalBar+close) ⇒ <code>$.Promise</code>
    * [._handleKeydown()](#ModalBar+_handleKeydown)
    * [._handleFocusChange()](#ModalBar+_handleFocusChange)
    * [.getRoot()](#ModalBar+getRoot) ⇒ <code>jQueryObject</code>

<a name="new_ModalBar_new"></a>

### new ModalBar(template, autoClose, animate)
Creates a modal bar whose contents are the given template.


| Param | Type | Description |
| --- | --- | --- |
| template | <code>string</code> | The HTML contents of the modal bar. |
| autoClose | <code>boolean</code> | If true, then close the dialog if the user hits Esc      or if the bar loses focus. |
| animate | <code>boolean</code> | If true (the default), animate the dialog closed, otherwise      close it immediately. |

<a name="ModalBar+_$root"></a>

### modalBar.\_$root
A jQuery object containing the root node of the ModalBar.

**Kind**: instance property of [<code>ModalBar</code>](#ModalBar)  
<a name="ModalBar+_autoClose"></a>

### modalBar.\_autoClose
True if this ModalBar is set to autoclose.

**Kind**: instance property of [<code>ModalBar</code>](#ModalBar)  
<a name="ModalBar+isLockedOpen"></a>

### modalBar.isLockedOpen : <code>function</code>
Allows client code to block autoClose from closing the ModalBar: if set, this function is called whenever

**Kind**: instance property of [<code>ModalBar</code>](#ModalBar)  
<a name="ModalBar+height"></a>

### modalBar.height() ⇒ <code>number</code>
**Kind**: instance method of [<code>ModalBar</code>](#ModalBar)  
**Returns**: <code>number</code> - Height of the modal bar in pixels, if open.  
<a name="ModalBar+prepareClose"></a>

### modalBar.prepareClose([restoreScrollPos])
Prepares the ModalBar for closing by popping it out of the main flow and resizing/

**Kind**: instance method of [<code>ModalBar</code>](#ModalBar)  

| Param | Type | Description |
| --- | --- | --- |
| [restoreScrollPos] | <code>boolean</code> | If true (the default), adjust the scroll position     of the editor to account for the ModalBar disappearing. If not set, the caller     should do it immediately on return of this function (before the animation completes),     because the editor will already have been resized. |

<a name="ModalBar+close"></a>

### modalBar.close([restoreScrollPos], [animate], [_reason]) ⇒ <code>$.Promise</code>
Closes the modal bar and returns focus to the active editor. Returns a promise that is

**Kind**: instance method of [<code>ModalBar</code>](#ModalBar)  
**Returns**: <code>$.Promise</code> - promise resolved when close is finished  

| Param | Type | Description |
| --- | --- | --- |
| [restoreScrollPos] | <code>boolean</code> | If true (the default), adjust the scroll position     of the editor to account for the ModalBar disappearing. If not set, the caller     should do it immediately on return of this function (before the animation completes),     because the editor will already have been resized. Note that this is ignored if     `prepareClose()` was already called (you need to pass the parameter to that     function if you call it first). |
| [animate] | <code>boolean</code> | If true (the default), animate the closing of the ModalBar,     otherwise close it immediately. |
| [_reason] | <code>string</code> | For internal use only. |

<a name="ModalBar+_handleKeydown"></a>

### modalBar.\_handleKeydown()
If autoClose is set, close the bar when Escape is pressed

**Kind**: instance method of [<code>ModalBar</code>](#ModalBar)  
<a name="ModalBar+_handleFocusChange"></a>

### modalBar.\_handleFocusChange()
If autoClose is set, detects when something other than the modal bar is getting focus and

**Kind**: instance method of [<code>ModalBar</code>](#ModalBar)  
<a name="ModalBar+getRoot"></a>

### modalBar.getRoot() ⇒ <code>jQueryObject</code>
**Kind**: instance method of [<code>ModalBar</code>](#ModalBar)  
**Returns**: <code>jQueryObject</code> - A jQuery object representing the root of the ModalBar.  
<a name="MainViewManager"></a>

## MainViewManager
A "modal bar" component. This is a lightweight replacement for modal dialogs that

**Kind**: global variable  