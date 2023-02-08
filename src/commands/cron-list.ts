const colors = require("colors");

import path from "path";
import Table from "cli-table3";
import { GlueStackPlugin } from "src";
import { fileExists } from "../helpers/file-exists";
import { timeStamp } from "../helpers/file-time-stamp";

export function cronList(program: any, glueStackPlugin: GlueStackPlugin) {
	program
		.command("cron:list")
		.description("List all Crons")
		.action(() => list(glueStackPlugin));
}

export async function list(_glueStackPlugin: GlueStackPlugin) {
	const cronsFilePath = "./backend/crons/crons.json";
	let table = new Table({
		head: [
			colors.brightGreen("Schedule"),
			colors.brightGreen("Run"),
		],
	});

	if (!(await fileExists(cronsFilePath))) {
		console.log("error: cron file missing!");
		process.exit(0);
	}

	const dataFilePath = path.join(process.cwd(), cronsFilePath.slice(2));
	const fileData = require(dataFilePath);

	if (fileData.length <= 0) {
		console.log(`> Error: Cron.json file's empty! Please add one and try again.\n> You can add cron "node glue cron:add"`);
		process.exit(0);
	}

	for await (const data of fileData) {
		const run = data.type === 'function' ? `function() [${data.value}]` : `webhook-url [${data.value}]`
		table.push({ [data.schedule]: [run] });
	}

	console.log(table.toString());

	const lastModified = await timeStamp(cronsFilePath);
	console.log(`Cron last updated: ${lastModified}`);
}
