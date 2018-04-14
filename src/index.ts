import { Token, CompilerOptions, RootNode } from '@/types';
import { tokenize, setInput, getToken } from '@/tokenizer';
import { parse } from '@/parser';

function compile(source: string, opts: CompilerOptions = {}): Token[]|RootNode {
  const tokens: Token[] = [];
  let token: Token;

  if (opts.scan) {
    return tokenize(source);
  }
  if (opts.ast) {
    return parse(source);
  }
  return null;
}

export {
  tokenize,
  parse,
  compile,
}