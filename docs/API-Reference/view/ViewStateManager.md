### Import :
```js
const ViewStateManager = brackets.getModule("view/ViewStateManager")
```

<a name="_"></a>

## \_
ViewStateManager is a singleton for views to park their global viwe state. The state is saved

**Kind**: global variable  
<a name="reset"></a>

## reset()
resets the view state cache

**Kind**: global function  
<a name="_setViewState"></a>

## \_setViewState(file, viewState)
Sets the view state for the specfied file

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | the file to record the view state for |
| viewState | <code>\*</code> | any data that the view needs to restore the view state. |

<a name="updateViewState"></a>

## updateViewState(view, viewState)
Updates the view state for the specified view

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| view | <code>Object</code> | the to save state |
| viewState | <code>\*</code> | any data that the view needs to restore the view state. |

<a name="getViewState"></a>

## getViewState(file) ⇒ <code>\*</code>
gets the view state for the specified file

**Kind**: global function  
**Returns**: <code>\*</code> - whatever data that was saved earlier with a call setViewState  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | the file to record the view state for |

<a name="addViewStates"></a>

## addViewStates(viewStates)
adds an array of view states

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| viewStates | <code>object.&lt;string, \*&gt;</code> | View State object to append to the current set of view states |
