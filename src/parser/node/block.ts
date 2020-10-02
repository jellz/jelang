import { Pass } from '../../passes/pass';
import { Function } from './function';
import { ChildNode, NodeType, SymbolTable } from './node';
import { Statement } from './statement/statement';

export class Block extends ChildNode<Function> {
	symbolTable: SymbolTable = new Map();

	constructor(public readonly statements: Statement[]) {
		super(NodeType.Block);
	}

	accept(pass: Pass) {
		pass.visitBlock(this);
	}

	getChildren() {
		return this.statements;
	}
}
