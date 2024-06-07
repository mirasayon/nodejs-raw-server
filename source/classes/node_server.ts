import http from "node:http";
import { EventEmitter } from "node:events";
import type { t_methods } from "../types/types.js";
import type { Router } from "../classes/Router.js";
export class Node_Server {
	emitter: EventEmitter;
	middlewares: ((request: any, response: any) => any)[];
	server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
	constructor() {
		this.emitter = new EventEmitter();
		this.server = this._createServer();
		this.middlewares = [];
	}
	use(middleware: (...args: any[]) => void) {
		this.middlewares.push(middleware);
	}
	listen(port: number, callback: () => any) {
		this.server.listen({ port: port }, callback);
	}
	addRouter(router: Router) {
		Object.keys(router.endpoints).forEach((path) => {
			const endpoint = router.endpoints[path];

			const keys_method: string[] = Object.keys(endpoint);

			keys_method.forEach((method) => {
				const method_ = method as t_methods;

				this.emitter.on(this._getRouteMask(path, method), (req, reply) => {
					const handler = endpoint[method_];

					handler?.(req, reply);
				});
			});
		});
	}

	private _createServer() {
		return http.createServer((request: any, reply: any) => {
			let _body = "";
			request.on("data", (chunk: string) => {
				_body += chunk;
			});

			request.on("end", () => {
				if (_body) {
					request.body = JSON.parse(_body);
				}
				this.middlewares.forEach((middleware) => middleware(request, reply));

				const emitted = this.emitter.emit(
					this._getRouteMask(request.pathname, request.method),
					request,
					reply,
				);
				if (!emitted) {
					reply.end();
				}
			});
		});
	}

	private _getRouteMask(path: string, method: t_methods | string): string {
		return `[${path}]:[${method}]`;
	}
}

