import { Value, ValueType } from './value';

export class Integer extends Value {
	constructor(public readonly value: number) {
		super(ValueType.Integer);
	}
}
