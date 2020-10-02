import { Return } from '../../parser/node/statement/return';
import { VariableDeclaration } from '../../parser/node/statement/variableDeclaration';
import { Pass } from '../pass';

export class TypeCheckPass extends Pass {
	visitVariableDeclarationStatement(statement: VariableDeclaration) {
		if (statement.type.kind !== statement.value.type.kind)
			throw Error(
				`Variable declaration type mismatch: ${statement.id} should be type ${statement.type.kind} but is instead type ${statement.value.type.kind}`
			);
	}

	visitReturnStatement(statement: Return) {
		if (!statement.parent || !statement.parent.parent)
			throw Error('Illegal return statement');
		const returnType = statement.parent.parent.prototype.returnType.kind;
		const valueType = statement.value.type.kind;
		const functionId = statement.parent.parent.id;
		if (statement.value.type !== statement.parent.parent.prototype.returnType)
			throw Error(
				`Return type mismatch: function ${functionId} should return type ${returnType} but instead returns type ${valueType}`
			);
	}
}
