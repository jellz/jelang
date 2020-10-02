import { Block } from '../parser/node/block';
import { Function } from '../parser/node/function';
import { Node } from '../parser/node/node';
import { Argument } from '../parser/node/statement/function/argument';
import { Prototype } from '../parser/node/statement/function/prototype';
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
	visitPrototype(_node: Prototype) {}
	visitVariableDeclarationStatement(_node: VariableDeclaration) {}
	visitFunctionCallStatement(_node: FunctionCall) {}
	visitReturnStatement(_node: Return) {}
	visit(node: Node) {
		node.accept(this);
	}
}
