# to-caption

Converts camelCase, PascalCase and delimited strings to captions, for labelling a form field, table column or menu item from the name behind it

> Delimiters are dot, underscore, and dash: \[ . _ - \]

## Examples
foo.bar / foo_bar / fooBar / foo-bar
> Foo Bar

\_hello_world\_
> Hello World

thisIsATest
> This Is A Test

## Usage

```bash
npm install --save to-caption
```

### ES module

```javascript
import toCaption from 'to-caption'

toCaption('helloWorld') // 'Hello World'
```

### CommonJS

```javascript
const toCaption = require('to-caption')

toCaption('helloWorld') // 'Hello World'
```

TypeScript declarations are included for both.

### Browser
A webpacked UMD build is included at `dist/toCaption.js`. The function is exported as `window.toCaption(...)`

```html
<html>
<head>
  <script src="https://unpkg.com/to-caption/dist/toCaption.js"></script>
  <script>
    console.log(toCaption('helloWorld'))
  </script>
</head>
</html>
```

## Rules
* Delimiters are period, dash, and underscore, unless you pass your own
* Leading, trailing and repeated delimiters are ignored
* Each delimiter becomes a single space, and the character after it is uppercased
* The first character is uppercased
* Uppercase letters are prefixed with spaces. This covers every alphabet, so `fooÉtat` becomes Foo État
* Any other character, such as a slash, a space or a digit, is kept as it is
* `null`, `undefined` and anything else that is not a string give an empty string

## More samples
This table should give you an idea of the process.

ID | Label | Comment
-|-|-
this.is.a.test | This Is A Test
foo | Foo
Foo | Foo
foobar | Foobar
fooBar | Foo Bar
FooBar | Foo Bar
foo_bar | Foo Bar
foo.bar | Foo Bar
foo-bar | Foo Bar
foo/bar | Foo/bar | Slash is not a delimiter
foo/bar | Foo Bar | delimiters = '/'
\_foo | Foo
foo_ | Foo
\_foo\_ | Foo
\_foo_bar\_ | Foo Bar
\_\_foo | Foo
foo\_\_ | Foo
\-\-foo--bar\-\- | Foo Bar
address2 | Address2 | Digits stay attached
address2 | Address 2 | numbers = 'split'
parseHTTPResponse | Parse H T T P Response | Every capital starts a word
parseHTTPResponse | Parse HTTP Response | acronyms = 'keep'
FOOBAR | F O O B A R | See the `onAllUppercase` option to avoid this behavior
FOOBAR | FOOBAR | onAllUppercase = 'keep'
FOOBAR | Foobar | onAllUppercase = 'titlecase'
FOO_BAR | Foo Bar | onAllUppercase = 'titlecase'
FOO_BAR | FOO BAR | acronyms = 'keep'

## Options

The second argument is optional, and may be `undefined` or `null`. Options combine freely

```javascript
toCaption('parseHTTP2Response', { acronyms: 'keep', numbers: 'split' }) // 'Parse HTTP 2 Response'
```

Option | Values | Default
-|-|-
`onAllUppercase` | `'keep'`, `'titlecase'` | every capital becomes its own word
`acronyms` | `'keep'` | every capital becomes its own word
`numbers` | `'split'` | digits stay attached to the letters beside them
`delimiters` | any string | `'._-'`

Any value not listed, including `undefined` and `null`, gives the default

### onAllUppercase

```javascript
toCaption('HELLO', { onAllUppercase: 'keep' }) // 'HELLO'
```

Sets the behavior when the string is all uppercase: it has at least one letter, and no lowercase letters. A string with no letters at all, such as `123_456`, is not all uppercase and is captioned as usual

#### 'keep'
The string is returned exactly as given, delimiters included (`_HELLO_WORLD_` stays `_HELLO_WORLD_`). To keep the capitals and still replace the delimiters, use `acronyms: 'keep'` instead

#### 'titlecase'
Each delimited word becomes titlecase (HELLO_WORLD becomes Hello World)

#### 'default', undefined, null, or anything else
The string has spaces between each letter, as if each letter was a word (H E L L O)

### acronyms

```javascript
toCaption('parseHTTPResponse', { acronyms: 'keep' }) // 'Parse HTTP Response'
```

#### 'keep'
A run of capitals stays together. The last capital of a run starts the next word when a lowercase letter follows it, so `XMLHttpRequest` becomes XML Http Request and `thisIsATest` is still This Is A Test. An all uppercase string keeps its words whole (HELLO_WORLD becomes HELLO WORLD), unless `onAllUppercase` says otherwise

#### 'split', undefined, null, or anything else
Every capital starts a word (Parse H T T P Response)

### numbers

```javascript
toCaption('version10Beta3', { numbers: 'split' }) // 'Version 10 Beta 3'
```

#### 'split'
A space goes between digits and letters, and the word after a number is capitalized (`item2name` becomes Item 2 Name). A run of digits stays together

#### 'keep', undefined, null, or anything else
Digits stay attached to the letters beside them (Version10 Beta3)

### delimiters

```javascript
toCaption('foo bar/baz', { delimiters: ' /' }) // 'Foo Bar Baz'
```

A string of the characters that separate words. It replaces the default `'._-'` and does not add to it, so include those three if you still want them. An empty string means nothing is a delimiter

## Compatibility
* Node 12.17 or later, as an ES module or through `require`. Tested on Node 20, 24 and 25
* The browser build uses Unicode property escapes in regular expressions: Chrome 64, Firefox 78, Safari 11.1 or later

## Development

```bash
npm run build        # webpack the UMD build into dist/
npm run copyright    # set the copyright year range in LICENSE and every source header
npm run lint         # eslint, including the no-semicolon and single-quote rules
npm test             # mocha, against both the ES module and the CommonJS build
npm run check:types  # verify the published types resolve for every consumer
npm run check:homepage  # confirm the homepage in package.json answers
```

`npm publish` runs all of these first, through `prepublishOnly`

The copyright holder and start year are set once, in `config.copyright` in `package.json`. The end year is always the current year, and `npm run lint` fails on any header that is out of date

The files in `test2/` are manual checks: `node test2/node_import.js`, `node test2/node_require.cjs`, and `test2/test.html` in a browser

## License
MIT. Check the LICENSE file for all the details.
