import { Router } from "../utils/Router.js";
import { getUsers, createUser } from "./user-controller.js";
const router: Router = new Router();

router.get("/users", getUsers);

router.post("/users", createUser);

export default router;

