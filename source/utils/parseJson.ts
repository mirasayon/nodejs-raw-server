import type { mod_reply, server_reply, server_request } from "../types/main.js";

export default function parserJson(req: server_request, res: mod_reply) {
	res.writeHead(200, {
		"Content-type": "application/json",
	});
	res.send = (js_obj) => {
		res.end(JSON.stringify(js_obj));
	};
}

