import type { mod_request, server_reply, server_request } from "../types/main.js";

export default function parseUrl(baseUrl: string) {
	return (request: mod_request, reply: server_reply) => {
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

