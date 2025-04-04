### Import :
```js
const FileSystemEntry = brackets.getModule("filesystem/FileSystemEntry")
```

<a name="FileSystemEntry"></a>

## FileSystemEntry
**Kind**: global class  

* [FileSystemEntry](#FileSystemEntry)
    * [new FileSystemEntry(path, fileSystem)](#new_FileSystemEntry_new)
    * [.toString()](#FileSystemEntry+toString)
    * [.exists(callback)](#FileSystemEntry+exists)
    * [.existsAsync()](#FileSystemEntry+existsAsync)
    * [.stat(callback)](#FileSystemEntry+stat)
    * [.statAsync()](#FileSystemEntry+statAsync) ⇒ <code>Promise.&lt;FileSystemStats&gt;</code>
    * [.rename(newFullPath, [callback])](#FileSystemEntry+rename)
    * [.unlinkAsync()](#FileSystemEntry+unlinkAsync) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.unlink([callback])](#FileSystemEntry+unlink)
    * [.moveToTrash([callback])](#FileSystemEntry+moveToTrash)
    * [.visit(visitor, [options], [callback])](#FileSystemEntry+visit)

<a name="new_FileSystemEntry_new"></a>

### new FileSystemEntry(path, fileSystem)
Model for a file system entry. This is the base class for File and Directory,
and is never used directly.

See the File, Directory, and FileSystem classes for more details.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The path for this entry. |
| fileSystem | <code>FileSystem</code> | The file system associated with this entry. |

<a name="FileSystemEntry+toString"></a>

### fileSystemEntry.toString()
Helpful toString for debugging purposes

**Kind**: instance method of [<code>FileSystemEntry</code>](#FileSystemEntry)  
<a name="FileSystemEntry+exists"></a>

### fileSystemEntry.exists(callback)
Check to see if the entry exists on disk. Note that there will NOT be an
error returned if the file does not exist on the disk; in that case the
error parameter will be null and the boolean will be false. The error
parameter will only be truthy when an unexpected error was encountered
during the test, in which case the state of the entry should be considered
unknown.

**Kind**: instance method of [<code>FileSystemEntry</code>](#FileSystemEntry)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Callback with a FileSystemError      string or a boolean indicating whether or not the file exists. |

<a name="FileSystemEntry+existsAsync"></a>

### fileSystemEntry.existsAsync()
Async version of exists API. Returns true or false if the entry exists. or error rejects.

**Kind**: instance method of [<code>FileSystemEntry</code>](#FileSystemEntry)  
<a name="FileSystemEntry+stat"></a>

### fileSystemEntry.stat(callback)
Returns the stats for the entry.

**Kind**: instance method of [<code>FileSystemEntry</code>](#FileSystemEntry)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Callback with a      FileSystemError string or FileSystemStats object. |

<a name="FileSystemEntry+statAsync"></a>

### fileSystemEntry.statAsync() ⇒ <code>Promise.&lt;FileSystemStats&gt;</code>
Returns a promise that resolves to the stats for the entry.

**Kind**: instance method of [<code>FileSystemEntry</code>](#FileSystemEntry)  
<a name="FileSystemEntry+rename"></a>

### fileSystemEntry.rename(newFullPath, [callback])
Rename this entry.

**Kind**: instance method of [<code>FileSystemEntry</code>](#FileSystemEntry)  

| Param | Type | Description |
| --- | --- | --- |
| newFullPath | <code>string</code> | New path & name for this entry. |
| [callback] | <code>function</code> | Callback with a single FileSystemError      string parameter. |

<a name="FileSystemEntry+unlinkAsync"></a>

### fileSystemEntry.unlinkAsync() ⇒ <code>Promise.&lt;void&gt;</code>
Permanently deletes this entry. For directories, this will delete the directory
and all of its contents. For a reversible delete, see `moveToTrash()`.

**Kind**: instance method of [<code>FileSystemEntry</code>](#FileSystemEntry)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise that resolves when the delete is successful or rejects with an error.  
<a name="FileSystemEntry+unlink"></a>

### fileSystemEntry.unlink([callback])
Permanently delete this entry. For Directories, this will delete the directory
and all of its contents. For reversible delete, see moveToTrash().

**Kind**: instance method of [<code>FileSystemEntry</code>](#FileSystemEntry)  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>function</code> | Callback with a single FileSystemError      string parameter. |

<a name="FileSystemEntry+moveToTrash"></a>

### fileSystemEntry.moveToTrash([callback])
Move this entry to the trash. If the underlying file system doesn't support move
to trash, the item is permanently deleted.

**Kind**: instance method of [<code>FileSystemEntry</code>](#FileSystemEntry)  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>function</code> | Callback with a single FileSystemError      string parameter. |

<a name="FileSystemEntry+visit"></a>

### fileSystemEntry.visit(visitor, [options], [callback])
Visit this entry and its descendents with the supplied visitor function.
Correctly handles symbolic link cycles and options can be provided to limit
search depth and total number of entries visited. No particular traversal
order is guaranteed; instead of relying on such an order, it is preferable
to use the visit function to build a list of visited entries, sort those
entries as desired, and then process them. Whenever possible, deep
filesystem traversals should use this method. Will not visit all files/dirs
that are not shown in the file tree by default, unless the visitHiddenTree option is specified.

**Kind**: instance method of [<code>FileSystemEntry</code>](#FileSystemEntry)  

| Param | Type | Description |
| --- | --- | --- |
| visitor | <code>function</code> | A visitor function (can be async), which is      applied to this entry and all descendent FileSystemEntry objects. It can have two args, the      first one is the entry being visited, the second is an array of sibling entries that share the      same parent dir as the given entry. If the function returns      false (or promise that resolved to false)for a particular Directory entry, that directory's      descendents will not be visited. |
| [options] | <code>Object</code> |  |
| [callback] | <code>function</code> | Callback with single FileSystemError string parameter. |

