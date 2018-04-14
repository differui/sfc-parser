import { Rule, TokenType } from '@/types';
import * as re from '@/re';

const rules: Rule[] = [
  {
    re: re.TAG_NAME,
    token: TokenType.TAG_NAME,
  },
  {
    re: re.LT,
    token: TokenType.LT,
  },
  {
    re: re.GT,
    token: TokenType.GT,
  },
  {
    re: re.SLASH,
    token: TokenType.SLASH,
  },
  {
    re: re.S,
    token: TokenType.S,
  },
  {
    re: re.ALPHABETS,
    token: TokenType.ALPHABETS,
  },
  {
    re: re.DIGITS,
    token: TokenType.DIGITS,
  },
  {
    re: re.QUOTE,
    token: TokenType.QUOTE,
  },
  {
    re: re.EQ,
    token: TokenType.EQ,
  },
  {
    re: re.TEXT,
    token: TokenType.TEXT,
  },
];

export default rules;