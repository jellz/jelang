import { Value, ValueType } from './value';

export class String extends Value {
	constructor(public readonly value: string) {
		super(ValueType.String);
	}
}
