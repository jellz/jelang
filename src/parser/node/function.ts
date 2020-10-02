import { Pass } from '../../passes/pass';
import { Block } from './block';
import { Prototype } from './statement/function/prototype';
import { Statement, StatementType } from './statement/statement';

export class Function extends Statement {
	public id: string;

	constructor(public prototype: Prototype, public block: Block) {
		super(StatementType.Function);
		this.id = prototype.id;
	}

	accept(pass: Pass) {
		pass.visitFunction(this);
	}

	getChildren() {
		return [this.block, this.prototype];
	}
}
