import Lexer from 'lex';
import { Token, TokenType } from '@/types';
import rules from '@/rules';

let index = 0;
const tokens: Token[] = [];

const lexer = new Lexer(char => {
  throw new Error(`Unexpected character: ${char}`);
});

rules.forEach(rule => {
  lexer.addRule(rule.re, (r => {
    return (yytext: string) => {
      tokens.push({
        type: r.token,
        value: yytext
      });
    };
  })(rule));
});

export function tokenize(source: string) {
  setInput(source);
  return tokens;
}

export function setInput(source: string): void {
  index = 0;
  lexer.input = source;
  lexer.lex();
}

export function getToken(): Token {
  if (index < tokens.length) {
    return tokens[index++];
  }
  return null;
}

export function peekToken(step: number = 0): Token {
  const targetIndex = index + step - 1;

  if ((targetIndex < tokens.length) && (targetIndex >= 0)) {
    return tokens[targetIndex];
  }
  return null;
}

export function peekNoWhiteSpaceToken(step: number = 1): Token {
  let nextToken = peekToken(step);

  while (nextToken && nextToken.type === TokenType.S) {
    nextToken = peekToken(++step);
  }
  return nextToken;
}