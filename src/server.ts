import { Server } from "http";
import app from "./app";
import config from "./config";

async function main() {
	const server: Server = app.listen(config.port, () => {
		console.log(`Assignment 8 Sever is running on port ${config.port}`);
	});
}

main();
