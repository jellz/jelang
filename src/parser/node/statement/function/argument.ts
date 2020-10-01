import { Pass } from '../../../../passes/pass';
import { Node, NodeType } from '../../node';
import { Type } from '../../type';

export class Argument extends Node {
	constructor(public readonly id: string, public readonly type: Type) {
		super(NodeType.Argument);
	}

	accept(pass: Pass) {
		pass.visitArgument(this);
	}
}
