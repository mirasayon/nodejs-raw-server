import { Application } from "../utils/Application.js";
import userRouter from "./user-router.js";
import jsonParser from "../utils/parseJson.js";
import parseUrl from "../utils/parseUrl.js";
import mongoose from "mongoose";
const connection_url: string | undefined = process.env.DATABASE_CONNECTION_URL;
const env_port = process.env.PORT;
const PORT: number = env_port ? Number(env_port) : 3000;
const app = new Application();
const server__url = `http://localhost:${PORT}`;
app.use(jsonParser);
app.use(parseUrl(server__url));

app.addRouter(userRouter);

async function start() {
	if (!connection_url) {
		console.info(connection_url);
		console.info(PORT);
		return console.error("No connection url to database");
	}
	try {
		await mongoose.connect(connection_url);
		app.listen(PORT, () => {
			console.log(`Server started on PORT ${PORT}`);
			console.info(server__url);
		});
	} catch (error) {
		console.log(error);
	}
}

start();

