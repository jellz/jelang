import { Pass } from '../../../passes/pass';
import { Value } from '../value/value';
import { Statement, StatementType } from './statement';

export class FunctionCall extends Statement {
	constructor(public readonly id: string, public readonly args: Value[]) {
		super(StatementType.FunctionCall);
	}

	accept(pass: Pass) {
		pass.visitFunctionCallStatement(this);
	}

	getChildren() {
		return this.args;
	}
}
