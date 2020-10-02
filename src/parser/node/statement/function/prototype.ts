import { Pass } from '../../../../passes/pass';
import { Function } from '../../function';
import { ChildNode, NodeType } from '../../node';
import { Type } from '../../type';
import { Argument } from './argument';

export class Prototype extends ChildNode<Function> {
	constructor(
		public readonly id: string,
		public readonly args: Argument[],
		public readonly returnType: Type
	) {
		super(NodeType.Prototype);
	}

	accept(pass: Pass) {
		pass.visitPrototype(this);
	}

	getChildren() {
		return [...this.args, this.returnType];
	}
}
