### Import :
```js
const FileSystem = brackets.getModule("filesystem/FileSystem")
```

<a name="FileSystem"></a>

## FileSystem
**Kind**: global class  

* [FileSystem](#FileSystem)
    * [new FileSystem()](#new_FileSystem_new)
    * _instance_
        * [._impl](#FileSystem+_impl)
        * [._index](#FileSystem+_index)
        * [._activeChangeCount](#FileSystem+_activeChangeCount) : <code>number</code>
        * [._externalChanges](#FileSystem+_externalChanges) : <code>Object</code>
        * [._watchRequests](#FileSystem+_watchRequests) : <code>Object</code>
        * [._watchedRoots](#FileSystem+_watchedRoots) : <code>Object.&lt;string, WatchedRoot&gt;</code>
        * [._triggerExternalChangesNow()](#FileSystem+_triggerExternalChangesNow)
        * [._enqueueExternalChange(path, [stat])](#FileSystem+_enqueueExternalChange)
        * [._dequeueWatchRequest()](#FileSystem+_dequeueWatchRequest)
        * [._enqueueWatchRequest(fn, cb)](#FileSystem+_enqueueWatchRequest)
        * [._findWatchedRootForPath(fullPath)](#FileSystem+_findWatchedRootForPath) ⇒ <code>Object</code>
        * [.init(impl)](#FileSystem+init)
        * [.close()](#FileSystem+close)
        * [.alwaysIndex()](#FileSystem+alwaysIndex)
        * [._beginChange()](#FileSystem+_beginChange)
        * [._endChange()](#FileSystem+_endChange)
        * [._normalizePath(path, [isDirectory])](#FileSystem+_normalizePath) ⇒ <code>string</code>
        * [.addEntryForPathIfRequired(The, The)](#FileSystem+addEntryForPathIfRequired)
        * [.getFileForPath(path)](#FileSystem+getFileForPath) ⇒ <code>File</code>
        * [.copy(src, dst, callback)](#FileSystem+copy)
        * [.getFreePath(suggestedPath, callback)](#FileSystem+getFreePath)
        * [.getDirectoryForPath(path)](#FileSystem+getDirectoryForPath) ⇒ [<code>Directory</code>](#Directory)
        * [.resolve(path, callback)](#FileSystem+resolve)
        * [.existsAsync(path, callback)](#FileSystem+existsAsync)
        * [.resolveAsync(path)](#FileSystem+resolveAsync) ⇒ <code>Object</code>
        * [.showOpenDialog(allowMultipleSelection, chooseDirectories, title, initialPath, fileTypes, callback)](#FileSystem+showOpenDialog)
        * [.showSaveDialog(title, initialPath, proposedNewFilename, callback)](#FileSystem+showSaveDialog)
        * [._fireRenameEvent(oldPath, newPath)](#FileSystem+_fireRenameEvent)
        * [._fireChangeEvent(entry, [added], [removed])](#FileSystem+_fireChangeEvent)
        * [._handleDirectoryChange(directory, callback)](#FileSystem+_handleDirectoryChange)
        * [.getAllDirectoryContents(directory, [filterNothing])](#FileSystem+getAllDirectoryContents) ⇒ <code>Promise.&lt;Array.&lt;(File\|Directory)&gt;&gt;</code>
        * [.clearAllCaches()](#FileSystem+clearAllCaches)
        * [.watch(entry, filter, filterGitIgnore, [callback])](#FileSystem+watch)
        * [.unwatch(entry, [callback])](#FileSystem+unwatch)
    * _static_
        * [.isAbsolutePath(fullPath)](#FileSystem.isAbsolutePath) ⇒ <code>boolean</code>

<a name="new_FileSystem_new"></a>

### new FileSystem()
The FileSystem is not usable until init() signals its callback.

<a name="FileSystem+_impl"></a>

### fileSystem.\_impl
The low-level file system implementation used by this object.

**Kind**: instance property of [<code>FileSystem</code>](#FileSystem)  
<a name="FileSystem+_index"></a>

### fileSystem.\_index
The FileIndex used by this object. This is initialized in the constructor.

**Kind**: instance property of [<code>FileSystem</code>](#FileSystem)  
<a name="FileSystem+_activeChangeCount"></a>

### fileSystem.\_activeChangeCount : <code>number</code>
Refcount of any pending filesystem mutation operations (e.g., writes,

**Kind**: instance property of [<code>FileSystem</code>](#FileSystem)  
<a name="FileSystem+_externalChanges"></a>

### fileSystem.\_externalChanges : <code>Object</code>
Queue of arguments with which to invoke _handleExternalChanges(); triggered

**Kind**: instance property of [<code>FileSystem</code>](#FileSystem)  
<a name="FileSystem+_watchRequests"></a>

### fileSystem.\_watchRequests : <code>Object</code>
The queue of pending watch/unwatch requests.

**Kind**: instance property of [<code>FileSystem</code>](#FileSystem)  
<a name="FileSystem+_watchedRoots"></a>

### fileSystem.\_watchedRoots : <code>Object.&lt;string, WatchedRoot&gt;</code>
The set of watched roots, encoded as a mapping from full paths to WatchedRoot

**Kind**: instance property of [<code>FileSystem</code>](#FileSystem)  
<a name="FileSystem+_triggerExternalChangesNow"></a>

### fileSystem.\_triggerExternalChangesNow()
Process all queued watcher results, by calling _handleExternalChange() on each

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  
<a name="FileSystem+_enqueueExternalChange"></a>

### fileSystem.\_enqueueExternalChange(path, [stat])
Receives a result from the impl's watcher callback, and either processes it

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The fullPath of the changed entry |
| [stat] | <code>FileSystemStats</code> | An optional stat object for the changed entry |

<a name="FileSystem+_dequeueWatchRequest"></a>

### fileSystem.\_dequeueWatchRequest()
Dequeue and process all pending watch/unwatch requests

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  
<a name="FileSystem+_enqueueWatchRequest"></a>

### fileSystem.\_enqueueWatchRequest(fn, cb)
Enqueue a new watch/unwatch request.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The watch/unwatch request function. |
| cb | <code>callback()</code> | The callback for the provided watch/unwatch      request function. |

<a name="FileSystem+_findWatchedRootForPath"></a>

### fileSystem.\_findWatchedRootForPath(fullPath) ⇒ <code>Object</code>
Finds a parent watched root for a given path, or returns null if a parent

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  
**Returns**: <code>Object</code> - The parent

| Param | Type | Description |
| --- | --- | --- |
| fullPath | <code>string</code> | The child path for which a parent watched root is to be found. |

<a name="FileSystem+init"></a>

### fileSystem.init(impl)
Initialize this FileSystem instance.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| impl | <code>FileSystemImpl</code> | The back-end implementation for this      FileSystem instance. |

<a name="FileSystem+close"></a>

### fileSystem.close()
Close a file system. Clear all caches, indexes, and file watchers.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  
<a name="FileSystem+alwaysIndex"></a>

### fileSystem.alwaysIndex()
Will never remove the given file from index. Useful if you want to always hold cache the file.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  
<a name="FileSystem+_beginChange"></a>

### fileSystem.\_beginChange()
Indicates that a filesystem-mutating operation has begun. As long as there

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  
<a name="FileSystem+_endChange"></a>

### fileSystem.\_endChange()
Indicates that a filesystem-mutating operation has completed. See

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  
<a name="FileSystem+_normalizePath"></a>

### fileSystem.\_normalizePath(path, [isDirectory]) ⇒ <code>string</code>
Returns a canonical version of the path: no duplicated "/"es, no ".."s,

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Absolute path, using "/" as path separator |
| [isDirectory] | <code>boolean</code> |  |

<a name="FileSystem+addEntryForPathIfRequired"></a>

### fileSystem.addEntryForPathIfRequired(The, The)
This method adds an entry for a file in the file Index. Files on disk are added

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| The | <code>File</code> | fileEntry which needs to be added |
| The | <code>String</code> | full path to the file |

<a name="FileSystem+getFileForPath"></a>

### fileSystem.getFileForPath(path) ⇒ <code>File</code>
Return a File object for the specified path.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  
**Returns**: <code>File</code> - The File object. This file may not yet exist on disk.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Absolute path of file. |

<a name="FileSystem+copy"></a>

### fileSystem.copy(src, dst, callback)
copies a file/folder path from src to destination recursively. follows unix copy semantics mostly.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | Absolute path of file or directory to copy |
| dst | <code>string</code> | Absolute path of file or directory destination |
| callback | <code>function</code> | Callback with err or stat of copied destination. |

<a name="FileSystem+getFreePath"></a>

### fileSystem.getFreePath(suggestedPath, callback)
Return a path that is free to use for the given suggestedPath.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| suggestedPath | <code>string</code> | Absolute path of file or directory to check if free. |
| callback | <code>function</code> | Callback with err or Absolute path that is free to use. |

<a name="FileSystem+getDirectoryForPath"></a>

### fileSystem.getDirectoryForPath(path) ⇒ [<code>Directory</code>](#Directory)
Return a Directory object for the specified path.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  
**Returns**: [<code>Directory</code>](#Directory) - The Directory object. This directory may not yet exist on disk.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Absolute path of directory. |

<a name="FileSystem+resolve"></a>

### fileSystem.resolve(path, callback)
Resolve a path.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The path to resolve |
| callback | <code>function</code> | Callback resolved      with a FileSystemError string or with the entry for the provided path. |

<a name="FileSystem+existsAsync"></a>

### fileSystem.existsAsync(path, callback)
Determine whether a file or directory exists at the given path

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| callback | <code>function</code> | 

<a name="FileSystem+resolveAsync"></a>

### fileSystem.resolveAsync(path) ⇒ <code>Object</code>
promisified version of FileSystem.resolve

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | to resolve |

<a name="FileSystem+showOpenDialog"></a>

### fileSystem.showOpenDialog(allowMultipleSelection, chooseDirectories, title, initialPath, fileTypes, callback)
Show an "Open" dialog and return the file(s)/directories selected by the user.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| allowMultipleSelection | <code>boolean</code> | Allows selecting more than one file at a time |
| chooseDirectories | <code>boolean</code> | Allows directories to be opened |
| title | <code>string</code> | The title of the dialog |
| initialPath | <code>string</code> | The folder opened inside the window initially. If initialPath                          is not set, or it doesn't exist, the window would show the last                          browsed folder depending on the OS preferences |
| fileTypes | <code>Array.&lt;string&gt;</code> | (Currently *ignored* except on Mac - https://trello.com/c/430aXkpq)                          List of extensions that are allowed to be opened, without leading ".".                          Null or empty array allows all files to be selected. Not applicable                          when chooseDirectories = true. |
| callback | <code>function</code> | Callback resolved with a FileSystemError                          string or the selected file(s)/directories. If the user cancels the                          open dialog, the error will be falsy and the file/directory array will                          be empty. |

<a name="FileSystem+showSaveDialog"></a>

### fileSystem.showSaveDialog(title, initialPath, proposedNewFilename, callback)
Show a "Save" dialog and return the path of the file to save.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The title of the dialog. |
| initialPath | <code>string</code> | The folder opened inside the window initially. If initialPath                          is not set, or it doesn't exist, the window would show the last                          browsed folder depending on the OS preferences. |
| proposedNewFilename | <code>string</code> | Provide a new file name for the user. This could be based on                          on the current file name plus an additional suffix |
| callback | <code>function</code> | Callback that is resolved with a FileSystemError                          string or the name of the file to save. If the user cancels the save,                          the error will be falsy and the name will be empty. |

<a name="FileSystem+_fireRenameEvent"></a>

### fileSystem.\_fireRenameEvent(oldPath, newPath)
Fire a rename event. Clients listen for these events using FileSystem.on.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| oldPath | <code>string</code> | The entry's previous fullPath |
| newPath | <code>string</code> | The entry's current fullPath |

<a name="FileSystem+_fireChangeEvent"></a>

### fileSystem.\_fireChangeEvent(entry, [added], [removed])
Fire a change event. Clients listen for these events using FileSystem.on.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>File</code> \| [<code>Directory</code>](#Directory) | The entry that has changed |
| [added] | <code>Array.&lt;(File\|Directory)&gt;</code> | If the entry is a directory, this      is a set of new entries in the directory. |
| [removed] | <code>Array.&lt;(File\|Directory)&gt;</code> | If the entry is a directory, this      is a set of removed entries from the directory. |

<a name="FileSystem+_handleDirectoryChange"></a>

### fileSystem.\_handleDirectoryChange(directory, callback)
Notify the filesystem that the given directory has changed. Updates the filesystem's

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| directory | [<code>Directory</code>](#Directory) | The directory that has changed. |
| callback | <code>function</code> | The callback that will be applied to a set of added and a set of removed      FileSystemEntry objects. |

<a name="FileSystem+getAllDirectoryContents"></a>

### fileSystem.getAllDirectoryContents(directory, [filterNothing]) ⇒ <code>Promise.&lt;Array.&lt;(File\|Directory)&gt;&gt;</code>
Recursively gets all files and directories given a root path. It filters out all files

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  
**Returns**: <code>Promise.&lt;Array.&lt;(File\|Directory)&gt;&gt;</code> - A promise that resolves with an array of file and directory contents.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| directory | [<code>Directory</code>](#Directory) |  | The root directory to get all descendant contents from. |
| [filterNothing] | <code>boolean</code> | <code>false</code> | If true, returns everything, including system locations like `.git`.     Use this option for full backups or entire disk read workflows. |

<a name="FileSystem+clearAllCaches"></a>

### fileSystem.clearAllCaches()
Clears all cached content. Because of the performance implications of this, this should only be used if

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  
<a name="FileSystem+watch"></a>

### fileSystem.watch(entry, filter, filterGitIgnore, [callback])
Start watching a filesystem root entry.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>FileSystemEntry</code> | The root entry to watch. If entry is a directory,      all subdirectories that aren't explicitly filtered will also be watched. |
| filter | <code>function</code> | Returns true if a particular item should      be watched, given its name (not full path). Items that are ignored are also      filtered from Directory.getContents() results within this subtree. |
| filterGitIgnore | <code>string</code> \| <code>Array.&lt;string&gt;</code> | GitIgnore file contents or as arrayof strings for      filtering out events on the node side. |
| [callback] | <code>function</code> | A function that is called when the watch has      completed. If the watch fails, the function will have a non-null FileSystemError      string parametr. |

<a name="FileSystem+unwatch"></a>

### fileSystem.unwatch(entry, [callback])
Stop watching a filesystem root entry.

**Kind**: instance method of [<code>FileSystem</code>](#FileSystem)  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>FileSystemEntry</code> | The root entry to stop watching. The unwatch will      if the entry is not currently being watched. |
| [callback] | <code>function</code> | A function that is called when the unwatch has      completed. If the unwatch fails, the function will have a non-null FileSystemError      string parameter. |

<a name="FileSystem.isAbsolutePath"></a>

### FileSystem.isAbsolutePath(fullPath) ⇒ <code>boolean</code>
Determines whether or not the supplied path is absolute, as opposed to relative.

**Kind**: static method of [<code>FileSystem</code>](#FileSystem)  
**Returns**: <code>boolean</code> - True if the fullPath is absolute and false otherwise.  

| Param | Type |
| --- | --- |
| fullPath | <code>string</code> | 

<a name="Directory"></a>

## Directory
FileSystem is a model object representing a complete file system. This object creates

**Kind**: global constant  
<a name="registerProtocolAdapter"></a>

## registerProtocolAdapter(protocol, ...adapter)
FileSystem hook to register file protocol adapter

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| protocol | <code>string</code> | ex: "https:"|"http:"|"ftp:"|"file:" |
| ...adapter | [<code>Adapter</code>](#FileProtocol..Adapter) | wrapper over file implementation |

<a name="_getProtocolAdapter"></a>

## \_getProtocolAdapter(protocol, filePath) ⇒
**Kind**: global function  
**Returns**: adapter adapter wrapper over file implementation  

| Param | Type | Description |
| --- | --- | --- |
| protocol | <code>string</code> | ex: "https:"|"http:"|"ftp:"|"file:" |
| filePath | <code>string</code> | fullPath of the file |

<a name="on"></a>

## on(event, handler)
Add an event listener for a FileSystem event.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The name of the event |
| handler | <code>function</code> | The handler for the event |

<a name="off"></a>

## off(event, handler)
Remove an event listener for a FileSystem event.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The name of the event |
| handler | <code>function</code> | The handler for the event |
