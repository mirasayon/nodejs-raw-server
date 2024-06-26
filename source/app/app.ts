import { Router } from "../classes/Router.js";
import type { mod_reply, mod_request } from "../types/types.js";
import { User } from "./mongoose.js";

export const routes: Router = new Router();

routes.get("/", async (req: mod_request, reply: mod_reply): Promise<void> => {
	let users;
	if (req.params.id) {
		users = await User.findById(req.params.id);
	} else {
		users = await User.find();
	}
	return reply.send(users);
});

routes.post("/", async (request: mod_request, reply: mod_reply) => {
	const req_body = request.body;
	const user = await User.create(req_body);
	return reply.send(user);
});
