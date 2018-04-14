# sfc-parser
> a tony vue sfc parser implementation

## Install

```bash
npm i sfc-parser
```

## Usage

```javascript
import { tokenize, parse, compile } from 'sfc-parser';

const source = `
<template>
  <div class="app">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'hello'
    }
  }
}
</script>

<style>
.app h1 {
  color: red
}
</style>
`;
const tokens = tokenize(source);
const ast = parse(source);

compile(source, {
  scan: false, // true => same as tokenize(source)
  parse: false, // true => same as parse(source)
});
```

## Grammar

This is non-official ebnf grammar of Vue single file component. Only keeps minimal descriptions for the tony sfc parser.For more information please visit vue sfc spec: https://vue-loader.vuejs.org/en/start/spec.html

```ebnf
# metacharacters
*: 0 or more
+: 1 or more
?: 0 or 1
|: separates alternatives
[]: grouping

# regular expression
TAG_NAME: /(script|template|style)/
LT: /</
GT: />/
SLASH: /\//
S: /\s+/
ALPHABETS: /\w/
DIGITS: /\d/
QUOTE: /"/
EQ: /=/
TEXT: /[^<>\/\s\w\d"=]*/

# rules
sfc
  : S* [ block? S* ]*
  ;
block
  : open S* content S* close
  ;
open
  : LT TAG_NAME S* [ attr? S* ]* GT
  ;
close
  : LT SLASH TAG_NAME S* GT
  ;
content
  : [ TEXT | LT | GT | SLASH | S | ALPHABETS | DIGITS | QUOTE | EQ | TAG_NAME ]*
  ;
attr
  : [ ALPHABETS | DIGITS ]+ S* [ EQ S* QUOTE ALPHABETS QUOTE ]?
  ;
```

## License

MIT &copy; [BinRui Guan](mailto:differui@gmail.com)
