import type { f_function, t_methods } from "../types/types.js";

export class Router {
	public endpoints: {
		[x: string]: {
			GET?: f_function;
			DELETE?: f_function;
			PUT?: f_function;
			POST?: f_function;
		};
	};
	constructor() {
		this.endpoints = {};
	}

	request(method: t_methods = "GET", path: string, handler: f_function) {
		if (!this.endpoints[path]) {
			this.endpoints[path] = {};
		}
		const endpoint = this.endpoints[path];

		if (endpoint[method]) {
			throw new Error(`[${method}] по адресу ${path} уже существует`);
		}

		endpoint[method] = handler;
	}

	get(path: string, handler: f_function) {
		this.request("GET", path, handler);
	}
	post(path: string, handler: f_function) {
		this.request("POST", path, handler);
	}
	put(path: string, handler: f_function) {
		this.request("PUT", path, handler);
	}
	delete(path: string, handler: f_function) {
		this.request("DELETE", path, handler);
	}
}

