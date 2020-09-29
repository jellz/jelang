import { Node, NodeType } from './node';
import { Statement } from './statement/statement';

export class Block extends Node {
	constructor(public readonly statements: Statement[]) {
		super(NodeType.Block);
	}
}
