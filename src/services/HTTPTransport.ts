export function queryStringify(data: Record<string, unknown>) {
	if (typeof data !== 'object') {
		throw new Error('Data must be object');
	}

	const keys = Object.keys(data);
	return keys.reduce(
		(result, key, index) => `${result}${key}=${data[key] as string}${index < keys.length - 1 ? '&' : ''}`,
		'',
	);
}
export enum Method {
	Get = 'GET',
	Post = 'POST',
	Put = 'PUT',
	Patch = 'PATCH',
	Delete = 'DELETE'
}
type Options = {
	method: Method;
	timeout?: number;
	data?: Record<string, unknown>;
	headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransport {
	get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, { ...options, method: Method.Get });
	 }

	post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, { ...options, method: Method.Post });
	}

	put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, { ...options, method: Method.Put });
	}

	delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
		return this.request(url, { ...options, method: Method.Delete });
	}

	request(url: string, options: Options = { method: Method.Get }): Promise<XMLHttpRequest> {
		const { method, headers, data } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			if (method === Method.Get && data) {
				url = `${url}?${queryStringify(data)}`;
			}

			if (headers) {
				for (const header of Object.entries(headers)) {
					xhr.setRequestHeader(header[0], header[1]);
				}
			}

			xhr.open(method, url);

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === Method.Get || !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	}
}
