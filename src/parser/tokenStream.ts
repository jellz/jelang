import { Token } from '../lexer/tokens';

export class TokenStream {
	private index: number = 0;

	constructor(private tokens: Token[]) {}

	peek() {
		return this.tokens[this.index];
	}

	peekNext() {
		return this.tokens[this.index + 1];
	}

	isLast() {
		return !!this.tokens[this.index + 1];
	}

	consume() {
		this.index += 1;
		return this.tokens[this.index - 1];
	}
}
