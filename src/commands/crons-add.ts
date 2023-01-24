import { GlueStackPlugin } from "src";
import { writeFile } from "../helpers/write-file";
import { fileExists } from "../helpers/file-exists";
import * as cron from "node-cron";
import path from "path";
const colors = require("colors");

export const cronsAdd = (program: any, glueStackPlugin: GlueStackPlugin) => {
  program
    .command("crons:add")
    .option("--s, --schedule <special>", "schedule value")
    .option("--m, --method <method-name>", "Name of the method")
    .option("--f, --function <function-name>", "name of function")
    .option("--w, --webhook <webhook-url>", "webhook url")
    .description("Create the crons")
    .action((args: any) => create(glueStackPlugin, args));
}

export async function create(_glueStackPlugin: GlueStackPlugin, args: any) {
  let fileContent: string;
  let content: any;
  const cronsPath = "./backend/crons";

  switch (true) {
    case "function" in args && "webhook" in args || !args.hasOwnProperty("function") && !args.hasOwnProperty("webhook"):
      console.log(colors.brightRed(`> enter either --f function or --w webhook-url`));
      process.exit(0);

    case args.hasOwnProperty('function') && !args.hasOwnProperty('method'):
      console.log(colors.brightRed("> enter method name with function --m method-name"))
      process.exit(0);

    case "function" in args:
      content = await createContent("function", args, args.schedule);
      break;
    case "webhook" in args:
      content = await createContent("webhook", args, args.schedule);
      break;
  }

  const isScheduleValid =
    args.hasOwnProperty("schedule") &&
    (args.hasOwnProperty("function") || args.hasOwnProperty("webhook")) &&
    cron.validate(args.schedule);

  if (!isScheduleValid) {
    console.log(colors.brightRed(
      `> enter a valid schedule value in the format of '* * * * *'.\n\nexample: node glue crons:add --s '* * * * *'`)
    );
    process.exit(0);
  }

  const cronsFilePath = `${cronsPath}/crons.json`;

  if (await fileExists(cronsFilePath)) {
    const data = require(path.join(process.cwd(), cronsPath.slice(2), "crons"));
    data.push(content);
    fileContent = JSON.stringify(data, null, 2);
  } else {
    fileContent = `[${JSON.stringify(content, null, 2)}]`;
  }

  await writeFile(cronsFilePath, fileContent);
  console.log(colors.brightGreen("> Successfully created!"));
}

export async function createContent(
  type: string,
  value: any,
  schedule: string
) {
  return {
    schedule: schedule,
    type: type,
    value: type === 'function' ? `${value.function}::${value.method}` : value.webhook,
  };
}