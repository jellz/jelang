import { Function } from '../../../parser/node/function';
import { Prototype } from '../../../parser/node/statement/function/prototype';
import { Block } from '../../../parser/node/block';
import { FunctionCall } from '../../../parser/node/statement/functionCall';
import { Return } from '../../../parser/node/statement/return';
import {
	Statement,
	StatementType,
} from '../../../parser/node/statement/statement';
import { VariableDeclaration } from '../../../parser/node/statement/variableDeclaration';
import { Type } from '../../../parser/node/type';
// import { Boolean } from '../../../parser/node/value/boolean';
// import { Integer } from '../../../parser/node/value/integer';
// import { String } from '../../../parser/node/value/string';
import { Pass } from '../../pass';
import { TypeScriptNode } from './node';

export class TypeScriptCodeGenPass extends Pass {
	private valueStack: string[] = [];

	visitType(node: Type) {
		this.valueStack.push(TypeScriptNode.type(node));
	}

	visitPrototype(node: Prototype) {
		this.visitType(node.returnType);
		const returnType = this.valueStack.pop();
		if (!returnType)
			throw Error('Missing returnType in visitPrototype pass');
		this.valueStack.push(
			TypeScriptNode.functionPrototype(
				node.id,
				returnType,
				node.args
			)
		);
	}

	visitStatement(node: Statement) {
		switch (node.statementType) {
			case StatementType.VariableDeclaration:
				this.visitVariableDeclarationStatement(<VariableDeclaration>node);
				break;
			case StatementType.FunctionCall:
				this.visitFunctionCallStatement(<FunctionCall>node);
				break;
			case StatementType.Return:
				this.visitReturnStatement(<Return>node);
				break;
			case StatementType.Function:
				this.visitFunction(<Function>node);
				break;
			default:
				throw Error(`Unknown statement type: ${node.statementType}`);
		}
	}

	visitBlock(node: Block) {
		const statements: string[] = [];
		for (const statement of node.statements) {
			this.visitStatement(statement);
			const s = this.valueStack.pop();
			if (!s) throw Error('Missing statement in visitBlock');
			statements.push(s);
		}
		this.valueStack.push(TypeScriptNode.block(statements));
	}

	visitFunction(node: Function) {
		this.visitPrototype(node.prototype);
		const prototype = this.valueStack.pop();

		console.log(prototype);

		this.visitBlock(node.block);
		const block = this.valueStack.pop();

		console.log(block);

		if (!prototype || !block)
			throw Error('Missing prototype or block in visitFunction pass');

		this.valueStack.push(TypeScriptNode.function(prototype, block));
	}

	visitVariableDeclarationStatement(node: VariableDeclaration) {
		this.valueStack.push(
			TypeScriptNode.variableDeclarationStatement(
				node.id,
				node.type,
				node.value
			)
		);
	}

	visitFunctionCallStatement(node: FunctionCall) {
		this.valueStack.push(
			TypeScriptNode.functionCallStatement(node.id, node.args)
		);
	}

	visitReturnStatement(node: Return) {
		this.valueStack.push(TypeScriptNode.returnStatement(node.value));
	}
}
