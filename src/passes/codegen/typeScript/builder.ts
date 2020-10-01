import { TypeScriptEntity, TypeScriptSymbol } from './constants';

export class TypeScriptBuilder {
	private data: string = '';

	add(str: TypeScriptEntity, spaceAfter: boolean = true) {
		this.data += str + (spaceAfter ? ' ' : '');
		return this;
	}

	// todo: format code properly. maybe do it somewhere else, but for now this will do
	toString() {
		return this.data
			.split(TypeScriptSymbol.BraceLeft)
			.join(TypeScriptSymbol.BraceLeft + '\n')
			// .split(TypeScriptSymbol.BraceRight)
			// .join('\n' + TypeScriptSymbol.BraceRight)
			.split(TypeScriptSymbol.SemiColon)
			.join(TypeScriptSymbol.SemiColon + '\n')
			.trimRight();
	}
}
