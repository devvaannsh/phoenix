### Import :
```js
const DropdownButton = brackets.getModule("widgets/DropdownButton")
```

<a name="DropdownButton"></a>

## DropdownButton(label, items, [itemRenderer], [options])
Creates a single dropdown-button instance. The DOM node is created but not attached to

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>string</code> |  | The label to display on the button. |
| items | <code>Array.&lt;\*&gt;</code> |  | Items in the dropdown list. Items can have any type/value.           An item with the value `"---"` will be treated as a divider, which is not clickable,           and `itemRenderer()` will not be called for it. |
| [itemRenderer] | <code>function</code> |  | Optional function to convert a single item to HTML. If not provided, items are assumed           to be plain text strings. The function receives the item and its index. |
| [options] | <code>Object</code> |  | Additional options for the dropdown. |
| [options.enableFilter] | <code>boolean</code> | <code>false</code> | Set to `true` to enable filtering by typing. |
| [options.cssClasses] | <code>string</code> |  | A space-separated list of CSS classes to apply to the button. |
| [options.customFilter] | <code>function</code> |  | Optional. When `enableFilter`       is enabled, this function is used as a custom filtering callback. It receives the user's search text,       the text of the element being filtered, and the element's index. Return `true` to display the list item,       or `false` to hide it. |


* [DropdownButton(label, items, [itemRenderer], [options])](#DropdownButton)
    * [.items](#DropdownButton+items) : <code>Array.&lt;\*&gt;</code>
    * [.itemsSearchFilterText](#DropdownButton+itemsSearchFilterText) : <code>null</code>
    * [.$button](#DropdownButton+$button) : <code>jQueryObject</code>
    * [.$dropdown](#DropdownButton+$dropdown) : <code>jQueryObject</code>
    * [.dropdownExtraClasses](#DropdownButton+dropdownExtraClasses) : <code>string</code>
    * [.setButtonLabel(label)](#DropdownButton+setButtonLabel)
    * [.isOpen()](#DropdownButton+isOpen)
    * [.itemRenderer(item, index)](#DropdownButton+itemRenderer) ⇒ <code>string</code> \| <code>Object</code>
    * [._renderList($parent)](#DropdownButton+_renderList) ⇒ <code>jQueryObject</code>
    * [.refresh()](#DropdownButton+refresh)
    * [.setChecked(index, checked)](#DropdownButton+setChecked)
    * [.showDropdown()](#DropdownButton+showDropdown)
    * [.filterDropdown(searchString)](#DropdownButton+filterDropdown)
    * [.closeDropdown()](#DropdownButton+closeDropdown)
    * [.toggleDropdown()](#DropdownButton+toggleDropdown)

<a name="DropdownButton+items"></a>

### dropdownButton.items : <code>Array.&lt;\*&gt;</code>
Items in dropdown list - may be changed any time dropdown isn't open

**Kind**: instance property of [<code>DropdownButton</code>](#DropdownButton)  
<a name="DropdownButton+itemsSearchFilterText"></a>

### dropdownButton.itemsSearchFilterText : <code>null</code>
This is filter text corresponding to each items. it will be used to filter the items based on

**Kind**: instance property of [<code>DropdownButton</code>](#DropdownButton)  
<a name="DropdownButton+$button"></a>

### dropdownButton.$button : <code>jQueryObject</code>
The clickable button. Available as soon as the DropdownButton is constructed.

**Kind**: instance property of [<code>DropdownButton</code>](#DropdownButton)  
<a name="DropdownButton+$dropdown"></a>

### dropdownButton.$dropdown : <code>jQueryObject</code>
The dropdown element. Only non-null while open.

**Kind**: instance property of [<code>DropdownButton</code>](#DropdownButton)  
<a name="DropdownButton+dropdownExtraClasses"></a>

### dropdownButton.dropdownExtraClasses : <code>string</code>
Extra CSS class(es) to apply to $dropdown

**Kind**: instance property of [<code>DropdownButton</code>](#DropdownButton)  
<a name="DropdownButton+setButtonLabel"></a>

### dropdownButton.setButtonLabel(label)
Update the button label.

**Kind**: instance method of [<code>DropdownButton</code>](#DropdownButton)  

| Param | Type |
| --- | --- |
| label | <code>string</code> | 

<a name="DropdownButton+isOpen"></a>

### dropdownButton.isOpen()
returns true if the dropdown is open

**Kind**: instance method of [<code>DropdownButton</code>](#DropdownButton)  
<a name="DropdownButton+itemRenderer"></a>

### dropdownButton.itemRenderer(item, index) ⇒ <code>string</code> \| <code>Object</code>
Called for each item when rendering the dropdown.

**Kind**: instance method of [<code>DropdownButton</code>](#DropdownButton)  
**Returns**: <code>string</code> \| <code>Object</code> - Formatted & escaped HTML, either as a simple string

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | from items array |
| index | <code>number</code> | in items array |

<a name="DropdownButton+_renderList"></a>

### dropdownButton.\_renderList($parent) ⇒ <code>jQueryObject</code>
Converts the list of item objects into HTML list items in format required by DropdownEventHandler

**Kind**: instance method of [<code>DropdownButton</code>](#DropdownButton)  
**Returns**: <code>jQueryObject</code> - The dropdown element with the rendered list items appended.  

| Param | Type | Description |
| --- | --- | --- |
| $parent | <code>jQueryObject</code> | The dropdown element |

<a name="DropdownButton+refresh"></a>

### dropdownButton.refresh()
Refresh the dropdown list by removing and re-creating all list items.

**Kind**: instance method of [<code>DropdownButton</code>](#DropdownButton)  
<a name="DropdownButton+setChecked"></a>

### dropdownButton.setChecked(index, checked)
Check/Uncheck the list item of the given index.

**Kind**: instance method of [<code>DropdownButton</code>](#DropdownButton)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the list item to be checked or unchecked |
| checked | <code>boolean</code> | True if the list item is to be checked, false to get check    mark removed. |

<a name="DropdownButton+showDropdown"></a>

### dropdownButton.showDropdown()
Pops open the dropdown if currently closed. Does nothing if items.length == 0

**Kind**: instance method of [<code>DropdownButton</code>](#DropdownButton)  
<a name="DropdownButton+filterDropdown"></a>

### dropdownButton.filterDropdown(searchString)
hides all elements in popup that doesn't match the given search string, also shows the search bar in popup

**Kind**: instance method of [<code>DropdownButton</code>](#DropdownButton)  

| Param |
| --- |
| searchString | 

<a name="DropdownButton+closeDropdown"></a>

### dropdownButton.closeDropdown()
Closes the dropdown if currently open

**Kind**: instance method of [<code>DropdownButton</code>](#DropdownButton)  
<a name="DropdownButton+toggleDropdown"></a>

### dropdownButton.toggleDropdown()
Opens the dropdown if closed; closes it if open

**Kind**: instance method of [<code>DropdownButton</code>](#DropdownButton)  