import { Node, NodeType } from '../node';
import { Type } from '../type';

export abstract class Value extends Node {
	constructor(public readonly type: Type) {
		super(NodeType.Value);
	}
}
