const connection_url = process.env.DATABASE_CONNECTION_URL;
const port_ = Number(process.env.PORT) || 3000;
import { routes } from "./app.js";
import { Node_Server } from "../classes/node_server.js";
import { json_parser } from "../utils/json_parser.js";
import { url_parser } from "../utils/url_parser.js";
import mongoose from "mongoose";
const app = new Node_Server();

app.use(json_parser);
app.use(url_parser(`http://localhost:${port_}`));
app.addRouter(routes);

if (!connection_url) throw new Error("No connection url to database");

await mongoose.connect(connection_url);

app.listen(port_, () => {
	console.log(`Server started on PORT ${port_}`);
	console.info(`http://localhost:${port_}`);
});
