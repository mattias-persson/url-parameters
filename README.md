[![Latest Version on NPM](https://img.shields.io/npm/v/url-parameters.svg?style=flat-square)](https://npmjs.com/package/url-parameters)
[![Total Downloads on NPM](https://img.shields.io/npm/dt/url-parameters.svg)](https://www.npmjs.com/package/url-parameters)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)

# url-parameters
Easily manage and listen for changes in query parameters, with full support for the browser history API.

## Installation
```bash
npm install url-parameters --save

yarn add url-parameters
```

## Usage

```javascript
import url from 'url-parameters';

// Enable the URL listener. This will be triggered on page load and every time a URL parameter changes.
// You can use onChange.queryParams and onChange.queryString to access
// the URL parameters as an object or string.
url.enable(onChange => {
  console.log(onChange.queryParams); // object
  console.log(onChange.queryString); // string
});
```

## Disabling Push State
You can disable the Push State by setting the second parameter to `false` when enabling the url listener:
```javascript
url.enable(onChangeCallback, false);
```
This will add a `#` before the parameters in the URL and will prevent a page reload when the parameters are changed.

## Modifying parameters and their values
All of these methods will trigger the listener callback in the `enable()` method demonstrated above which provides the updated parameters as an object and as the full query string.
```javascript

// Add or update a single parameter value.
url.set('param', 'value')

// Add ?param=value if it's not already present. Remove the parameter if it is already present.
url.toggle('param', 'value')

// Toggle a value on the parameter. If the value already exists on the parameter it will be removed.
// If multiple values are present they will become a comma separated string.
url.toggleValue('param', 'value')

// Replace any current query string with the provided list of parameters.
url.apply('param=value&param2=value2')
url.apply({param: 'value', param2: 'value2'})

// Replace a set of parameter values. Will add non-existent parameters.
url.replace({param1: value1, param2: value2})

// Remove a parameter.
url.remove('param')

// Clear all parameters from the URL.
url.clear()
```

## Accessing parameters and their values directly
```javascript

// Returns the value of param or null if param is not present. 
url.get('param')

// Returns the value of param or 'default' if param is not present. 
url.get('param', 'default') 

// Check if a parameter contains a value, for example in a comma separated list of values.
url.containsValue('param', 'value')

// Returns the full query string.
url.getQueryString()

// Returns the URL parameters as an object.
url.getParams()
```