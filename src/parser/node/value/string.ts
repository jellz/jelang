import { Pass } from '../../../passes/pass';
import { Type, TypeKind } from '../type';
import { Value } from './value';

export class String extends Value {
	constructor(public readonly value: string) {
		super(new Type(TypeKind.String));
	}

	accept(pass: Pass) {
		pass.visitString(this);
	}
}
