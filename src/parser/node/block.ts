import { Pass } from '../../passes/pass';
import { Function } from './function';
import { ChildNode, NodeType } from './node';
import { Statement } from './statement/statement';

export class Block extends ChildNode<Function> {
	constructor(public readonly statements: Statement[]) {
		super(NodeType.Block);
	}

	accept(pass: Pass) {
		pass.visitBlock(this);
	}

	getChildren() {
		return this.statements;
	}
}
