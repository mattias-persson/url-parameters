# url-parameters
A package to help you easily manage url parameters with browser history support and listening for changes.

## Installation
```bash
npm install url-parameters --save

yarn add url-parameters
```

## Usage

```javascript
const url = require('url-parameters');

// Enable the URL listener.
url.enable(onChange => {
  // This will be triggered every time a URL parameter changes.
  // You can use onChange.queryParams and onChange.queryString to access the URL parameters as an object or string.
});
```

## Available methods
```javascript

// Apply a list of parameters to the URL. 
url.apply('param=value&param2=value2')
url.apply({param: 'value', param2: 'value2'})

// Add a single parameter to the URL.
url.set('param', 'value')

// Add ?param=value if it's not already present. Remove the parameter if it is already present.
url.toggle('param', 'value')

// Toggle a value on the parameter. If the value already exists on the parameter it will be removed.
// If multiple values are present they will become a comma separated string.
url.toggleValue('param', 'value')

// Remove a parameter.
url.remove('param')

// Clear all parameters from the URL.
url.clear()

// Check if a parameter contains a value, for example in a comma separated list of values.
url.containsValue('param', 'value')
```

## Disabling Push State
You can disable the Push State by setting the second parameter to `false` when enabling the url listener:
```javascript
url.enable(onChangeCallback, false);
```
This will add a `#` before the parameters in the URL and will prevent a page reload when the parameters are changed.
