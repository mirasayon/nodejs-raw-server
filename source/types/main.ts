import * as node_http from "node:http";

export type t_methods = "GET" | "POST" | "DELETE" | "PUT";
export type t_handler = (request: server_request, reply: server_reply) => server_reply | undefined;
export type server_request = node_http.IncomingMessage;
export type server_reply = node_http.ServerResponse<node_http.IncomingMessage> & {
	req: node_http.IncomingMessage;
};

export type mod_reply = node_http.ServerResponse<node_http.IncomingMessage> & {
	req: node_http.IncomingMessage;
} & {
	send: (js_obj: unknown) => void;
};

export type mod_request = node_http.IncomingMessage & {
	method: t_methods;
	params: {
		[x: string]: string;
	};
	pathname: string;
	body?: any;
};
