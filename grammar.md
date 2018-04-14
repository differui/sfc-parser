SFC Grammar
=====

**Attention**

This is non-official ebnf grammar of Vue single file component. Only keeps minimal descriptions for a tony sfc parser.For more information please visit vue sfc spec: https://vue-loader.vuejs.org/en/start/spec.html

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