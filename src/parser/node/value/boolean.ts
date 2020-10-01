import { Pass } from '../../../passes/pass';
import { Type, TypeKind } from '../type';
import { Value } from './value';

export class Boolean extends Value {
	constructor(public readonly value: boolean) {
		super(new Type(TypeKind.Boolean));
	}

	accept(pass: Pass) {
		pass.visitBoolean(this);
	}
}
