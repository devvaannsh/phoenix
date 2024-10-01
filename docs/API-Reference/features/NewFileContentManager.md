### Import :
```js
brackets.getModule("features/NewFileContentManager")
```

<a name="module_features/NewFileContentManager"></a>

## features/NewFileContentManager
NewFileContentManager provides support to add default template content when a new/empty file is created.
Extensions can register to provide content with `NewFileContentManager.registerContentProvider` API.

## Usage
Let's say whenever a user creates a new js file, we have to prefill the contents to "sample content"

**Example**  
```js
const NewFileContentManager = brackets.getModule("features/NewFileContentManager");
// replace `js` with language ID(Eg. javascript) if you want to restrict the preview to js files only. use `all` for
// all languages.
NewFileContentManager.registerContentProvider(exports, ["js"], 1);

// provide a helpful name for the ContentProvider. This will be useful if you have to debug.
exports.CONTENT_PROVIDER_NAME = "extension.someName";
// now implement the getContent function that will be invoked when ever user creates a new empty file.
exports.getContent = function(fullPath) {
        return new Promise((resolve, reject)=>{
            resolve("sample content");
        });
    };
```

## API
### registerContentProvider
Register a Content provider with this api.
**Example**  
```js
// syntax
NewFileContentManager.registerContentProvider(provider, supportedLanguages, priority);
```
The API requires three parameters:
1. `provider`: must implement a  `getContent` function which will be invoked to get the content. See API doc below.
1. `supportedLanguages`: An array of languages that the provider supports. If `["all"]` is supplied, then the
   provider will be invoked for all languages. Restrict to specific languages: Eg: `["javascript", "html", "php"]`
1. `priority`: Contents provided hy providers with higher priority will win if there are more than
   one provider registered for the language. Default is 0.
**Example**  
```js
// to register a provider that will be invoked for all languages. where provider is any object that implements
// a getContent function
NewFileContentManager.registerContentProvider(provider, ["all"]);

// to register a provider that will be invoked for specific languages
NewFileContentManager.registerContentProvider(provider, ["javascript", "html", "php"]);
```

### removeContentProvider
Removes a registered content provider. The API takes the same arguments as `registerContentProvider`.
**Example**  
```js
// syntax
NewFileContentManager.removeContentProvider(provider, supportedLanguages);
// Example
NewFileContentManager.removeContentProvider(provider, ["javascript", "html"]);
```

### provider.getContent
Each provider must implement the `getContent` function that returns a promise. The promise either resolves with
the content text or rejects if there is no content made available by the provider.
**Example**  
```js
exports.CONTENT_PROVIDER_NAME = "extension.someName"; // for debugging
// function signature
exports.getContent = function(fullPath) {
        return new Promise((resolve, reject)=>{
            resolve("sample content");
        });
    };
```

#### parameters
The function will be called with the path of the file that needs the content.
1. `fullPath` - string path

#### return types
A promise that resolves with the content text or rejects if there is no content made available by the provider.
<a name="module_features/NewFileContentManager..getInitialContentForFile"></a>

### features/NewFileContentManager.getInitialContentForFile(fullPath) ⇒ <code>Promise.&lt;string&gt;</code>
Returns a promise that resolves to the default text content of the given file after querying
all the content providers. If no text is returned by any providers, it will return an empty string "".
To get the default content given a path
NewFileContentManager.getInitialContentForFile("/path/to/file.jsx");

**Kind**: inner method of [<code>features/NewFileContentManager</code>](#module_features/NewFileContentManager)  
**Returns**: <code>Promise.&lt;string&gt;</code> - The text contents  

| Param | Type |
| --- | --- |
| fullPath | <code>string</code> | 
