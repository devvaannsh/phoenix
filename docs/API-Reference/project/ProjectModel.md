### Import :
```js
const ProjectModel = brackets.getModule("project/ProjectModel")
```

<a name="The ProjectModel provides methods for accessing information about the current open project.

## The ProjectModel provides methods for accessing information about the current open project.
**Kind**: global class  
<a name="InMemoryFile"></a>

## InMemoryFile
Provides the data source for a project and manages the view model for the FileTreeView.

**Kind**: global variable  
<a name="defaultIgnoreGlobs"></a>

## defaultIgnoreGlobs
Glob definition of files and folders that should be excluded directly

**Kind**: global constant  
<a name="isValidFilename"></a>

## isValidFilename(filename) ⇒ <code>boolean</code>
Returns true if this matches valid filename specifications.

**Kind**: global function  
**Returns**: <code>boolean</code> - true if the filename is valid  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | to check |

<a name="isValidPath"></a>

## isValidPath(path) ⇒ <code>boolean</code>
Returns true if given path is valid.

**Kind**: global function  
**Returns**: <code>boolean</code> - true if the filename is valid  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | to check |

<a name="shouldShow"></a>

## shouldShow(entry) ⇒ <code>boolean</code>
Returns false for files and directories that are not commonly useful to display.

**Kind**: global function  
**Returns**: <code>boolean</code> - true if the file should be displayed  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>FileSystemEntry</code> | File or directory to filter |

<a name="shouldIndex"></a>

## shouldIndex(entry) ⇒ <code>boolean</code>
Returns false for files and directories that should not be indexed for search or code hints.

**Kind**: global function  
**Returns**: <code>boolean</code> - true if the file should be displayed  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>FileSystemEntry</code> | File or directory to filter |

<a name="doCreate"></a>

## doCreate(path, isFolder) ⇒ <code>$.Promise</code>
Creates a new file or folder at the given path. The returned promise is rejected if the filename

**Kind**: global function  
**Returns**: <code>$.Promise</code> - resolved when the file or directory has been created.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | path to create |
| isFolder | <code>boolean</code> | true if the new entry is a folder |

<a name="_ensureTrailingSlash"></a>

## \_ensureTrailingSlash(fullPath) ⇒ <code>string</code>
Although Brackets is generally standardized on folder paths with a trailing "/", some APIs here

**Kind**: global function  
**Returns**: <code>string</code> - Path that ends in "/"  

| Param | Type | Description |
| --- | --- | --- |
| fullPath | <code>string</code> | Path that may or may not end in "/" |

<a name="_isWelcomeProjectPath"></a>

## \_isWelcomeProjectPath(path, welcomeProjectPath, [welcomeProjects])
Returns true if the given path is the same as one of the welcome projects we've previously opened,

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to check to see if it's a welcome project |
| welcomeProjectPath | <code>string</code> | Current welcome project path |
| [welcomeProjects] | <code>Array.&lt;string&gt;</code> | All known welcome projects |
