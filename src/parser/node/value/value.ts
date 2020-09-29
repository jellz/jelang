import { Node, NodeType } from '../node';

export enum ValueType {
	Integer = 'integer',
	String = 'string',
	Boolean = 'boolean',
}

export abstract class Value extends Node {
	constructor(public readonly type: ValueType) {
		super(NodeType.Value);
	}
}
