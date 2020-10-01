import { getTokenTypeRegExp, TokenType, Token } from './tokens';

export class Lexer {
	private index: number = 0;

	constructor(private input: string) {}

	// todo: shouldn't allow quotes inside strings
	lex() {
		const tokens: Token[] = [];
		while (this.index < this.input.length) {
			const nextToken = this.getNextToken();
			if (nextToken && nextToken.type !== TokenType.Comment)
				tokens.push(nextToken);
		}
		return tokens;
	}

	getNextToken(): Token | undefined {
		const restCode = this.input.substr(this.index);
		let currentMatch: RegExpExecArray | undefined;
		for (const type of Object.values(TokenType)) {
			const regExp = getTokenTypeRegExp(type);
			const match = regExp.exec(restCode);
			if (match) {
				const raw = match[0];
				const token = new Token(type, raw, this.index);
				this.index += raw.length;
				currentMatch = match;
				console.log(token);
				return token;
			}
		}
		if (!currentMatch) throw Error(`Unknown token at index ${this.index}`);
	}
}
