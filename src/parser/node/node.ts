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
	constructor(public readonly nodeType: NodeType) {}
}
