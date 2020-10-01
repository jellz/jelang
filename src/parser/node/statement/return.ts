import { Pass } from '../../../passes/pass';
import { Value } from '../value/value';
import { Statement, StatementType } from './statement';

export class Return extends Statement {
	constructor(public readonly value: Value) {
		super(StatementType.Return);
	}

	accept(pass: Pass) {
		pass.visitReturnStatement(this);
	}

	getChildren() {
		return [this.value];
	}
}
