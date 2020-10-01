import { Pass } from '../../passes/pass';

export enum NodeType {
	Value = 'value',
	Function = 'function',
	FunctionDeclaration = 'functionDeclaration',
	Prototype = 'prototype',
	Block = 'block',
	Type = 'type',
	Statement = 'statement',
	Argument = 'argument',
}

export abstract class Node<T = undefined> {
	constructor(
		public readonly nodeType: NodeType,
		public parent?: T
	) {}

	abstract accept(pass: Pass): void;

	getChildren(): Node[] {
		return [];
	}
}

export abstract class ChildNode<T extends Node> extends Node<T> {}
