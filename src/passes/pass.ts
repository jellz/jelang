import { Block } from '../parser/node/block';
import { Function } from '../parser/node/function';
import { Node } from '../parser/node/node';
import { Argument } from '../parser/node/statement/function/argument';
import { FunctionDeclaration } from '../parser/node/statement/function/declaration';
import { FunctionCall } from '../parser/node/statement/functionCall';
import { Return } from '../parser/node/statement/return';
import { Statement } from '../parser/node/statement/statement';
import { VariableDeclaration } from '../parser/node/statement/variableDeclaration';
import { Type } from '../parser/node/type';
import { Boolean } from '../parser/node/value/boolean';
import { Integer } from '../parser/node/value/integer';
import { String } from '../parser/node/value/string';

export abstract class Pass {
	visitInteger(_node: Integer): void {}
	visitString(_node: String) {}
	visitBoolean(_node: Boolean) {}
	visitType(_node: Type) {}
	visitArgument(_node: Argument) {}
	visitBlock(_node: Block) {}
	visitFunction(_node: Function) {}
	visitStatement(_node: Statement) {}
	visitFunctionDeclarationStatement(_node: FunctionDeclaration) {}
	visitVariableDeclarationStatement(_node: VariableDeclaration) {}
	visitFunctionCallStatement(_node: FunctionCall) {}
	visitReturnStatement(_node: Return) {}
	visitTopLevel(_node: Node) {}
	visit(node: Node) {
		node.accept(this);
	}
}
