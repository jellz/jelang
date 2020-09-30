export enum TokenType {
	Comment = 'comment',
	KeywordFunction = 'keywordFunction',
	KeywordImport = 'keywordImport',
	KeywordReturn = 'keywordReturn',

	KeywordTypeInteger = 'keywordTypeInteger',
	KeywordTypeString = 'keywordTypeString',
	KeywordTypeBoolean = 'keywordTypeBoolean',

	Integer = 'integer',
	String = 'string',
	Boolean = 'boolean',
	Decimal = 'decimal', //todo

	Identifier = 'identifier',

	SymbolComma = 'symbolComma',
	SymbolColon = 'symbolColon',
	SymbolSemiColon = 'symbolSemiColon',
	SymbolOpenParen = 'symbolOpenParen',
	SymbolCloseParen = 'symbolCloseParen',
	SymbolOpenBrace = 'symbolOpenBrace',
	SymbolCloseBrace = 'symbolCloseBrace',
	SymbolEqual = 'symbolEqual',
	SymbolDoubleQuote = 'symbolDoubleQuote',

	Whitespace = 'whitespace',
}

export const regExps: RegExpMap = {
	comment: /^(\/\/.*)|(\/\*(.|[\n])*\*\/)/,

	keywordFunction: /^fn/,
	keywordImport: /^import/,
	keywordReturn: /^return/,

	keywordTypeInteger: /^int/,
	keywordTypeString: /^str/,
	keywordTypeBoolean: /^bool/,

	decimal: /^\d+\.\d+/,
	integer: /^\d+/,
	string: /^".+"/,
	boolean: /^(TRUE|FALSE)/,

	identifier: /^\w+/,
	symbolOpenParen: /^\(/,
	symbolCloseParen: /^\)/,
	symbolOpenBrace: /^\{/,
	symbolCloseBrace: /^\}/,
	symbolComma: /^,/,
	symbolColon: /^:/,
	symbolSemiColon: /^;/,
	symbolEqual: /^=/,
	symbolDoubleQuote: /^"/,

	whitespace: /^\s+/,
};

export class Token {
	constructor(
		public type: TokenType,
		public raw: string,
		public start: number
	) {}

	expectType(type: TokenType): Token {
		if (type === this.type) return this;
		else
			throw Error(
				`Expected token ${type} but received ${this.type} (index ${this.start})`
			);
	}
}

type RegExpMap = { [key: string]: RegExp };
export function getTokenTypeRegExp(tt: TokenType): RegExp {
	return regExps[tt];
}
