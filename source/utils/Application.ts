import http from "node:http";
import EventEmitter from "node:events";
import type {
	mod_request,
	server_reply,
	server_request,
	t_handler,
	t_methods,
} from "../types/main.js";
import type { Router, f_function } from "./Router.js";

export class Application {
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
		this.server.listen(port, callback);
	}

	addRouter(router: Router) {
		Object.keys(router.endpoints).forEach((path) => {
			const endpoint = router.endpoints[path];
			const keys_method: string[] = Object.keys(endpoint);
			keys_method.forEach((method) => {
				const method_ = method as t_methods;
				this.emitter.on(this._getRouteMask(path, method), (req, res) => {
					const handler = endpoint[method_];
					handler?.(req, res);
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

	private _getRouteMask(path: string, method: string): string {
		return `[${path}]:[${method}]`;
	}
}

