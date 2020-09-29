import { readFileSync } from 'fs';
import { Lexer } from './lexer';
import { TokenType } from './lexer/tokens';
import { Parser } from './parser';
import { Function } from './parser/node/function';
import { TokenStream } from './parser/tokenStream';

const input = readFileSync('./spec.jll').toString();

console.log('IN: \n', input);

const lexer = new Lexer(input);

const out = lexer.lex().filter(t => t.type !== TokenType.Whitespace);
// console.log('OUT: \n', out);

const stream = new TokenStream(out);
const parser = new Parser(stream);
const node = parser.parseTopLevel() as Function;

console.log(node);
console.log(node.block.statements.forEach(s => console.log(s)));
