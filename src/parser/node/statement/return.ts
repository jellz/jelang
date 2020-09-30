import { Value } from '../value/value';
import { Statement, StatementType } from './statement';

export class Return extends Statement {
	constructor(public readonly value: Value) {
		super(StatementType.Return);
	}
}
