# <a name="top"></a>![logo][logo-url]

[![Build Status][travis-image]][travis-url]
[![Code Climate][gpa-badge]][codeclimate-url]
[![Test Coverage][coverage-badge]][codeclimate-url]

Many applications and modules maintain a dictionary of options available to consumers. I've frequently found myself adding this functionality to my code. So, I figured, why not just package it up in an npm module and share it with the world. I'm sure someone out there may find it useful. That when I decided to publish **options-api**.

**options-api** allows you to easily set, get and optionally validate key/value pairs with a simply API, so that you can store/retreive your module's or application's configuration. It's a simple in-memory options store you can use standalone, mix into an existing object, or attach to an existing class.

I took inspiration from some awesome open-source projects like [KeystoneJS][keystone-url] and [Grappling Hook][grappling-url] so the api is friendly and intuitive.

If I haven't bored you and you're still interested please read on.

- [Installation](#installation)
- [Usage](#usage)
- [Static API](#static-api)
- [Static API Parameters](#static-api-params)
- [Core API](#core-api)
- [Core API Parameters](#core-api-params)
- [Examples](#examples)
- [Unit Testing](#unit-testing)
- [Attributions](#attributions)
- [License](#license)
- [Release Notes](https://github.com/AgentiaSystems/options-api/releases)

<a name="installation"></a>
## Installation
[![npm][npm-badge]][npm-url]

**options-api** is available on [npm][npm-url].

```js
npm install --save options-api
```

[Back to Top](#top)

<a name="usage"></a>
## Usage

**options-api** a number of static methods that will easily let in incorporate its functionality into your projects in a variety of circumstances.

1. Create a standalone instance

  ```js
  var optionsApi = require('options-api');
  var instance = optionsApi.create();

  instance.set('option', 'value');
  ```

2. Mix it into an existing object

  ```js
  var optionsApi = require('options-api');
  var obj = {};

  optionsApi.mixin(obj);
  obj.set('option', 'value');
  ```

3. Attach it to an existing class

  ```js
  var optionsApi = require('options-api');
  var Clazz = function() {
    this.something = 'something else';
  };
  Clazz.prototype.xxx = function() {};
  Clazz.prototype.yyy = function() {};
  Clazz.prototype.zzz = function() {};

  optionsApi.attach(Clazz);

  var instance = new Clazz();
  instance.set('option', 'value');
  ```

[Back to Top](#top)

<a name="static-api"></a>
## Static API
The static API methods provide you with a means to incorporate **options-api** into your app or module.

Method | Parameters | Description
------ | ---------- | -----------
.create() | `defauts`&nbsp;*(optional)*<br>`validators`&nbsp;*(optional)* | Syntax: `.create([<defaults>[,<validators>]])`<br>Creates a standalone instance of **options-api**
.mixin() | `instance`<br>`defauts`&nbsp;*(optional)*<br>`validators`&nbsp;*(optional)* | Syntax: `.mixin(<instance>[,<defaults>[,<validators>]])`<br>Adds **options-api** functionality to an existing object
.attach() | `class`<br>`defauts`&nbsp;*(optional)*<br>`validators`&nbsp;*(optional)* | Syntax: `.attach(<class>[,<defaults>[,<validators>]])`<br>Adds **option-api** functionality to the prototype of an existing class

[Back to Top](#top)

<a name="static-api-params"></a>
#### Static API Parameters

Parameter | Type | Description
--------- | ---- | -----------
defaults | `object` | Object hash of key/value pairs with default values for options, where the keys are the option names and values are the defaults.
validators | `object` | Object has of key/value pairs, where the keys as the option names and the values are the validators.<br><br>Validators can be either a function (which takes teh value to be validated as an argument and return a boolean indication if the validation was successful) or a regular expression.
instance | `object` | Object onto which you would like to add  **options-api** functionality
class | `constructor`<br>`object` | Class, the prototype of which you would like  add  **options-api** functionality

[Back to Top](#top)

<a name="core-api"></a>
## Core API

### Core Methods

Method | Parameters | Description
------ | ---------- | -----------
[.set()](#examples-set) | `option`<br>`value` | Syntax: `.set(<option>,<value>)`<br>Set an options value
[.get()](#examples-get) | `option` | Syntax: `.get(<option>)`<br>Retrieve an options value
[.unset()](#examples-unset) | `option` | Syntax: `.unset(<option>)`<br>Remove an existing option
[.config()](#examples-config) | `options` | Syntax: `.config(<options>)`<br>Set multiple options
[.enable()](#examples-enable) | `option` | Syntax: `.enable(<option>)`<br>Set an option's value to `true`
[.disable()](#examples-disable) | `option` | Syntax: `.disable(<option>)`<br>Set an options's value to `false`
[.defaults()](#examples-defaults) | `defaults`| Syntax: `.defaults(<defaults>)`<br>Sets default values for options
[.validators()](#examples-validators) | `validators` | Syntax: `.validators(<validators>)`<br>Specify option validators
[.reset()](#examples-reset) | n/a | Syntax: `.reset()`<br>Sets all options back to their configured defaults
[.list()](#examples-list) | n/a | Syntax: `.list()`<br>Gets an object with all current options


### Core Method Aliases

Method | Parameters | Description
------ | ---------- | -----------
[.add()](#examples-add) | `option`<br>`value` | Syntax: `.add(<option>,<value>)`<br>Alias of `.set()`
[.remove()](#examples-remove) | `option` | Syntax: `.remove(<option>)`<br>Alias of `.unset()`

#### Instance methods are chainable
With the obvious exception of the `.get()` (which returns the requested option value) all instance methods are chainable.

For example, you can:

```js
var instance = optionsApi.create();
instance
  .defaults({ option1: 'default value' })
  .validators({ option1: /^default/ })
  .enable('option2');
```

[Back to Top](#top)

<a name="core-api-params"></a>
#### Core API Parameters

Parameter | Type | Description
--------- | ---- | -----------
option | `string` | Option name
options | `object` | Object hash of key/value pairs representing multiple options to set
value | `any` | Value to which to set the option
defaults | `object` | See `defaults` above (under [Static API Parameters](#static-api-params))
validators | `object` | See `validators` above (under [Static API Parameters](#static-api-params))

<a name="examples"></a>
## Examples
Check out the sample code for each of the core API methods.

<a name="examples-set"></a><a name="examples-get"></a>
#### .set()/.get()
```js
var optionsApi = require('options-api');
var instance = optionsApi.create();

instance.set('option1', 'value1');

console.log('option1:', instance.get('option1'));
console.log('option2:', instance.get('option2'));
```

Output:

```
option1: value1
option2: undefined
```

[Back to Core API](#core-api)

<a name="examples-add"></a>
### .add()
Alias of [.set()](#examples-set)

<a name="examples-unset"></a>
#### .unset()
```js
var optionsApi = require('options-api');
var instance = optionsApi.create();

instance.set('option1', 'value1');
instance.unset('option1');

console.log('option1:', instance.get('option1'));
```

Output:

```
option1: undefined
```

[Back to Core API](#core-api)

<a name="examples-remove"></a>
### .remove()
Alias of [.unset()](#examples-unset)

[Back to Core API](#core-api)

<a name="examples-config"></a>
#### .config()
```js
var optionsApi = require('options-api');
var instance = optionsApi.create();

instance.config({
  option1: 'value1',
  option2: 'value2'
});

console.log('option1:', instance.get('option1'));
console.log('option2:', instance.get('option2'));
```

Output:

```
option1: value1
opiion2: value2
```

[Back to Core API](#core-api)

<a name="examples-enable"></a><a name="examples-disable"></a>
#### .enable()/.disable()
```js
var optionsApi = require('options-api');
var instance = optionsApi.create();

instance.enable('option1');
instance.disable('option2');

console.log('option1:', instance.get('option1'));
console.log('option2:', instance.get('option2'));
```

Output:

```
option1: true
option2: false
```

[Back to Core API](#core-api)

<a name="examples-defaults"></a>
#### .defaults()
```js
var optionsApi = require('options-api');
var instance = optionsApi.create();

instance.defaults({
  option1: 'value1',
  option2: 'value2'
});

console.log('option1:', instance.get('option1'));
console.log('option2:', instance.get('option2'));
```

Output:

```
option1: value1
opiion2: value2
```

[Back to Core API](#core-api)

<a name="examples-validators"></a>
#### .validators()
```js
var optionsApi = require('options-api');
var instance = optionsApi.create();

instance.validators({
  option1: function(value) {
    return typeof value === 'number' && value > 0;
  },
  option2: /\.*js$/
});

instance.set('option1', 1);
instance.set('option2', 'file.js');

console.log('option1:', instance.get('option1'));
console.log('option2:', instance.get('option2'));

instance.set('option1', 0);
```

Output:

```
option1: 1
opiion2: file.js

InvalidOption: "0" is not a valid value for the "option1" option
    at Object.set ...
```

[Back to Core API](#core-api)

<a name="examples-reset"></a>
#### .reset()
```js
var optionsApi = require('options-api');
var instance = optionsApi.create();

instance.defaults({
  option1: 'default value1',
  option2: 'default value2'
});

instance.set('option1', 'another value1');
instance.set('option2', 'another value2');

instance.reset();

console.log('option1:', instance.get('option1'));
console.log('option2:', instance.get('option2'));
```

Output:

```
option1: value1
opiion2: value2
```

[Back to Core API](#core-api)

<a name="examples-list"></a>
#### .list()
```js
var optionsApi = require('options-api');
var instance = optionsApi.create();

instance.defaults({
  option1: 'default value1',
  option2: 'default value2'
});

console.log(instance.list());
```

Output:

```
{ option1: 'default value1', option2: 'default value2' }
```
[Back to Core API](#core-api)

<a name="unit-testing"></a>
## Unit Testing
To test **options-api** simply clone the repo and run `npm test`.

```
git clone https://github.com/AgentiaSystems/options-api.git
cd options-api
npm test
```

You can also run lint test and check the test coverage.

```
npm run lint
npm run cover  // <-- report will be store in the `.coverage` folder
```

[Back to Top](#top)

<a name="attributions"></a>
## Attributions
This work was partly inspired by [KeystoneJS][keystone-url] (thank you [@JedWatson][jedwatson-url] et al) and [Grappling Hook][grappling-url] (thank you [@crynders][crynders-url]).

[Back to Top](#top)

<a name="license"></a>
## License
**options-api** is free and open source under the MIT License.

Copyright (c) 2015 [Johnny Estilles](https://github.com/JohnnyEstilles), [http://www.agentia.asia][agentia-url]


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[Back to Top](#top)

[logo-url]: media/logo.png
[agentia-url]: http://www.agentia.asia
[express-url]: http://expressjs.com

[keystone-url]: http://www.keystonejs.com
[jedwatson-url]: https://github.com/JedWatson

[grappling-url]: https://github.com/keystonejs/grappling-hook
[crynders-url]: https://github.com/creynders

[npm-badge]: https://badge.fury.io/js/options-api.svg
[npm-url]: https://npmjs.org/package/options-api

[travis-image]: https://travis-ci.org/AgentiaSystems/options-api.svg?branch=master
[travis-url]: https://travis-ci.org/AgentiaSystems/options-api

[codeclimate-url]: https://codeclimate.com/github/AgentiaSystems/options-api
[gpa-badge]: https://codeclimate.com/github/AgentiaSystems/options-api/badges/gpa.svg
[coverage-badge]: https://codeclimate.com/github/AgentiaSystems/options-api/badges/coverage.svg
