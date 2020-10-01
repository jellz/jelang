import { Pass } from '../../../../passes/pass';
import { ChildNode, NodeType } from '../../node';
import { Type } from '../../type';
import { FunctionDeclaration } from './declaration';

export class Argument extends ChildNode<FunctionDeclaration> {
	constructor(public readonly id: string, public readonly type: Type) {
		super(NodeType.Argument);
	}

	accept(pass: Pass) {
		pass.visitArgument(this);
	}
}
