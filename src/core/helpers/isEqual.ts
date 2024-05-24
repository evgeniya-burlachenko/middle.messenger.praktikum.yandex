export function isEqual(a: unknown, b: unknown): boolean {
	if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
		return a === b;
	}

	const objA = a as { [key: string]: unknown };
	const objB = b as { [key: string]: unknown };

	const keysA = Object.keys(objA);
	const keysB = Object.keys(objB);

	if (keysA.length !== keysB.length) {
		return false;
	}

	for (const key of keysA) {
		if (!keysB.includes(key)) {
			return false;
		}

		if (!isEqual(objA[key], objB[key])) {
			return false;
		}
	}

	return true;
}
