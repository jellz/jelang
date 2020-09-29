import { Node, NodeType } from './node';

export enum TypeType {
	Integer = 'integer',
	String = 'string',
	Boolean = 'boolean',
}

export class Type extends Node {
	constructor(public readonly type: TypeType) {
		super(NodeType.Type);
	}
}
