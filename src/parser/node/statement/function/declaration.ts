import { Type } from '../../type';
import { Statement, StatementType } from '../statement';
import { Argument } from './argument';

export class FunctionDeclaration extends Statement {
	constructor(
		public readonly id: string,
		public readonly args: Argument[],
		public readonly returnType: Type
	) {
		super(StatementType.FunctionDeclaration);
	}
}
