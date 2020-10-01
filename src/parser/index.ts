import { TokenType } from '../lexer/tokens';
import { Argument } from './node/statement/function/argument';
import { FunctionDeclaration } from './node/statement/function/declaration';
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
				return this.parseFunction();
			default:
				throw Error(
					`Top-level token type ${this.stream.peek().type} not supported`
				);
		}
	}

	parseFunction() {
		this.stream.peek().expectType(TokenType.KeywordFunction);
		const declaration = this.parseFunctionDeclarationStatement();
		const block = this.parseBlock();
		return new Function(declaration, block);
	}

	parseFunctionDeclarationStatement() {
		// fn int abc(str a, int b)
		//    type id (...params)
		this.stream.consume().expectType(TokenType.KeywordFunction);
		const returnType = this.parseType();
		const id = this.stream.consume().expectType(TokenType.Identifier).raw;
		this.stream.consume().expectType(TokenType.SymbolOpenParen);
		const args: Argument[] = [];
		while (this.stream.peek().type !== TokenType.SymbolCloseParen) {
			args.push(this.parseArgument());
			if (this.stream.peek().type !== TokenType.SymbolCloseParen)
				this.stream.consume().expectType(TokenType.SymbolComma);
		}
		this.stream.consume().expectType(TokenType.SymbolCloseParen);
		return new FunctionDeclaration(id, args, returnType);
	}

	parseBlock() {
		this.stream.consume().expectType(TokenType.SymbolOpenBrace);
		const statements: Statement[] = [];
		while (this.stream.peek().type !== TokenType.SymbolCloseBrace) {
			statements.push(this.parseStatement());
		}
		this.stream.consume().expectType(TokenType.SymbolCloseBrace);
		return new Block(statements);
	}

	parseArgument() {
		const type = this.parseType();
		const id = this.stream.consume().expectType(TokenType.Identifier).raw;
		return new Argument(id, type);
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

	parseStatement() {
		const token = this.stream.peek();
		let res: VariableDeclaration | FunctionDeclaration | FunctionCall | Return;
		switch (token.type) {
			case TokenType.KeywordTypeBoolean:
			case TokenType.KeywordTypeInteger:
			case TokenType.KeywordTypeString:
				res = this.parseVariableDeclarationStatement();
				this.stream.consume().expectType(TokenType.SymbolSemiColon);
				return res;
			case TokenType.KeywordFunction:
				res = this.parseFunctionDeclarationStatement();
				this.stream.consume().expectType(TokenType.SymbolSemiColon);
				return res;
			case TokenType.KeywordReturn:
				res = this.parseReturnStatement();
				this.stream.consume().expectType(TokenType.SymbolSemiColon);
				return res;
			case TokenType.Identifier:
				if (this.stream.peekNext().type === TokenType.SymbolOpenParen) {
					res = this.parseFunctionCallStatement();
					this.stream.consume().expectType(TokenType.SymbolSemiColon);
					return res;
				}
				throw Error(`Unexpected identifier usage: ${token.raw}`);
			default:
				throw Error(`Unknown statement type: ${token.type}`);
		}
	}

	parseVariableDeclarationStatement() {
		const type = this.parseType();
		const id = this.stream.consume().expectType(TokenType.Identifier).raw;
		this.stream.consume().expectType(TokenType.SymbolEqual);
		const value = this.parseValue();
		return new VariableDeclaration(id, type, value);
	}

	parseFunctionCallStatement() {
		const id = this.stream.consume().expectType(TokenType.Identifier);
		this.stream.consume().expectType(TokenType.SymbolOpenParen);
		const args: Value[] = [];
		while (this.stream.peek().type !== TokenType.SymbolCloseParen) {
			args.push(this.parseValue());
			if (this.stream.peek().type !== TokenType.SymbolCloseParen)
				this.stream.consume().expectType(TokenType.SymbolComma);
		}
		this.stream.consume().expectType(TokenType.SymbolCloseParen);
		return new FunctionCall(id.raw, args);
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

	parseReturnStatement() {
		this.stream.consume().expectType(TokenType.KeywordReturn);
		return new Return(this.parseValue());
	}
}
