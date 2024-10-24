### Import :
```js
const ScopeManager = brackets.getModule("JSUtils/ScopeManager")
```

<a name="getBuiltins"></a>

## getBuiltins() ⇒ <code>Array.&lt;string&gt;</code>
An array of library names that contain JavaScript builtins definitions.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - - array of library  names.  
<a name="initTernEnv"></a>

## initTernEnv()
Read in the json files that have type information for the builtins, dom,etc

**Kind**: global function  
<a name="initPreferences"></a>

## initPreferences([projectRootPath])
Init preferences from a file in the project root or builtin

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [projectRootPath] | <code>string</code> | new project root path. Only needed  for unit tests. |

<a name="ensurePreferences"></a>

## ensurePreferences()
Will initialize preferences only if they do not exist.

**Kind**: global function  
<a name="postMessage"></a>

## postMessage()
Send a message to the tern module - if the module is being initialized,

**Kind**: global function  
<a name="isDirectoryExcluded"></a>

## isDirectoryExcluded(path) ⇒ <code>boolean</code>
Test if the directory should be excluded from analysis.

**Kind**: global function  
**Returns**: <code>boolean</code> - true if excluded, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | full directory path. |

<a name="isFileBeingEdited"></a>

## isFileBeingEdited(filePath) ⇒ <code>boolean</code>
Test if the file path is in current editor

**Kind**: global function  
**Returns**: <code>boolean</code> - true if in editor, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | file path to test for exclusion. |

<a name="isFileExcludedInternal"></a>

## isFileExcludedInternal(path) ⇒ <code>boolean</code>
Test if the file path is an internal exclusion.

**Kind**: global function  
**Returns**: <code>boolean</code> - true if excluded, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | file path to test for exclusion. |

<a name="isFileExcluded"></a>

## isFileExcluded(file) ⇒ <code>boolean</code>
Test if the file should be excluded from analysis.

**Kind**: global function  
**Returns**: <code>boolean</code> - true if excluded, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | file to test for exclusion. |

<a name="addPendingRequest"></a>

## addPendingRequest(file, offset, type) ⇒ <code>jQuery.Promise</code>
Add a pending request waiting for the tern-module to complete.

**Kind**: global function  
**Returns**: <code>jQuery.Promise</code> - - the promise for the request  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | the name of the file |
| offset | <code>Object</code> | the offset into the file the request is for |
| type | <code>string</code> | the type of request |

<a name="getPendingRequest"></a>

## getPendingRequest(file, offset, type) ⇒ <code>jQuery.Deferred</code>
Get any pending $.Deferred object waiting on the specified file and request type

**Kind**: global function  
**Returns**: <code>jQuery.Deferred</code> - - the $.Deferred for the request  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | the file |
| offset | <code>Object</code> | the offset into the file the request is for |
| type | <code>string</code> | the type of request |

<a name="getResolvedPath"></a>

## getResolvedPath(file) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - returns the path we resolved when we tried to parse the file, or undefined  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | a relative path |

<a name="getJumptoDef"></a>

## getJumptoDef(fileInfo, offset) ⇒ <code>jQuery.Promise</code>
Get a Promise for the definition from TernJS, for the file & offset passed in.

**Kind**: global function  
**Returns**: <code>jQuery.Promise</code> - - a promise that will resolve to definition when

| Param | Type | Description |
| --- | --- | --- |
| fileInfo | <code>Object</code> | - type of update, name of file, and the text of the update. For "full" updates, the whole text of the file is present. For "part" updates, the changed portion of the text. For "empty" updates, the file has not been modified and the text is empty. |
| offset | <code>Object</code> | the offset in the file the hints should be calculate at |

<a name="filterText"></a>

## filterText(the) ⇒ <code>string</code>
check to see if the text we are sending to Tern is too long.

**Kind**: global function  
**Returns**: <code>string</code> - the text, or the empty text if the original was too long  

| Param | Type | Description |
| --- | --- | --- |
| the | <code>string</code> | text to check |

<a name="getTextFromDocument"></a>

## getTextFromDocument(document) ⇒ <code>string</code>
Get the text of a document, applying any size restrictions

**Kind**: global function  
**Returns**: <code>string</code> - the text, or the empty text if the original was too long  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>Document</code> | the document to get the text from |

<a name="handleRename"></a>

## handleRename(response)
Handle the response from the tern node domain when

**Kind**: global function  

| Param | Description |
| --- | --- |
| response | the response from the node domain |

<a name="requestJumptoDef"></a>

## requestJumptoDef(session, document, offset) ⇒ <code>jQuery.Promise</code>
Request Jump-To-Definition from Tern.

**Kind**: global function  
**Returns**: <code>jQuery.Promise</code> - - The promise will not complete until tern

| Param | Type | Description |
| --- | --- | --- |
| session | <code>session</code> | the session |
| document | <code>Document</code> | the document |
| offset | <code>Object</code> | the offset into the document |

<a name="handleJumptoDef"></a>

## handleJumptoDef(response)
Handle the response from the tern node domain when

**Kind**: global function  

| Param | Description |
| --- | --- |
| response | the response from the node domain |

<a name="handleScopeData"></a>

## handleScopeData(response)
Handle the response from the tern node domain when

**Kind**: global function  

| Param | Description |
| --- | --- |
| response | the response from the node domain |

<a name="getTernHints"></a>

## getTernHints(fileInfo, offset, isProperty) ⇒ <code>jQuery.Promise</code>
Get a Promise for the completions from TernJS, for the file & offset passed in.

**Kind**: global function  
**Returns**: <code>jQuery.Promise</code> - - a promise that will resolve to an array of completions when

| Param | Type | Description |
| --- | --- | --- |
| fileInfo | <code>Object</code> | - type of update, name of file, and the text of the update. For "full" updates, the whole text of the file is present. For "part" updates, the changed portion of the text. For "empty" updates, the file has not been modified and the text is empty. |
| offset | <code>Object</code> | the offset in the file the hints should be calculate at |
| isProperty | <code>boolean</code> | true if getting a property hint, otherwise getting an identifier hint. |

<a name="getTernFunctionType"></a>

## getTernFunctionType(fileInfo, offset) ⇒ <code>jQuery.Promise</code>
Get a Promise for the function type from TernJS.

**Kind**: global function  
**Returns**: <code>jQuery.Promise</code> - - a promise that will resolve to the function type of the function being called.  

| Param | Type | Description |
| --- | --- | --- |
| fileInfo | <code>Object</code> | - type of update, name of file, and the text of the update. For "full" updates, the whole text of the file is present. For "part" updates, the changed portion of the text. For "empty" updates, the file has not been modified and the text is empty. |
| offset | <code>Object</code> | the line, column info for what we want the function type of. |

<a name="getFragmentAround"></a>

## getFragmentAround(session, start) ⇒ <code>Object</code>
Given a starting and ending position, get a code fragment that is self contained

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>Session</code> | the current session |
| start | <code>Object</code> | the starting position of the changes |

<a name="getFileInfo"></a>

## getFileInfo(session, [preventPartialUpdates]) ⇒ <code>Object</code>
Get an object that describes what tern needs to know about the updated

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>Session</code> | the current session |
| [preventPartialUpdates] | <code>boolean</code> | if true, disallow partial updates. Optional, defaults to false. |

<a name="getOffset"></a>

## getOffset(session, fileInfo, [offset]) ⇒ <code>Object</code>
Get the current offset. The offset is adjusted for "part" updates.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>Session</code> | the current session |
| fileInfo | <code>Object</code> | - type of update, name of file, and the text of the update. For "full" updates, the whole text of the file is present. For "part" updates, the changed portion of the text. For "empty" updates, the file has not been modified and the text is empty. |
| [offset] | <code>Object</code> | the default offset (optional). Will use the cursor if not provided. |

<a name="requestGuesses"></a>

## requestGuesses(session, document) ⇒ <code>jQuery.Promise</code>
Get a Promise for all of the known properties from TernJS, for the directory and file.

**Kind**: global function  
**Returns**: <code>jQuery.Promise</code> - - The promise will not complete until the tern

| Param | Type | Description |
| --- | --- | --- |
| session | <code>Session</code> | the active hinting session |
| document | <code>Document</code> | the document for which scope info is      desired |

<a name="handleTernCompletions"></a>

## handleTernCompletions(response)
Handle the response from the tern node domain when

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Object</code> | the response from node domain |

<a name="handleGetGuesses"></a>

## handleGetGuesses(response)
Handle the response from the tern node domain when

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Object</code> | the response from node domain contains the guesses for a      property lookup. |

<a name="handleUpdateFile"></a>

## handleUpdateFile(response)
Handle the response from the tern node domain when

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Object</code> | the response from node domain |

<a name="handleTimedOut"></a>

## handleTimedOut(response)
Handle timed out inference

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Object</code> | the response from node domain |

<a name="TernModule"></a>

## TernModule()
Encapsulate all the logic to talk to the tern module.  This will create

**Kind**: global function  

* [TernModule()](#TernModule)
    * [.getResolvedPath(file)](#TernModule..getResolvedPath) ⇒ <code>string</code>
    * [.usingModules()](#TernModule..usingModules) ⇒ <code>boolean</code>
    * [.postMessage()](#TernModule..postMessage)
    * [._postMessageByPass()](#TernModule.._postMessageByPass)
    * [.updateTernFile(document)](#TernModule..updateTernFile) ⇒ <code>jQuery.Promise</code>
    * [.handleTernGetFile(request)](#TernModule..handleTernGetFile)
        * [.getDocText(filePath)](#TernModule..handleTernGetFile..getDocText) ⇒ <code>jQuery.Promise</code>
        * [.findNameInProject()](#TernModule..handleTernGetFile..findNameInProject)
    * [.primePump(path)](#TernModule..primePump) ⇒ <code>jQuery.Promise</code>
    * [.handlePrimePumpCompletion(response)](#TernModule..handlePrimePumpCompletion)
    * [.addFilesToTern(files)](#TernModule..addFilesToTern) ⇒ <code>boolean</code>
    * [.addAllFilesAndSubdirectories(dir, doneCallback)](#TernModule..addAllFilesAndSubdirectories)
    * [.initTernModule()](#TernModule..initTernModule)
    * [.initTernServer()](#TernModule..initTernServer)
    * [.canSkipTernInitialization(newFile)](#TernModule..canSkipTernInitialization) ⇒ <code>boolean</code>
    * [.doEditorChange(session, document, previousDocument)](#TernModule..doEditorChange)
    * [.handleEditorChange(session, document, previousDocument)](#TernModule..handleEditorChange)
    * [.resetModule()](#TernModule..resetModule)

<a name="TernModule..getResolvedPath"></a>

### TernModule.getResolvedPath(file) ⇒ <code>string</code>
**Kind**: inner method of [<code>TernModule</code>](#TernModule)  
**Returns**: <code>string</code> - returns the path we resolved when we tried to parse the file, or undefined  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | a relative path |

<a name="TernModule..usingModules"></a>

### TernModule.usingModules() ⇒ <code>boolean</code>
Determine whether the current set of files are using modules to pull in

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  
**Returns**: <code>boolean</code> - - true if more files than the current directory have
<a name="TernModule..postMessage"></a>

### TernModule.postMessage()
Send a message to the tern node domain - if the module is being initialized,

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  
<a name="TernModule.._postMessageByPass"></a>

### TernModule.\_postMessageByPass()
Send a message to the tern node domain - this is only for messages that

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  
<a name="TernModule..updateTernFile"></a>

### TernModule.updateTernFile(document) ⇒ <code>jQuery.Promise</code>
Update tern with the new contents of a given file.

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  
**Returns**: <code>jQuery.Promise</code> - - the promise for the request  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>Document</code> | the document to update |

<a name="TernModule..handleTernGetFile"></a>

### TernModule.handleTernGetFile(request)
Handle a request from the tern node domain for text of a file

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>Object</code> | the request from the tern node domain.  Should be an Object containing the name      of the file tern wants the contents of |


* [.handleTernGetFile(request)](#TernModule..handleTernGetFile)
    * [.getDocText(filePath)](#TernModule..handleTernGetFile..getDocText) ⇒ <code>jQuery.Promise</code>
    * [.findNameInProject()](#TernModule..handleTernGetFile..findNameInProject)

<a name="TernModule..handleTernGetFile..getDocText"></a>

#### handleTernGetFile.getDocText(filePath) ⇒ <code>jQuery.Promise</code>
Helper function to get the text of a given document and send it to tern.

**Kind**: inner method of [<code>handleTernGetFile</code>](#TernModule..handleTernGetFile)  
**Returns**: <code>jQuery.Promise</code> - - the Promise returned from DocumentMangaer.getDocumentText()  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | the path of the file to get the text of |

<a name="TernModule..handleTernGetFile..findNameInProject"></a>

#### handleTernGetFile.findNameInProject()
Helper function to find any files in the project that end with the

**Kind**: inner method of [<code>handleTernGetFile</code>](#TernModule..handleTernGetFile)  
<a name="TernModule..primePump"></a>

### TernModule.primePump(path) ⇒ <code>jQuery.Promise</code>
Prime the pump for a fast first lookup.

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  
**Returns**: <code>jQuery.Promise</code> - - the promise for the request  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | full path of file |

<a name="TernModule..handlePrimePumpCompletion"></a>

### TernModule.handlePrimePumpCompletion(response)
Handle the response from the tern node domain when

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Object</code> | the response from node domain |

<a name="TernModule..addFilesToTern"></a>

### TernModule.addFilesToTern(files) ⇒ <code>boolean</code>
Add new files to tern, keeping any previous files.

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  
**Returns**: <code>boolean</code> - - true if more files may be added, false if maximum has been reached.  

| Param | Type | Description |
| --- | --- | --- |
| files | <code>Array.&lt;string&gt;</code> | array of file to add to tern. |

<a name="TernModule..addAllFilesAndSubdirectories"></a>

### TernModule.addAllFilesAndSubdirectories(dir, doneCallback)
Add the files in the directory and subdirectories of a given directory

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>string</code> | the root directory to add. |
| doneCallback | <code>function</code> | called when all files have been added to tern. |

<a name="TernModule..initTernModule"></a>

### TernModule.initTernModule()
Init the Tern module that does all the code hinting work.

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  
<a name="TernModule..initTernServer"></a>

### TernModule.initTernServer()
Create a new tern server.

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  
<a name="TernModule..canSkipTernInitialization"></a>

### TernModule.canSkipTernInitialization(newFile) ⇒ <code>boolean</code>
We can skip tern initialization if we are opening a file that has

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  
**Returns**: <code>boolean</code> - - true if tern initialization should be skipped,

| Param | Type | Description |
| --- | --- | --- |
| newFile | <code>string</code> | full path of new file being opened in the editor. |

<a name="TernModule..doEditorChange"></a>

### TernModule.doEditorChange(session, document, previousDocument)
Do the work to initialize a code hinting session.

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>Session</code> | the active hinting session (TODO: currently unused) |
| document | <code>Document</code> | the document the editor has changed to |
| previousDocument | <code>Document</code> | the document the editor has changed from |

<a name="TernModule..handleEditorChange"></a>

### TernModule.handleEditorChange(session, document, previousDocument)
Called each time a new editor becomes active.

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>Session</code> | the active hinting session (TODO: currently unused by doEditorChange()) |
| document | <code>Document</code> | the document of the editor that has changed |
| previousDocument | <code>Document</code> | the document of the editor is changing from |

<a name="TernModule..resetModule"></a>

### TernModule.resetModule()
Do some cleanup when a project is closed.

**Kind**: inner method of [<code>TernModule</code>](#TernModule)  
<a name="_maybeReset"></a>

## \_maybeReset(session, document, force) ⇒ <code>Promise</code>
reset the tern module, if necessary.

**Kind**: global function  
**Returns**: <code>Promise</code> - Promise resolved when the module is ready.

| Param | Type | Description |
| --- | --- | --- |
| session | <code>Session</code> |  |
| document | <code>Document</code> |  |
| force | <code>boolean</code> | true to force a reset regardless of how long since the last one |

<a name="requestParameterHint"></a>

## requestParameterHint(session, functionOffset) ⇒ <code>jQuery.Promise</code>
Request a parameter hint from Tern.

**Kind**: global function  
**Returns**: <code>jQuery.Promise</code> - - The promise will not complete until the

| Param | Type | Description |
| --- | --- | --- |
| session | <code>Session</code> | the active hinting session |
| functionOffset | <code>Object</code> | the offset of the function call. |

<a name="requestHints"></a>

## requestHints(session, document) ⇒ <code>jQuery.Promise</code>
Request hints from Tern.

**Kind**: global function  
**Returns**: <code>jQuery.Promise</code> - - The promise will not complete until the tern

| Param | Type | Description |
| --- | --- | --- |
| session | <code>Session</code> | the active hinting session |
| document | <code>Document</code> | the document for which scope info is      desired |

<a name="trackChange"></a>

## trackChange(changeList)
Track the update area of the current document so we can tell if we can send

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| changeList | <code>Object</code> | The document changes from the current change event |

<a name="handleEditorChange"></a>

## handleEditorChange(session, document, previousDocument)
Called each time a new editor becomes active.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| session | <code>Session</code> | the active hinting session |
| document | <code>Document</code> | the document of the editor that has changed |
| previousDocument | <code>Document</code> | the document of the editor is changing from |

<a name="handleProjectClose"></a>

## handleProjectClose()
Do some cleanup when a project is closed.

**Kind**: global function  
<a name="handleProjectOpen"></a>

## handleProjectOpen([projectRootPath])
Read in project preferences when a new project is opened.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [projectRootPath] | <code>string</code> | new project root path(optional).  Only needed for unit tests. |

<a name="_readyPromise"></a>

## \_readyPromise()
Used to avoid timing bugs in unit tests

**Kind**: global function  