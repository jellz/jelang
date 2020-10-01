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

export abstract class Node {
	abstract accept(pass: Pass): void;
	getChildren(): Node[] {
		return [];
	}
	constructor(public readonly nodeType: NodeType) {}
}
