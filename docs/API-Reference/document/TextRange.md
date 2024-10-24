### Import :
```js
const TextRange = brackets.getModule("document/TextRange")
```

<a name="TextRange"></a>

## TextRange
**Kind**: global class  

* [TextRange](#TextRange)
    * [new TextRange(document, startLine, endLine)](#new_TextRange_new)
    * [.document](#TextRange+document) : <code>Document</code>
    * [.startLine](#TextRange+startLine) : <code>number</code>
    * [.endLine](#TextRange+endLine) : <code>number</code>
    * [.dispose()](#TextRange+dispose)
    * [._applySingleChangeToRange(change)](#TextRange+_applySingleChangeToRange) ⇒ <code>Object</code>
    * [._applyChangesToRange()](#TextRange+_applyChangesToRange)

<a name="new_TextRange_new"></a>

### new TextRange(document, startLine, endLine)
Stores a range of lines that is automatically maintained as the Document changes. The range


| Param | Type | Description |
| --- | --- | --- |
| document | <code>Document</code> |  |
| startLine | <code>number</code> | First line in range (0-based, inclusive) |
| endLine | <code>number</code> | Last line in range (0-based, inclusive) |

<a name="TextRange+document"></a>

### textRange.document : <code>Document</code>
Containing document

**Kind**: instance property of [<code>TextRange</code>](#TextRange)  
<a name="TextRange+startLine"></a>

### textRange.startLine : <code>number</code>
Starting Line

**Kind**: instance property of [<code>TextRange</code>](#TextRange)  
<a name="TextRange+endLine"></a>

### textRange.endLine : <code>number</code>
Ending Line

**Kind**: instance property of [<code>TextRange</code>](#TextRange)  
<a name="TextRange+dispose"></a>

### textRange.dispose()
Detaches from the Document. The TextRange will no longer update or send change events

**Kind**: instance method of [<code>TextRange</code>](#TextRange)  
<a name="TextRange+_applySingleChangeToRange"></a>

### textRange.\_applySingleChangeToRange(change) ⇒ <code>Object</code>
Applies a single Document change object (out of the linked list of multiple such objects)

**Kind**: instance method of [<code>TextRange</code>](#TextRange)  
**Returns**: <code>Object</code> - Whether the range boundary

| Param | Type | Description |
| --- | --- | --- |
| change | <code>Object</code> | The CodeMirror change record. |

<a name="TextRange+_applyChangesToRange"></a>

### textRange.\_applyChangesToRange()
Updates the range based on the changeList from a Document "change" event. Dispatches a

**Kind**: instance method of [<code>TextRange</code>](#TextRange)  
<a name="EventDispatcher"></a>

## EventDispatcher
**Kind**: global variable  