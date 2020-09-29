import { Type } from '../type';
import { Value } from '../value/value';
import { Statement, StatementType } from './statement';

export class VariableDeclaration extends Statement {
	constructor(
		public readonly id: string,
		public readonly type: Type,
		public readonly value: Value
	) {
		super(StatementType.VariableDeclaration);
	}
}
