import { Pass } from '../../passes/pass';
import { Node, NodeType } from './node';

export enum TypeKind {
	Integer = 'integer',
	String = 'string',
	Boolean = 'boolean',
}

export class Type extends Node {
	constructor(public readonly kind: TypeKind) {
		super(NodeType.Type);
	}

	accept(pass: Pass) {
		pass.visitType(this);
	}
}
