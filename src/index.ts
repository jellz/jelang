import { readFileSync } from 'fs';
import { Lexer } from './lexer';
import { TokenType } from './lexer/tokens';
import { Parser } from './parser';
import { Function } from './parser/node/function';
import { SymbolTable } from './parser/node/node';
import { TokenStream } from './parser/tokenStream';
import { TypeScriptCodeGenPass } from './passes/codegen/typeScript';
import { PassManager } from './passes/manager';
import { SymbolTablePass } from './passes/symbolTable';
import { TypeCheckPass } from './passes/type';

const input = readFileSync('./spec.jll').toString();

console.log('IN: \n', input);

const lexer = new Lexer(input);

const out = lexer.lex().filter(t => t.type !== TokenType.Whitespace);
// console.log('OUT: \n', out);

export const globalSymbolTable: SymbolTable = new Map();

const stream = new TokenStream(out);
const parser = new Parser(stream);
const node = parser.parseTopLevel();

console.log(node);
console.log((node as Function).block.statements.forEach(s => console.log(s)));

const passManager = new PassManager();
passManager.register(new SymbolTablePass());
passManager.register(new TypeCheckPass());
passManager.run([node]);

const codegenPass = new TypeScriptCodeGenPass();
codegenPass.visitTopLevel(node);
