### Import :
```js
const FileTreeView = brackets.getModule("project/FileTreeView")
```

<a name="Preact"></a>

## Preact
This is the view layer (template) for the file tree in the sidebar. It takes a FileTreeViewModel

**Kind**: global variable  
<a name="pathComputer"></a>

## pathComputer
Mixin that allows a component to compute the full path to its directory entry.

**Kind**: global variable  
<a name="pathComputer.myPath"></a>

### pathComputer.myPath()
Computes the full path of the file represented by this input.

**Kind**: static method of [<code>pathComputer</code>](#pathComputer)  
<a name="renameBehavior"></a>

## renameBehavior
This is a mixin that provides rename input behavior. It is responsible for taking keyboard input

**Kind**: global variable  

* [renameBehavior](#renameBehavior)
    * [.handleClick()](#renameBehavior.handleClick)
    * [.handleKeyDown()](#renameBehavior.handleKeyDown)
    * [.handleInput()](#renameBehavior.handleInput)
    * [.handleBlur()](#renameBehavior.handleBlur)

<a name="renameBehavior.handleClick"></a>

### renameBehavior.handleClick()
Stop clicks from propagating so that clicking on the rename input doesn't

**Kind**: static method of [<code>renameBehavior</code>](#renameBehavior)  
<a name="renameBehavior.handleKeyDown"></a>

### renameBehavior.handleKeyDown()
If the user presses enter or escape, we either successfully complete or cancel, respectively,

**Kind**: static method of [<code>renameBehavior</code>](#renameBehavior)  
<a name="renameBehavior.handleInput"></a>

### renameBehavior.handleInput()
The rename or create operation can be completed or canceled by actions outside of

**Kind**: static method of [<code>renameBehavior</code>](#renameBehavior)  
<a name="renameBehavior.handleBlur"></a>

### renameBehavior.handleBlur()
If we leave the field for any reason, complete the rename.

**Kind**: static method of [<code>renameBehavior</code>](#renameBehavior)  
<a name="dragAndDrop"></a>

## dragAndDrop
This is a mixin that provides drag and drop move function.

**Kind**: global variable  
<a name="extendable"></a>

## extendable
Mixin for components that support the "icons" and "addClass" extension points.

**Kind**: global variable  

* [extendable](#extendable)
    * [.getIcons()](#extendable.getIcons) ⇒ <code>Array.&lt;PreactComponent&gt;</code>
    * [.getClasses(classes)](#extendable.getClasses) ⇒ <code>string</code>

<a name="extendable.getIcons"></a>

### extendable.getIcons() ⇒ <code>Array.&lt;PreactComponent&gt;</code>
Calls the icon providers to get the collection of icons (most likely just one) for

**Kind**: static method of [<code>extendable</code>](#extendable)  
**Returns**: <code>Array.&lt;PreactComponent&gt;</code> - icon components to render  
<a name="extendable.getClasses"></a>

### extendable.getClasses(classes) ⇒ <code>string</code>
Calls the addClass providers to get the classes (in string form) to add for the current

**Kind**: static method of [<code>extendable</code>](#extendable)  
**Returns**: <code>string</code> - classes for the current node  

| Param | Type | Description |
| --- | --- | --- |
| classes | <code>string</code> | Initial classes for this node |

<a name="fileSelectionBox"></a>

## fileSelectionBox
Displays the absolutely positioned box for the selection or context in the

**Kind**: global variable  
<a name="selectionExtension"></a>

## selectionExtension
On Windows and Linux, the selection bar in the tree does not extend over the scroll bar.

**Kind**: global variable  
<a name="componentDidMount"></a>

## componentDidMount()
When this component is displayed, we scroll it into view and select the portion

**Kind**: global function  
<a name="getInitialState"></a>

## getInitialState()
Ensures that we always have a state object.

**Kind**: global function  
<a name="shouldComponentUpdate"></a>

## shouldComponentUpdate()
Thanks to immutable objects, we can just do a start object identity check to know

**Kind**: global function  
<a name="componentDidUpdate"></a>

## componentDidUpdate()
If this node is newly selected, scroll it into view. Also, move the selection or

**Kind**: global function  
<a name="handleClick"></a>

## handleClick()
When the user clicks on the node, we'll either select it or, if they've clicked twice

**Kind**: global function  
<a name="selectNode"></a>

## selectNode()
select the current node in the file tree on mouse down event on files.

**Kind**: global function  
<a name="handleDoubleClick"></a>

## handleDoubleClick()
When the user double clicks, we will select this file and add it to the working

**Kind**: global function  
<a name="getDataForExtension"></a>

## getDataForExtension() ⇒ <code>Object</code>
Create the data object to pass to extensions.

**Kind**: global function  
**Returns**: <code>Object</code> - Data for extensions  
<a name="componentDidMount"></a>

## componentDidMount()
When this component is displayed, we scroll it into view and select the folder name.

**Kind**: global function  
<a name="shouldComponentUpdate"></a>

## shouldComponentUpdate()
We need to update this component if the sort order changes or our entry object

**Kind**: global function  
<a name="handleClick"></a>

## handleClick()
If you click on a directory, it will toggle between open and closed.

**Kind**: global function  
<a name="selectNode"></a>

## selectNode()
select the current node in the file tree

**Kind**: global function  
<a name="getDataForExtension"></a>

## getDataForExtension() ⇒ <code>Object</code>
Create the data object to pass to extensions.

**Kind**: global function  
**Returns**: <code>Object</code> - Data for extensions  
<a name="shouldComponentUpdate"></a>

## shouldComponentUpdate()
Need to re-render if the sort order or the contents change.

**Kind**: global function  
<a name="componentDidUpdate"></a>

## componentDidUpdate()
When the component has updated in the DOM, reposition it to where the currently

**Kind**: global function  
<a name="componentDidUpdate"></a>

## componentDidUpdate()
When the component has updated in the DOM, reposition it to where the currently

**Kind**: global function  
<a name="shouldComponentUpdate"></a>

## shouldComponentUpdate()
Update for any change in the tree data or directory sorting preference.

**Kind**: global function  
<a name="handleDragOver"></a>

## handleDragOver()
Allow the Drop

**Kind**: global function  
<a name="render"></a>

## render(element, viewModel, projectRoot, actions, forceRender, platform)
Renders the file tree to the given element.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>DOMNode</code> \| <code>jQuery</code> | Element in which to render this file tree |
| viewModel | <code>FileTreeViewModel</code> | the data container |
| projectRoot | <code>Directory</code> | Directory object from which the fullPath of the project root is extracted |
| actions | <code>ActionCreator</code> | object with methods used to communicate events that originate from the user |
| forceRender | <code>boolean</code> | Run render on the entire tree (useful if an extension has new data that it needs rendered) |
| platform | <code>string</code> | mac, win, linux |

<a name="addIconProvider"></a>

## addIconProvider(callback, [priority])
Adds an icon provider. The callback is invoked before each working set item is created, and can

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | Return a string representing the HTML, a jQuery object or DOM node, or undefined. If undefined, nothing is prepended to the list item and the default or an available icon will be used. |
| [priority] | <code>number</code> | <code>0</code> | optional priority. 0 being lowest. The icons with the highest priority wins if there are multiple callback providers attached. icon providers of the same priority first valid response wins. |

<a name="addClassesProvider"></a>

## addClassesProvider(callback, [priority])
Adds a CSS class provider, invoked before each working set item is created or updated. When called

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | Return a string containing space-separated CSS class(es) to add, or undefined to leave CSS unchanged. |
| [priority] | <code>number</code> | <code>0</code> | optional priority. 0 being lowest. The class with the highest priority wins if there are multiple callback classes attached. class providers of the same priority will be appended. |
