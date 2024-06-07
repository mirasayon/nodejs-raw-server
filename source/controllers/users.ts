import type { mod_reply, mod_request } from "../types/types.js";
import { User } from "../data/mongoose.js";

export async function getUsers(request: mod_request, reply: mod_reply): Promise<void> {
	let users;
	if (request.params.id) {
		users = await User.findById(request.params.id);
	} else {
		users = await User.find();
	}
	return reply.send(users);
}

export async function createUser(request: mod_request, reply: mod_reply) {
	const req_body = request.body;
	const user = await User.create(req_body);
	return reply.send(user);
}

