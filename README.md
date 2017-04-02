# extend-error

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Extending errors in JavaScript was hard. Until now.

## Background

This repo started as a fork of [extend-error](https://github.com/jayyvis/extend-error) but, as JavaScript has progressed, there are better options. Now, this is just a README containg recomendations.

## Install

This should work in any adequately recent version of Node without dependencies, but for complete browser support, you'll need

```bash
npm install --save-dev babel-core babel-plugin-transform-builtin-extend
```

## Usage

Creating your own exceptions is as simple as

```js
class Exception extends Error {
  constructor(...args) {
    super(...args);
    // This line *should* only be necessary for browsers; recent versions of
    // node should be ok without it. If this line is not included, all
    // Exceptions will be prefixed with "Error" when they're stringified, which
    // largely defeats the purpose of extending Error to begin with.
    this.name = this.constructor.name;
  }
}
```

### Browsers

For use in all browsers, you'll need to compile with babel with at least the following config

```
{
  "plugins": [
    ["babel-plugin-transform-builtin-extend", {
      "globals": ["Error"]
    }]
  ],
  sourceMaps: true
}
```

### Getting Fancy

Let's say we want to create an `Exception` for http errors. Rather than passing
a string to the constructor, we want to pass an HttpResponse object. Errors are
a little weird about when and how you can set their message property and
overriding `toString()`, isn't quite as helpful as you want it to be. Instead,
try this:

```js
class Exception extends Error {
  constructor(...args) {
    super(...args);
    // This line *should* only be necessary for browsers; recent versions of
    // node should be ok without it. If this line is not included, all
    // Exceptions will be prefixed with "Error" when they're stringified, which
    // largely defeats the purpose of extending Error to begin with.
    this.name = this.constructor.name;

    // Make it easy for derived Exceptions to change the error string.
    if (this.parse) {
      this.message = this.parse(...args);
    }
  }
}

class HttpError extends Exception {
  parse(res) {
    if (typeof res.body === `string`) {
      return res.body;
    }

    if (typeof res.body === `object`) {
      return JSON.stringify(res.body, null, 2);
    }

    return `An undetermined http error occurred with status code ${res.statusCode}`;
  }
}

```

## Caveats

Depending on browser and/or node version, stack traces may include the Exception constructor.

## Maintainer

[@ianwremmel](https://github.com/ianwremmel/)

## Contribute

This is intended as a guideline rather than a complete instruction set. If you find mistakes or better methods around making it possible to extend errors, PRs are very welcome. However, I'm going to be very particular about PRs that enhance the `Exception` class itself.

## License

[MIT © Ian W. Remmel](https://github.com/ianwremmel/tooling.js/blob/master/LICENSE)

> This repo is a fork of https://github.com/jayyvis/extend-error, so it's got the history of that project in it, but zero code sharing at this point. I have no idea how licensing applies here.
