import { Block } from '../block';
import { ChildNode, NodeType } from '../node';

export enum StatementType {
	VariableDeclaration = 'variableDeclaration',
	FunctionCall = 'functionCall',
	FunctionDeclaration = 'functionDeclaration',
	Return = 'return',
}

export abstract class Statement extends ChildNode<Block> {
	constructor(public statementType: StatementType) {
		super(NodeType.Statement);
	}
}
