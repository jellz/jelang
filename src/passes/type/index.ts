import { VariableDeclaration } from '../../parser/node/statement/variableDeclaration';
import { Pass } from '../pass';

export class TypeCheckPass extends Pass {
	visitVariableDeclarationStatement(statement: VariableDeclaration) {
		if (statement.type.kind !== statement.value.type.kind)
			throw Error(
				`Variable declaration type mismatch: ${statement.id} should be type ${statement.type.kind} but is instead type ${statement.value.type.kind}`
			);
	}
}
