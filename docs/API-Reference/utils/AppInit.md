### Import :
```js
const AppInit = brackets.getModule("utils/AppInit")
```

<a name="Metrics"></a>

## Metrics
Defines hooks to assist with module initialization.

**Kind**: global constant  
<a name="appReady"></a>

## appReady(handler)
Adds a callback for the ready hook. Handlers are called after

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | callback function to call when the event is fired |

<a name="htmlReady"></a>

## htmlReady(handler)
Adds a callback for the htmlReady hook. Handlers are called after the

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | callback function to call when the event is fired |

<a name="extensionsLoaded"></a>

## extensionsLoaded(handler)
Adds a callback for the extensionsLoaded hook. Handlers are called after the

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | callback function to call when the event is fired |
