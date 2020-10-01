export enum TypeScriptKeyword {
	TypeInteger = 'number',
	TypeString = 'string',
	TypeBoolean = 'boolean',
	Function = 'function',
	Constant = 'const',
	Return = 'return',
	BooleanTrue = 'true',
	BooleanFalse = 'false',
}

export const typeScriptTypeMappings: { [key: string]: TypeScriptKeyword } = {
	integer: TypeScriptKeyword.TypeInteger,
	string: TypeScriptKeyword.TypeString,
	boolean: TypeScriptKeyword.TypeBoolean,
};

export enum TypeScriptSymbol {
	BraceLeft = '{',
	BraceRight = '}',
	ParenLeft = '(',
	ParenRight = ')',
	Equal = '=',
	Colon = ':',
	DoubleQuote = '"',
	SemiColon = ';',
	Comma = ',',
}

export type TypeScriptEntity = TypeScriptKeyword | TypeScriptSymbol | string;
export type TypeScriptType = TypeScriptKeyword | string;
