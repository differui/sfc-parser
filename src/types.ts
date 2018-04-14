export enum TokenType {
  TAG_NAME = 2,
  LT,
  GT,
  SLASH,
  S,
  ALPHABETS,
  DIGITS,
  QUOTE,
  EQ,
  TEXT,
}

export interface Token {
  type: TokenType;
  value: string;
}

export interface Rule {
  re: RegExp;
  token: TokenType;
}

export interface CompilerOptions {
  scan?: boolean;
  ast?: boolean;
}

export enum NodeType {
  SFC = 30,
  BLOCK,
}

export interface Attr {
  key: string;
  value: string;
}

export interface BlockNode {
  type: NodeType.BLOCK;
  name: string;
  attrs?: Attr[];
  content?: string;
}

export interface RootNode {
  type: NodeType.SFC;
  children: BlockNode[];
}