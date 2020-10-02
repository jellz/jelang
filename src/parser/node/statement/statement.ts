import { globalSymbolTable } from '../../..';
import { Block } from '../block';
import { ChildNode, NodeType, SymbolTable } from '../node';

export enum StatementType {
	VariableDeclaration = 'variableDeclaration',
	FunctionCall = 'functionCall',
	FunctionDeclaration = 'functionDeclaration',
	Return = 'return',
}

export abstract class Statement extends ChildNode<Block | undefined> {
	constructor(public statementType: StatementType) {
		super(NodeType.Statement);
	}

	// todo: function to get object by id upwards
	get parentSymbolTable(): SymbolTable {
		if (this.parent) return this.parent.symbolTable;
		else return globalSymbolTable;
	}
}
