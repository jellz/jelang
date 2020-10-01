import { Pass } from '../../../passes/pass';
import { Type, TypeKind } from '../type';
import { Value } from './value';

export class Integer extends Value {
	constructor(public readonly value: number) {
		super(new Type(TypeKind.Integer));
	}

	accept(pass: Pass) {
		pass.visitInteger(this);
	}
}
