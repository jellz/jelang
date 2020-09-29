import { Value, ValueType } from './value';

export class Boolean extends Value {
	constructor(public readonly value: boolean) {
		super(ValueType.Boolean);
	}
}
