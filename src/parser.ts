import { Token, BlockNode, RootNode, NodeType, TokenType, Attr } from '@/types';
import { setInput, getToken, peekToken, peekNoWhiteSpaceToken } from '@/tokenizer';

let token: Token;

export function parse(source: string): RootNode {
  setInput(source);
  token = getToken();
  return sfc();
}

export function sfc(): RootNode {
  const rootNode: RootNode = {
    type: NodeType.SFC,
    children: [],
  };

  eatWhiteSpace();
  while (test([TokenType.LT])) {
    rootNode.children.push(block());
    eatWhiteSpace();
  }
  return rootNode;
}

export function block(): BlockNode {
  const openBlockNode = open();

  eatWhiteSpace();
  openBlockNode.content = content();
  eatWhiteSpace();

  const closeBlockNode = close();

  if (closeBlockNode.name != openBlockNode.name) {
    throw new Error(`${openBlockNode.name} closed with ${closeBlockNode.name}`);
  }
  return openBlockNode;
}

export function open(): BlockNode {
  const blockNode: BlockNode = {
    type: NodeType.BLOCK,
    name: null,
    attrs: [],
    content: '',
  };

  match(TokenType.LT);
  blockNode.name = tagName();
  eatWhiteSpace();
  while (test([TokenType.ALPHABETS, TokenType.DIGITS, TokenType.EQ])) {
    blockNode.attrs.push(attr());
    eatWhiteSpace();
  }
  match(TokenType.GT);
  return blockNode;
}

export function close(): BlockNode {
  const blockNode: BlockNode = {
    type: NodeType.BLOCK,
    name: null,
  };

  match(TokenType.LT);
  match(TokenType.SLASH);
  blockNode.name = tagName();
  eatWhiteSpace();
  match(TokenType.GT);
  return blockNode;
}

export function content(): string {
  let rtn = '';

  while (test([TokenType.TEXT, TokenType.LT, TokenType.GT, TokenType.SLASH, TokenType.S, TokenType.ALPHABETS, TokenType.DIGITS, TokenType.QUOTE, TokenType.EQ, TokenType.TAG_NAME])) {

    // FIXME:
    // maybe a better way to figure out close and content
    if (
      test([TokenType.LT]) &&
      peekToken(1).type === TokenType.SLASH &&
      peekToken(2).type === TokenType.TAG_NAME &&
      peekNoWhiteSpaceToken(3).type === TokenType.GT
    ) {
      return rtn;
    }
    rtn += token.value;
    next();
  }
  return rtn;
}

export function tagName(): string {
  const value = token.value;

  match(TokenType.TAG_NAME);
  return value;
}

export function attr(): Attr {
  const attr = {
    key: '',
    value: null,
  };

  do {
    attr.key += token.value;
    next();
  } while (test([TokenType.ALPHABETS, TokenType.DIGITS]))
  eatWhiteSpace();
  if (test([TokenType.EQ])) {
    match(TokenType.EQ);
    eatWhiteSpace();
    match(TokenType.QUOTE);
    attr.value = token.value;
    match(TokenType.ALPHABETS);
    match(TokenType.QUOTE);
  }
  return attr;
}

export function test(expected: TokenType | TokenType[]): boolean {
  if (!token) {
    return false;
  }
  if (Array.isArray(expected)) {
    return expected.indexOf(token.type) > -1;
  } else {
    return token.type === expected;
  }
}

export function eatWhiteSpace() {
  while (token && test(TokenType.S)) {
    next();
  }
}

export function next(): void {
  token = getToken();
}

export function match(expected: TokenType): void {
  if (test(expected)) {
    next()
  } else {
    error(expected);
  }
}

export function error(expected: TokenType): never {
  throw new Error(`Expect token type: ${expected}, got: ${token ? token.type: null}`);
}