import { Pass } from '../../passes/pass';
import { Block } from './block';
import { Node, NodeType } from './node';
import { FunctionDeclaration } from './statement/function/declaration';

export class Function extends Node {
	public id: string;

	constructor(
		public readonly declaration: FunctionDeclaration,
		public readonly block: Block
	) {
		super(NodeType.Function);
		this.id = declaration.id;
	}

	accept(pass: Pass) {
		pass.visitFunction(this);
	}
	
	getChildren() {
		return [this.block, this.declaration];
	}
}
