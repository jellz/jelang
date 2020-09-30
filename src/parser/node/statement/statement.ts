import { Node, NodeType } from '../node';

export enum StatementType {
	VariableDeclaration = 'variableDeclaration',
	FunctionCall = 'functionCall',
	FunctionDeclaration = 'functionDeclaration',
	Return = 'return',
}

export abstract class Statement extends Node {
	constructor(public statementType: StatementType) {
		super(NodeType.Statement);
	}
}
