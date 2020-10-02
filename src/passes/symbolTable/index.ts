import { Function } from '../../parser/node/function';
import { NodeType } from '../../parser/node/node';
import { FunctionDeclaration } from '../../parser/node/statement/function/declaration';
import { FunctionCall } from '../../parser/node/statement/functionCall';
import { VariableDeclaration } from '../../parser/node/statement/variableDeclaration';
import { Pass } from '../pass';

export class SymbolTablePass extends Pass {
	visitVariableDeclarationStatement(statement: VariableDeclaration) {
		if (statement.parentSymbolTable.has(statement.id))
			throw Error(`Variable ${statement.id} cannot be re-declared`);
		statement.parentSymbolTable.set(statement.id, statement);
	}

	visitFunctionDeclarationStatement(statement: FunctionDeclaration) {
		if (statement.parentSymbolTable.has(statement.id))
			throw Error(`Function ${statement.id} cannot be re-declared`);
		statement.parentSymbolTable.set(statement.id, statement);
	}

	visitFunctionCallStatement(statement: FunctionCall) {
		const node = statement.parentSymbolTable.get(statement.id);
		if (!node) throw Error(`Calling unknown function: ${statement.id}`);
		if (node.nodeType !== NodeType.Function)
			throw Error(
				`Calling ${statement.id} as function, but it is ${node.nodeType}`
			);
		const func = <Function>node;
		for (let i = 0; i < func.declaration.args.length; i++) {
			console.log(func.declaration.args[i].type);
		}
	}
}
