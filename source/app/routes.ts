import { Router } from "../classes/Router.js";
import { getUsers, createUser } from "../controllers/users.js";

export const routes: Router = new Router();

routes.get("/", getUsers);

routes.post("/", createUser);

