# Changelog

## 1.3.0
* Add `acronyms: 'keep'`, which holds a run of capitals together (`parseHTTPResponse` becomes `Parse HTTP Response`)
* Add `numbers: 'split'`, which puts a space between digits and letters (`address2` becomes `Address 2`)
* Add `delimiters`, to replace the default `._-` with your own characters
* Fix: capitals outside A to Z now start a word (`fooÉtat` becomes `Foo État`)
* Fix: a string with no letters is no longer treated as all uppercase, so `onAllUppercase: 'keep'` no longer returns `123_456` or `___` untouched
* Fix: a first character outside the basic multilingual plane is no longer cut in half
* Clarify the readme: what counts as all uppercase, what `'keep'` returns, and a table of every option
* The repository moved to github.com/code-evolve/to-caption; the old address redirects
* The browser build needs Unicode property escapes (Chrome 64, Firefox 78, Safari 11.1)

## 1.2.0
* `require('to-caption')` returns the function, through a CommonJS build and an `exports` map
* TypeScript declarations resolve for both `import` and `require`, and export `ToCaptionOptions`
* `onAllUppercase: 'titlecase'` splits on dots as well as dashes and underscores (`HELLO.WORLD` becomes `Hello World`)
* `null` options are accepted
* Fix the readme: CommonJS and browser examples, and the delimiter rules
* Homepage is the product page at code-evolve.com
* The browser build targets ES2015 (browserslist `> 0.25%, not dead`), so Internet Explorer 11 is no longer supported
* Update all dev dependencies (webpack 5, mocha 12, chai 6, eslint 10)
* Add linting, type checks and a `prepublishOnly` guard
* Copyright year range is set automatically in LICENSE and every source header
* Publish only `src`, `dist` and this changelog

## 1.1.3
* Fix all-uppercase logic

## 1.1.2
* Add typescript bindings

## 1.1.1
* Update documentation

## 1.1.0
* Add option to special-case all-uppercase strings
* Upgrade all NPM dev modules
* Fix UMD exports
* Make main module the ES6 compatible one
* Change dist filename to `toCaption.js`
* Add additional test cases

## 1.0.4
* Return an empty string for null and undefined input values
* Add test cases
* Add changelog.md

## 1.0.3

## 1.0.2

## 1.0.1

## 1.0.0
