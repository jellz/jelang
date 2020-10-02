import { TokenType } from '../lexer/tokens';
import { Argument } from './node/statement/function/argument';
import { Prototype } from './node/statement/function/prototype';
import { Node } from './node/node';
import { FunctionCall } from './node/statement/functionCall';
import { Statement } from './node/statement/statement';
import { VariableDeclaration } from './node/statement/variableDeclaration';
import { Type, TypeKind } from './node/type';
import { Boolean } from './node/value/boolean';
import { Integer } from './node/value/integer';
import { String } from './node/value/string';
import { Value } from './node/value/value';
import { TokenStream } from './tokenStream';
import { Block } from './node/block';
import { Function } from './node/function';
import { Return } from './node/statement/return';

export class Parser {
	constructor(private stream: TokenStream) {}

	parseTopLevel(): Node {
		switch (this.stream.peek().type) {
			case TokenType.KeywordFunction:
				return this.parseFunction(undefined);
			default:
				throw Error(
					`Top-level token type ${this.stream.peek().type} not supported`
				);
		}
	}

	parseFunction(parent?: Block) {
		this.stream.peek().expectType(TokenType.KeywordFunction);
		const func = new Function(
			new Prototype('', [], new Type(TypeKind.Boolean)),
			new Block([])
		);
		func.prototype = this.parsePrototype(func);
		func.block = this.parseBlock(func);
		func.parent = parent;
		return func;
	}

	parsePrototype(parent?: Function) {
		// fn int abc(str a, int b)
		//    type id (...params)
		this.stream.consume().expectType(TokenType.KeywordFunction);
		const returnType = this.parseType();
		const id = this.stream.consume().expectType(TokenType.Identifier).raw;
		this.stream.consume().expectType(TokenType.SymbolOpenParen);
		const declaration = new Prototype(id, [], returnType);
		while (this.stream.peek().type !== TokenType.SymbolCloseParen) {
			declaration.args.push(this.parseArgument(declaration));
			if (this.stream.peek().type !== TokenType.SymbolCloseParen)
				this.stream.consume().expectType(TokenType.SymbolComma);
		}
		this.stream.consume().expectType(TokenType.SymbolCloseParen);
		declaration.parent = parent;
		return declaration;
	}

	parseBlock(parent: Function) {
		this.stream.consume().expectType(TokenType.SymbolOpenBrace);
		const statements: Statement[] = [];
		const block = new Block(statements);
		while (this.stream.peek().type !== TokenType.SymbolCloseBrace) {
			block.statements.push(this.parseStatement(block));
		}
		this.stream.consume().expectType(TokenType.SymbolCloseBrace);
		block.parent = parent;
		return block;
	}

	parseArgument(parent: Prototype) {
		const type = this.parseType();
		const id = this.stream.consume().expectType(TokenType.Identifier).raw;
		const arg = new Argument(id, type);
		arg.parent = parent;
		return arg;
	}

	parseType(consume: boolean = true) {
		const token = consume ? this.stream.consume() : this.stream.peek();
		switch (token.type) {
			case TokenType.KeywordTypeBoolean:
				return new Type(TypeKind.Boolean);
			case TokenType.KeywordTypeInteger:
				return new Type(TypeKind.Integer);
			case TokenType.KeywordTypeString:
				return new Type(TypeKind.String);
			default:
				throw Error(
					`Expected type but received ${token.type} (index ${token.start})`
				);
		}
	}

	parseStatement(parent?: Block) {
		const token = this.stream.peek();
		let res: VariableDeclaration | Function | FunctionCall | Return;
		switch (token.type) {
			case TokenType.KeywordTypeBoolean:
			case TokenType.KeywordTypeInteger:
			case TokenType.KeywordTypeString:
				res = this.parseVariableDeclarationStatement(parent);
				this.stream.consume().expectType(TokenType.SymbolSemiColon);
				return res;
			case TokenType.KeywordFunction:
				res = this.parseFunction(parent);
				this.stream.consume().expectType(TokenType.SymbolSemiColon);
				return res;
			case TokenType.KeywordReturn:
				res = this.parseReturnStatement(parent);
				this.stream.consume().expectType(TokenType.SymbolSemiColon);
				return res;
			case TokenType.Identifier:
				if (this.stream.peekNext().type === TokenType.SymbolOpenParen) {
					res = this.parseFunctionCallStatement(parent);
					this.stream.consume().expectType(TokenType.SymbolSemiColon);
					return res;
				}
				throw Error(`Unexpected identifier usage: ${token.raw}`);
			default:
				throw Error(`Unknown statement type: ${token.type}`);
		}
	}

	parseVariableDeclarationStatement(parent?: Block) {
		const type = this.parseType();
		const id = this.stream.consume().expectType(TokenType.Identifier).raw;
		this.stream.consume().expectType(TokenType.SymbolEqual);
		const value = this.parseValue();
		const declaration = new VariableDeclaration(id, type, value);
		declaration.parent = parent;
		return declaration;
	}

	parseFunctionCallStatement(parent?: Block) {
		const id = this.stream.consume().expectType(TokenType.Identifier);
		this.stream.consume().expectType(TokenType.SymbolOpenParen);
		const args: Value[] = [];
		const functionCall = new FunctionCall(id.raw, args);
		while (this.stream.peek().type !== TokenType.SymbolCloseParen) {
			functionCall.args.push(this.parseValue());
			if (this.stream.peek().type !== TokenType.SymbolCloseParen)
				this.stream.consume().expectType(TokenType.SymbolComma);
		}
		this.stream.consume().expectType(TokenType.SymbolCloseParen);
		functionCall.parent = parent;
		return functionCall;
	}

	parseValue() {
		const type = this.stream.peek().type;
		switch (type) {
			case TokenType.Integer:
				return this.parseInteger();
			case TokenType.String:
				return this.parseString();
			case TokenType.Boolean:
				return this.parseBoolean();
			// case TokenType.Identifier:
			// 	// variable reference
			// 	break;
			default:
				throw Error(`Unknown value type: ${type}`);
		}
	}

	parseInteger() {
		const i = this.stream.consume().expectType(TokenType.Integer);
		const res = parseInt(i.raw, 10);
		return new Integer(res);
	}

	parseString() {
		const str = this.stream.consume().expectType(TokenType.String);
		return new String(str.raw.slice(1, -1)); // remove the surrounding quotes
	}

	parseBoolean() {
		const bool = this.stream.consume().expectType(TokenType.Boolean).raw;
		return new Boolean(bool === 'TRUE' ? true : false);
	}

	parseReturnStatement(parent?: Block) {
		if (!parent) throw Error('Return statement has no parent');
		this.stream.consume().expectType(TokenType.KeywordReturn);
		const ret = new Return(this.parseValue());
		ret.parent = parent;
		return ret;
	}
}
