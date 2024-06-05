import type { mod_reply, mod_request, server_reply, server_request } from "../types/main.js";
import { User } from "./user-model.js";

export async function getUsers(request: mod_request, reply: mod_reply): Promise<void> {
	let users;
	if (request.params.id) {
		users = await User.findById(request.params.id);
	} else {
		users = await User.find();
	}
	reply.send(users);
}

export async function createUser(request: mod_request, reply: mod_reply) {
	const req_body = request.body;
	const user = await User.create(req_body);
	reply.send(user);
}

