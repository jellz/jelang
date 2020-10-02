import { Argument } from '../../../parser/node/statement/function/argument';
import { Type, TypeKind } from '../../../parser/node/type';
import { Boolean } from '../../../parser/node/value/boolean';
import { Integer } from '../../../parser/node/value/integer';
import { String } from '../../../parser/node/value/string';
import { Value } from '../../../parser/node/value/value';
import { TypeScriptBuilder } from './builder';
import {
	TypeScriptKeyword,
	TypeScriptSymbol,
	TypeScriptType,
	typeScriptTypeMappings,
} from './constants';

export abstract class TypeScriptNode {
	static function(declaration: string, block: string): string {
		return new TypeScriptBuilder().add(declaration).add(block).toString();
	}

	static type(type: Type): string {
		return new TypeScriptBuilder()
			.add(typeScriptTypeMappings[type.kind])
			.toString();
	}

	static argument(argument: Argument): string {
		return new TypeScriptBuilder()
			.add(argument.id, false)
			.add(TypeScriptSymbol.Colon)
			.add(TypeScriptNode.type(argument.type))
			.toString();
	}

	static functionPrototype(
		id: string,
		returnType: TypeScriptType,
		args: Argument[]
	): string {
		const builder = new TypeScriptBuilder()
			.add(TypeScriptKeyword.Function)
			.add(id, false)
			.add(TypeScriptSymbol.ParenLeft, false);
		for (let i = 0; i < args.length; i++) {
			builder.add(TypeScriptNode.argument(args[i]), false);
			if (i < args.length - 1) builder.add(TypeScriptSymbol.Comma);
		}
		return builder
			.add(TypeScriptSymbol.ParenRight, false)
			.add(TypeScriptSymbol.Colon)
			.add(returnType)
			.toString();
		// function id(arg: type)
	}

	static variableDeclarationStatement(
		id: string,
		type: Type,
		value: Value
	): string {
		return new TypeScriptBuilder()
			.add(TypeScriptKeyword.Constant)
			.add(id, false)
			.add(TypeScriptSymbol.Colon)
			.add(TypeScriptNode.type(type))
			.add(TypeScriptSymbol.Equal)
			.add(TypeScriptNode.value(value), false)
			.add(TypeScriptSymbol.SemiColon)
			.toString();
	}

	static functionCallStatement(id: string, args: Value[]) {
		const builder = new TypeScriptBuilder()
			.add(id, false)
			.add(TypeScriptSymbol.ParenLeft, false);
		for (let i = 0; i < args.length; i++) {
			builder.add(TypeScriptNode.value(args[i]), false);
			if (i < args.length - 1) builder.add(TypeScriptSymbol.Comma);
		}
		return builder
			.add(TypeScriptSymbol.ParenRight, false)
			.add(TypeScriptSymbol.SemiColon)
			.toString();
	}

	static returnStatement(value: Value): string {
		return new TypeScriptBuilder()
			.add(TypeScriptKeyword.Return)
			.add(this.value(value), false)
			.add(TypeScriptSymbol.SemiColon)
			.toString();
	}

	static block(statements: string[]): string {
		const builder = new TypeScriptBuilder().add(TypeScriptSymbol.BraceLeft);
		for (const statement of statements) {
			builder.add(statement);
		}
		return builder.add(TypeScriptSymbol.BraceRight).toString();
	}

	static value(value: Value): string {
		switch (value.type.kind) {
			case TypeKind.Integer:
				return this.integer(<Integer>value);
			case TypeKind.String:
				return this.string(<String>value);
			case TypeKind.Boolean:
				return this.boolean(<Boolean>value);
			default:
				throw Error(`Unknown value type: ${value.type}`);
		}
	}

	static integer(node: Integer): string {
		// todo: check if number isn't integer then error here? maybe somewhere else would be better.
		return node.value.toString();
	}

	static string(node: String): string {
		return new TypeScriptBuilder()
			.add(TypeScriptSymbol.DoubleQuote, false)
			.add(node.value, false)
			.add(TypeScriptSymbol.DoubleQuote)
			.toString();
	}

	static boolean(node: Boolean): string {
		return new TypeScriptBuilder()
			.add(
				node.value
					? TypeScriptKeyword.BooleanTrue
					: TypeScriptKeyword.BooleanFalse
			)
			.toString();
	}
}
