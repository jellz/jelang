import { Node } from '../parser/node/node';
import { Pass } from './pass';

export class PassManager {
	private passes: Set<Pass> = new Set();

	register(pass: Pass): boolean {
		this.passes.add(pass);
		if (this.has(pass)) return true;
		else return false;
	}

	deregister(pass: Pass): boolean {
		return this.passes.delete(pass);
	}

	has(pass: Pass): boolean {
		return this.passes.has(pass);
	}

	run(rootNodes: Node[]): void {
		const childrenQueue: Node[] = [...rootNodes];
		for (const pass of this.passes) {
			while (childrenQueue.length > 0) {
				const child = childrenQueue.pop();
				if (!child) throw Error('Missing child in PassManager#run');
				pass.visit(child);
				childrenQueue.push(...child.getChildren());
			}
		}
	}
}
