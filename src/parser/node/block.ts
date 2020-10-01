import { Pass } from '../../passes/pass';
import { Node, NodeType } from './node';
import { Statement } from './statement/statement';

export class Block extends Node {
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
