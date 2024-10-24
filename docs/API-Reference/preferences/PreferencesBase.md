### Import :
```js
const PreferencesBase = brackets.getModule("preferences/PreferencesBase")
```

<a name="MemoryStorage"></a>

## MemoryStorage
**Kind**: global class  

* [MemoryStorage](#MemoryStorage)
    * [new MemoryStorage(data)](#new_MemoryStorage_new)
    * [.load()](#MemoryStorage+load) ⇒ <code>Promise</code>
    * [.save(newData)](#MemoryStorage+save) ⇒ <code>Promise</code>
    * [.fileChanged(filePath)](#MemoryStorage+fileChanged)

<a name="new_MemoryStorage_new"></a>

### new MemoryStorage(data)
MemoryStorage, as the name implies, stores the preferences in memory.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Initial data for the storage. |

<a name="MemoryStorage+load"></a>

### memoryStorage.load() ⇒ <code>Promise</code>
*Synchronously* returns the data stored in this storage.

**Kind**: instance method of [<code>MemoryStorage</code>](#MemoryStorage)  
**Returns**: <code>Promise</code> - promise that is already resolved  
<a name="MemoryStorage+save"></a>

### memoryStorage.save(newData) ⇒ <code>Promise</code>
*Synchronously* saves the data to this storage. This saves

**Kind**: instance method of [<code>MemoryStorage</code>](#MemoryStorage)  
**Returns**: <code>Promise</code> - promise that is already resolved  

| Param | Type | Description |
| --- | --- | --- |
| newData | <code>Object</code> | The data to store. |

<a name="MemoryStorage+fileChanged"></a>

### memoryStorage.fileChanged(filePath)
MemoryStorage is not stored in a file, so fileChanged is ignored.

**Kind**: instance method of [<code>MemoryStorage</code>](#MemoryStorage)  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | File that has changed |

<a name="ParsingError"></a>

## ParsingError
**Kind**: global class  
<a name="new_ParsingError_new"></a>

### new ParsingError(message)
Error type for problems parsing preference files.


| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | Error message |

<a name="FileStorage"></a>

## FileStorage
**Kind**: global class  

* [FileStorage](#FileStorage)
    * [new FileStorage(path, createIfMissing, recreateIfInvalid)](#new_FileStorage_new)
    * [.load()](#FileStorage+load) ⇒ <code>Promise</code>
    * [.save(newData)](#FileStorage+save) ⇒ <code>Promise</code>
    * [.setPath(newPath)](#FileStorage+setPath)
    * [.fileChanged(filePath)](#FileStorage+fileChanged)

<a name="new_FileStorage_new"></a>

### new FileStorage(path, createIfMissing, recreateIfInvalid)
Loads/saves preferences from a JSON file on disk.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Path to the preferences file |
| createIfMissing | <code>boolean</code> | True if the file should be created if it doesn't exist.                              If this is not true, an exception will be thrown if the                              file does not exist. |
| recreateIfInvalid | <code>boolean</code> | True if the file needs to be recreated if it is invalid.                              Invalid- Either unreadable or unparseable.                              The invalid copy will be sent to trash in case the user wants to refer to it. |

<a name="FileStorage+load"></a>

### fileStorage.load() ⇒ <code>Promise</code>
Loads the preferences from disk. Can throw an exception if the file is not

**Kind**: instance method of [<code>FileStorage</code>](#FileStorage)  
**Returns**: <code>Promise</code> - Resolved with the data once it has been parsed.  
<a name="FileStorage+save"></a>

### fileStorage.save(newData) ⇒ <code>Promise</code>
Saves the new data to disk.

**Kind**: instance method of [<code>FileStorage</code>](#FileStorage)  
**Returns**: <code>Promise</code> - Promise resolved (with no arguments) once the data has been saved  

| Param | Type | Description |
| --- | --- | --- |
| newData | <code>Object</code> | data to save |

<a name="FileStorage+setPath"></a>

### fileStorage.setPath(newPath)
Changes the path to the preferences file.

**Kind**: instance method of [<code>FileStorage</code>](#FileStorage)  

| Param | Type | Description |
| --- | --- | --- |
| newPath | <code>string</code> | location of this settings file |

<a name="FileStorage+fileChanged"></a>

### fileStorage.fileChanged(filePath)
If the filename matches this Storage's path, a changed message is triggered.

**Kind**: instance method of [<code>FileStorage</code>](#FileStorage)  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | File that has changed |

<a name="Scope"></a>

## Scope
**Kind**: global class  
<a name="new_Scope_new"></a>

### new Scope(storage)
A `Scope` is a data container that is tied to a `Storage`.


| Param | Type | Description |
| --- | --- | --- |
| storage | <code>Storage</code> | Storage object from which prefs are loaded/saved |

<a name="ProjectLayer"></a>

## ProjectLayer
**Kind**: global class  

* [ProjectLayer](#ProjectLayer)
    * [new ProjectLayer()](#new_ProjectLayer_new)
    * [.get(data, id)](#ProjectLayer+get)
    * [.getPreferenceLocation(data, id)](#ProjectLayer+getPreferenceLocation) ⇒ <code>string</code>
    * [.set(data, id, value, context, [layerID])](#ProjectLayer+set) ⇒ <code>boolean</code>
    * [.getKeys(data)](#ProjectLayer+getKeys)
    * [.setProjectPath(projectPath)](#ProjectLayer+setProjectPath)

<a name="new_ProjectLayer_new"></a>

### new ProjectLayer()
Create a default project layer object that has a single property "key"

<a name="ProjectLayer+get"></a>

### projectLayer.get(data, id)
Retrieve the current value based on the current project path

**Kind**: instance method of [<code>ProjectLayer</code>](#ProjectLayer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the preference data from the Scope |
| id | <code>string</code> | preference ID to look up |

<a name="ProjectLayer+getPreferenceLocation"></a>

### projectLayer.getPreferenceLocation(data, id) ⇒ <code>string</code>
Gets the location in which the given pref was set, if it was set within

**Kind**: instance method of [<code>ProjectLayer</code>](#ProjectLayer)  
**Returns**: <code>string</code> - the Layer ID, in this case the current project path.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the preference data from the Scope |
| id | <code>string</code> | preference ID to look up |

<a name="ProjectLayer+set"></a>

### projectLayer.set(data, id, value, context, [layerID]) ⇒ <code>boolean</code>
Sets the preference value in the given data structure for the layerID provided. If no

**Kind**: instance method of [<code>ProjectLayer</code>](#ProjectLayer)  
**Returns**: <code>boolean</code> - true if the value was set  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the preference data from the Scope |
| id | <code>string</code> | preference ID to look up |
| value | <code>Object</code> | new value to assign to the preference |
| context | <code>Object</code> | Object with scope and layer key-value pairs (not yet used in project layer) |
| [layerID] | <code>string</code> | Optional: project path to be used for setting value |

<a name="ProjectLayer+getKeys"></a>

### projectLayer.getKeys(data)
Retrieves the keys provided by this layer object.

**Kind**: instance method of [<code>ProjectLayer</code>](#ProjectLayer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the preference data from the Scope |

<a name="ProjectLayer+setProjectPath"></a>

### projectLayer.setProjectPath(projectPath)
Set the project path to be used as the layer ID of this layer object.

**Kind**: instance method of [<code>ProjectLayer</code>](#ProjectLayer)  

| Param | Type | Description |
| --- | --- | --- |
| projectPath | <code>string</code> | Path of the project root |

<a name="Create a language layer object. Language Layer is completely stateless, it

## Create a language layer object. Language Layer is completely stateless, it
**Kind**: global class  
<a name="PathLayer"></a>

## PathLayer
**Kind**: global class  

* [PathLayer](#PathLayer)
    * [new PathLayer(prefFilePath)](#new_PathLayer_new)
    * [.get(data, id, context)](#PathLayer+get)
    * [.getPreferenceLocation(data, id, context)](#PathLayer+getPreferenceLocation) ⇒ <code>string</code>
    * [.set(data, id, value, context, [layerID])](#PathLayer+set) ⇒ <code>boolean</code>
    * [.getKeys(data, context)](#PathLayer+getKeys)
    * [.setPrefFilePath(prefFilePath)](#PathLayer+setPrefFilePath)
    * [.contextChanged(data, oldContext, newContext)](#PathLayer+contextChanged) ⇒ <code>Array.&lt;string&gt;</code>

<a name="new_PathLayer_new"></a>

### new PathLayer(prefFilePath)
There can be multiple paths and they are each checked in turn. The first that matches the


| Param | Type | Description |
| --- | --- | --- |
| prefFilePath | <code>string</code> | path to the preference file |

<a name="PathLayer+get"></a>

### pathLayer.get(data, id, context)
Retrieve the current value based on the filename in the context

**Kind**: instance method of [<code>PathLayer</code>](#PathLayer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the preference data from the Scope |
| id | <code>string</code> | preference ID to look up |
| context | <code>Object</code> | Object with filename that will be compared to the globs |

<a name="PathLayer+getPreferenceLocation"></a>

### pathLayer.getPreferenceLocation(data, id, context) ⇒ <code>string</code>
Gets the location in which the given pref was set, if it was set within

**Kind**: instance method of [<code>PathLayer</code>](#PathLayer)  
**Returns**: <code>string</code> - the Layer ID, in this case the glob that matched  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the preference data from the Scope |
| id | <code>string</code> | preference ID to look up |
| context | <code>Object</code> | Object with filename that will be compared to the globs |

<a name="PathLayer+set"></a>

### pathLayer.set(data, id, value, context, [layerID]) ⇒ <code>boolean</code>
Sets the preference value in the given data structure for the layerID provided. If no

**Kind**: instance method of [<code>PathLayer</code>](#PathLayer)  
**Returns**: <code>boolean</code> - true if the value was set  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the preference data from the Scope |
| id | <code>string</code> | preference ID to look up |
| value | <code>Object</code> | new value to assign to the preference |
| context | <code>Object</code> | Object with filename that will be compared to the globs |
| [layerID] | <code>string</code> | Optional: glob pattern for a specific section to set the value in |

<a name="PathLayer+getKeys"></a>

### pathLayer.getKeys(data, context)
Retrieves the keys provided by this layer object. If context with a filename is provided,

**Kind**: instance method of [<code>PathLayer</code>](#PathLayer)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the preference data from the Scope |
| context | <code>Object</code> | Additional context data (filename in particular is important) |

<a name="PathLayer+setPrefFilePath"></a>

### pathLayer.setPrefFilePath(prefFilePath)
Changes the preference file path.

**Kind**: instance method of [<code>PathLayer</code>](#PathLayer)  

| Param | Type | Description |
| --- | --- | --- |
| prefFilePath | <code>string</code> | New path to the preferences file |

<a name="PathLayer+contextChanged"></a>

### pathLayer.contextChanged(data, oldContext, newContext) ⇒ <code>Array.&lt;string&gt;</code>
Determines if there are preference IDs that could change as a result of

**Kind**: instance method of [<code>PathLayer</code>](#PathLayer)  
**Returns**: <code>Array.&lt;string&gt;</code> - list of preference IDs that could have changed  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Data in the Scope |
| oldContext | <code>Object</code> | Old context |
| newContext | <code>Object</code> | New context |

<a name="Preference"></a>

## Preference
**Kind**: global class  
<a name="new_Preference_new"></a>

### new Preference(properties)
Represents a single, known Preference.


| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | Information about the Preference that is stored on this object |

<a name="PrefixedPreferencesSystem"></a>

## PrefixedPreferencesSystem
**Kind**: global class  

* [PrefixedPreferencesSystem](#PrefixedPreferencesSystem)
    * [new PrefixedPreferencesSystem(base, prefix)](#new_PrefixedPreferencesSystem_new)
    * [.definePreference(id, type, initial, options)](#PrefixedPreferencesSystem+definePreference) ⇒ <code>Object</code>
    * [.getPreference(id)](#PrefixedPreferencesSystem+getPreference)
    * [.get(id, [context])](#PrefixedPreferencesSystem+get)
    * [.getPreferenceLocation(id, [context])](#PrefixedPreferencesSystem+getPreferenceLocation) ⇒ <code>Object</code>
    * [.set(id, value, [options], [doNotSave])](#PrefixedPreferencesSystem+set) ⇒ <code>Object</code>
    * [.on(event, preferenceID, handler)](#PrefixedPreferencesSystem+on)
    * [.off(event, preferenceID, handler)](#PrefixedPreferencesSystem+off)
    * [.save()](#PrefixedPreferencesSystem+save) ⇒ <code>Promise</code>

<a name="new_PrefixedPreferencesSystem_new"></a>

### new PrefixedPreferencesSystem(base, prefix)
Provides a subset of the PreferencesSystem functionality with preference


| Param | Type | Description |
| --- | --- | --- |
| base | [<code>PreferencesSystem</code>](#PreferencesSystem) | The real PreferencesSystem that is backing this one |
| prefix | <code>string</code> | Prefix that is used for preferences lookup. Any separator characters should already be added. |

<a name="PrefixedPreferencesSystem+definePreference"></a>

### prefixedPreferencesSystem.definePreference(id, type, initial, options) ⇒ <code>Object</code>
Defines a new (prefixed) preference.

**Kind**: instance method of [<code>PrefixedPreferencesSystem</code>](#PrefixedPreferencesSystem)  
**Returns**: <code>Object</code> - The preference object.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | unprefixed identifier of the preference. Generally a dotted name. |
| type | <code>string</code> | Data type for the preference (generally, string, boolean, number) |
| initial | <code>Object</code> | Default value for the preference |
| options | <code>Object</code> | Additional options for the pref.      - `options.name`               Name of the preference that can be used in the UI.      - `options.description`        A description of the preference.      - `options.validator`          A function to validate the value of a preference.      - `options.excludeFromHints`   True if you want to exclude a preference from code hints.      - `options.keys`               An object that will hold the child preferences in case the preference type is `object`      - `options.values`             An array of possible values of a preference. It will show up in code hints.      - `options.valueType`          In case the preference type is `array`, `valueType` should hold data type of its elements. |

<a name="PrefixedPreferencesSystem+getPreference"></a>

### prefixedPreferencesSystem.getPreference(id)
Get the prefixed preference object

**Kind**: instance method of [<code>PrefixedPreferencesSystem</code>](#PrefixedPreferencesSystem)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID of the pref to retrieve. |

<a name="PrefixedPreferencesSystem+get"></a>

### prefixedPreferencesSystem.get(id, [context])
Gets the prefixed preference

**Kind**: instance method of [<code>PrefixedPreferencesSystem</code>](#PrefixedPreferencesSystem)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Name of the preference for which the value should be retrieved |
| [context] | <code>Object</code> | Optional context object to change the preference lookup |

<a name="PrefixedPreferencesSystem+getPreferenceLocation"></a>

### prefixedPreferencesSystem.getPreferenceLocation(id, [context]) ⇒ <code>Object</code>
Gets the location in which the value of a prefixed preference has been set.

**Kind**: instance method of [<code>PrefixedPreferencesSystem</code>](#PrefixedPreferencesSystem)  
**Returns**: <code>Object</code> - Object describing where the preferences came from  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Name of the preference for which the value should be retrieved |
| [context] | <code>Object</code> | Optional context object to change the preference lookup |

<a name="PrefixedPreferencesSystem+set"></a>

### prefixedPreferencesSystem.set(id, value, [options], [doNotSave]) ⇒ <code>Object</code>
Sets the prefixed preference.

**Kind**: instance method of [<code>PrefixedPreferencesSystem</code>](#PrefixedPreferencesSystem)  
**Returns**: <code>Object</code> - An object containing:

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The identifier of the preference to set. |
| value | <code>Object</code> | The new value for the preference. |
| [options] | <code>Object</code> | Specific location to set the value or context for the operation. |
| [doNotSave] | <code>boolean</code> | If true, the preference change will not be saved automatically. |

<a name="PrefixedPreferencesSystem+on"></a>

### prefixedPreferencesSystem.on(event, preferenceID, handler)
Sets up a listener for events for this PrefixedPreferencesSystem. Only prefixed events

**Kind**: instance method of [<code>PrefixedPreferencesSystem</code>](#PrefixedPreferencesSystem)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Name of the event to listen for |
| preferenceID | <code>string</code> \| <code>function</code> | Name of a specific preference or the handler function |
| handler | <code>function</code> | Handler for the event |

<a name="PrefixedPreferencesSystem+off"></a>

### prefixedPreferencesSystem.off(event, preferenceID, handler)
Turns off the event handlers for a given event, optionally for a specific preference

**Kind**: instance method of [<code>PrefixedPreferencesSystem</code>](#PrefixedPreferencesSystem)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Name of the event for which to turn off listening |
| preferenceID | <code>string</code> \| <code>function</code> | Name of a specific preference or the handler function |
| handler | <code>function</code> | Specific handler which should stop being notified |

<a name="PrefixedPreferencesSystem+save"></a>

### prefixedPreferencesSystem.save() ⇒ <code>Promise</code>
Saves the preferences. If a save is already in progress, a Promise is returned for

**Kind**: instance method of [<code>PrefixedPreferencesSystem</code>](#PrefixedPreferencesSystem)  
**Returns**: <code>Promise</code> - Resolved when the preferences are done saving.  
<a name="PreferencesSystem"></a>

## PreferencesSystem
**Kind**: global class  
<a name="new_PreferencesSystem_new"></a>

### new PreferencesSystem([contextNormalizer])
PreferencesSystem ties everything together to provide a simple interface for


| Param | Type | Description |
| --- | --- | --- |
| [contextNormalizer] | <code>function</code> | function that is passed the context used for get or set to adjust for specific PreferencesSystem behavior |

<a name="FileUtils"></a>

## FileUtils
Infrastructure for the preferences system.

**Kind**: global variable  
<a name="load"></a>

## load() ⇒ <code>Promise</code>
Loads the prefs for this `Scope` from the `Storage`.

**Kind**: global function  
**Returns**: <code>Promise</code> - Promise that is resolved once loading is complete  
<a name="save"></a>

## save() ⇒ <code>Promise</code>
Saves the prefs for this `Scope`.

**Kind**: global function  
**Returns**: <code>Promise</code> - promise resolved once the data is saved.  
<a name="set"></a>

## set(id, value, [context], [location]) ⇒ <code>boolean</code>
Sets the value for `id`. The value is set at the location given, or at the current

**Kind**: global function  
**Returns**: <code>boolean</code> - true if the value was set  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Key to set |
| value | <code>\*</code> | Value for this key |
| [context] | <code>Object</code> | Optional additional information about the request (typically used for layers) |
| [location] | <code>Object</code> | Optional location in which to set the value.                                                      If the object is empty, the value will be                                                      set at the Scope's base level. |

<a name="get"></a>

## get(id, context) ⇒ <code>\*</code>
Get the value for id, given the context. The context is provided to layers

**Kind**: global function  
**Returns**: <code>\*</code> - Current value of the Preference  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Preference to retrieve |
| context | <code>Object</code> | Optional additional information about the request |

<a name="getPreferenceLocation"></a>

## getPreferenceLocation(id, [context]) ⇒ <code>Object</code> \| <code>undefined</code>
Get the location in this Scope (if any) where the given preference is set.

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>undefined</code> - Object describing where the preferences came from.

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Name of the preference for which the value should be retrieved |
| [context] | <code>Object</code> | Optional context object to change the preference lookup |

<a name="getKeys"></a>

## getKeys(context) ⇒ <code>Array.&lt;string&gt;</code>
Get the preference IDs that are set in this Scope. All layers are added

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - Set of preferences set by this Scope  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | Optional additional information for looking up the keys |

<a name="addLayer"></a>

## addLayer(layer)
Adds a Layer to this Scope. The Layer object should define a `key`, which

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| layer | <code>Layer</code> | Layer object to add to this Scope |

<a name="fileChanged"></a>

## fileChanged(filePath)
Tells the Scope that the given file has been changed so that the

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | File that has changed |

<a name="contextChanged"></a>

## contextChanged(oldContext, newContext) ⇒ <code>Array.&lt;string&gt;</code>
Determines if there are likely to be any changes based on the change

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - List of changed IDs  

| Param | Type | Description |
| --- | --- | --- |
| oldContext | <code>Object</code> | Old context |
| newContext | <code>Object</code> | New context |

<a name="_addEventDispatcherImpl"></a>

## \_addEventDispatcherImpl()
Utility for PreferencesSystem & PrefixedPreferencesSystem -- attach EventDispatcher's on()/off()

**Kind**: global function  
<a name="definePreference"></a>

## definePreference(id, type, initial, options) ⇒ <code>Object</code>
Defines a new preference.

**Kind**: global function  
**Returns**: <code>Object</code> - The preference object.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | identifier of the preference. Generally a dotted name. |
| type | <code>string</code> | Data type for the preference (generally, string, boolean, number) |
| initial | <code>Object</code> | Default value for the preference |
| options | <code>Object</code> | Additional options for the pref.      - `options.name`               Name of the preference that can be used in the UI.      - `options.description`        A description of the preference.      - `options.validator`          A function to validate the value of a preference.      - `options.excludeFromHints`   True if you want to exclude a preference from code hints.      - `options.keys`               An object that will hold the child preferences in case the preference type is `object`      - `options.values`             An array of possible values of a preference. It will show up in code hints.      - `options.valueType`          In case the preference type is `array`, `valueType` should hold data type of its elements. |

<a name="getPreference"></a>

## getPreference(id)
Get the preference object for the given ID.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID of the pref to retrieve. |

<a name="getAllPreferences"></a>

## getAllPreferences() ⇒ <code>Object</code>
Returns a clone of all preferences defined.

**Kind**: global function  
<a name="addToScopeOrder"></a>

## addToScopeOrder(id, before)
Adds scope to the scope order by its id. The scope should be previously added to the preference system.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | the scope id |
| before | <code>string</code> | the id of the scope to add before |

<a name="removeFromScopeOrder"></a>

## removeFromScopeOrder(id)
Removes a scope from the default scope order.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Name of the Scope to remove from the default scope order. |

<a name="addScope"></a>

## addScope(id, scope, options) ⇒ <code>Promise</code>
Adds a new Scope. New Scopes are added at the highest precedence, unless the "before" option

**Kind**: global function  
**Returns**: <code>Promise</code> - Promise that is resolved when the Scope is loaded. It is resolved

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Name of the Scope |
| scope | [<code>Scope</code>](#Scope) \| <code>Storage</code> | the Scope object itself. Optionally, can be given a Storage directly for convenience. |
| options | <code>Object</code> | optional behavior when adding (e.g. setting which scope this comes before) |

<a name="removeScope"></a>

## removeScope(id)
Removes a Scope from this PreferencesSystem. Returns without doing anything

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Name of the Scope to remove |

<a name="get"></a>

## get(id, context)
Get the current value of a preference. The optional context provides a way to

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Name of the preference for which the value should be retrieved |
| context | <code>Object</code> \| <code>string</code> | Optional context object or name of context to change the preference lookup |

<a name="getPreferenceLocation"></a>

## getPreferenceLocation(id, [context]) ⇒ <code>Object</code>
Gets the location in which the value of a preference has been set.

**Kind**: global function  
**Returns**: <code>Object</code> - Object describing where the preferences came from  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Name of the preference for which the value should be retrieved |
| [context] | <code>Object</code> | Optional context object to change the preference lookup |

<a name="set"></a>

## set(id, value, [options], [doNotSave]) ⇒ <code>Object</code>
Sets a preference and notifies listeners that a change may have occurred. 

**Kind**: global function  
**Returns**: <code>Object</code> - An object containing:

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The identifier of the preference to set. |
| value | <code>Object</code> | The new value for the preference. |
| [options] | <code>Object</code> | Specific location to set the value or context for the operation. |
| [doNotSave] | <code>boolean</code> | If true, the preference change will not be saved automatically. |

<a name="save"></a>

## save() ⇒ <code>Promise</code>
Saves the preferences. If a save is already in progress, a Promise is returned for

**Kind**: global function  
**Returns**: <code>Promise</code> - Resolved when the preferences are done saving.  
<a name="signalContextChanged"></a>

## signalContextChanged(oldContext, newContext)
Signals the context change to all the scopes within the preferences

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| oldContext | <code>Object</code> | Old context |
| newContext | <code>Object</code> | New context |

<a name="on"></a>

## on(event, preferenceID, handler)
Sets up a listener for events. Optionally, you can set up a listener for a

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Name of the event to listen for |
| preferenceID | <code>string</code> \| <code>function</code> | Name of a specific preference or the handler function |
| handler | <code>function</code> | Handler for the event |

<a name="off"></a>

## off(event, preferenceID, handler)
Turns off the event handlers for a given event, optionally for a specific preference

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Name of the event for which to turn off listening |
| preferenceID | <code>string</code> \| <code>function</code> | Name of a specific preference or the handler function |
| handler | <code>function</code> | Specific handler which should stop being notified |

<a name="pauseChangeEvents"></a>

## pauseChangeEvents()
Turns off sending of change events, queueing them up for sending once sending is resumed.

**Kind**: global function  
<a name="resumeChangeEvents"></a>

## resumeChangeEvents()
Turns sending of events back on, sending any events that were queued while the

**Kind**: global function  
<a name="fileChanged"></a>

## fileChanged(filePath)
Tells the PreferencesSystem that the given file has been changed so that any

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | File that has changed |

<a name="getPrefixedSystem"></a>

## getPrefixedSystem()
Retrieves a PreferencesSystem in which all preference access is prefixed.

**Kind**: global function  