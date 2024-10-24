### Import :
```js
const PopUpManager = brackets.getModule("widgets/PopUpManager")
```

<a name="AppInit"></a>

## AppInit
Utilities for managing pop-ups.

**Kind**: global variable  
<a name="addPopUp"></a>

## addPopUp($popUp, removeHandler, autoRemove, options)
Add Esc key handling for a popup DOM element.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| $popUp | <code>jQuery</code> | jQuery object for the DOM element pop-up |
| removeHandler | <code>function</code> | Pop-up specific remove (e.g. display:none or DOM removal) |
| autoRemove | <code>Boolean</code> | Specify true to indicate the PopUpManager should      remove the popup from the _popUps array when the popup is closed. Specify false      when the popup is always persistant in the _popUps array. |
| options | <code>object</code> |  |
| options.popupManagesFocus | <code>boolean</code> | set to true if the popup manages focus restore on close |

<a name="removePopUp"></a>

## removePopUp($popUp)
Remove Esc key handling for a pop-up. Removes the pop-up from the DOM

**Kind**: global function  

| Param | Type |
| --- | --- |
| $popUp | <code>jQuery</code> | 

<a name="removeCurrentPopUp"></a>

## removeCurrentPopUp([keyEvent])
Remove Esc key handling for a pop-up. Removes the pop-up from the DOM

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [keyEvent] | <code>KeyboardEvent</code> | (optional) |

<a name="_beforeMenuPopup"></a>

## \_beforeMenuPopup()
A menu is being popped up, so remove any menu that is currently popped up

**Kind**: global function  
<a name="listenToContextMenu"></a>

## listenToContextMenu(contextMenu)
Context menus are also created in AppInit.htmlReady(), so they may not

**Kind**: global function  

| Param | Type |
| --- | --- |
| contextMenu | <code>ContextMenu</code> | 
