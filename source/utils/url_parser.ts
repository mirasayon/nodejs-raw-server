import type { mod_request, server_reply } from "../types/types.js";

export function url_parser(baseUrl: string) {
	return function (request: mod_request, reply: server_reply) {
		if (!request.url) {
			return console.error("request.url is not defined");
		}
		const parsedUrl = new URL(request.url, baseUrl);
		const params: { [x: string]: string } = {};
		parsedUrl.searchParams.forEach((value, key) => (params[key] = value));

		request.pathname = parsedUrl.pathname;
		request.params = params;
	};
}

