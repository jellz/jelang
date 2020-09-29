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
}
