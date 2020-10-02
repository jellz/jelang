import { Pass } from '../../passes/pass';

export enum NodeType {
	Value = 'value',
	Function = 'function',
	Prototype = 'prototype',
	Block = 'block',
	Type = 'type',
	Statement = 'statement',
	Argument = 'argument',
}

export type SymbolTable<T extends Node = Node> = Map<string, T>;

export abstract class Node {
	constructor(public readonly nodeType: NodeType) {}

	abstract accept(pass: Pass): void;

	getChildren(): Node[] {
		return [];
	}
}

export abstract class ChildNode<T> extends Node {
	parent?: T;

	constructor(public nodeType: NodeType) {
		super(nodeType);
	}
}
