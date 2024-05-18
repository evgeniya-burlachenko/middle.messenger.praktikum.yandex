import { Indexed, merge } from './merge';

export function set(object: Indexed , path: string, value: unknown): Indexed  {
	if (typeof object !== 'object' || object === null) {
		return object;
	}
	const result = path.split('.').reduceRight<Indexed>(
		(acc, key) => ({
			[key]: acc,
		}),
	value as Indexed,
	);

	return merge(object, result);
}
