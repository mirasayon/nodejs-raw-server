import type { mod_reply, server_request } from "../types/types.js";

export function json_parser(_req: server_request, res: mod_reply) {
	res.writeHead(200, {
		"Content-type": "application/json",
	});
	res.send = (js_obj) => {
		return res.end(JSON.stringify(js_obj));
	};
}

