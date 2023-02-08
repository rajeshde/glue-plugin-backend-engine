const prompts = require("prompts");
const services = require("@gluestack/framework/constants/services");

import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import IHasContainerController from "@gluestack/framework/types/plugin/interface/IHasContainerController";

import { join, relative } from "path";
import * as cron from "node-cron";
import { GlueStackPlugin } from "src";
import { writeFile } from "../helpers/write-file";
import { fileExists } from "../helpers/file-exists";
import { getDirectories } from "../helpers/get-directories";

interface IChoice {
	title: string;
	description: string;
	value: string;
}

export const cronAdd = (program: any, gluestackPlugin: GlueStackPlugin) => {
  program
    .command("cron:add")
    .description("Create the cron")
    .action((args: any) => create(gluestackPlugin));
}

export async function create(gluestackPlugin: GlueStackPlugin) {
  let method: string = '';
	let webhook: string = '';
  let functionName: string = '';
  let content: any = {};
  let fileContent: any = [];

  const backendInstance: string = 'backend';
  const cronsFilePath: string = join(process.cwd(), backendInstance, 'crons/crons.json');

  if (!await fileExists(cronsFilePath)) {
    await writeFile(cronsFilePath, '[]');
  }

  const schedule: string = await INPUT_SCHEDULE();
  const type: 'function' | 'webhook' = await SELECT_CALLBACK_TYPE();
  if (type === 'function') {
		const instance = await SELECT_INSTANCES(
			// @ts-ignore
			gluestackPlugin.app.getContainerTypePluginInstances(false)
		);

		functionName = instance.getName();

		const functionsPath: string = join(
			process.cwd(),
			instance.getInstallationPath(),
			'functions'
		);

		if (!await fileExists(functionsPath)) {
			console.log(`No functions found in ${relative('.', functionsPath)}. Please add one and try again!`);
			return;
		}

		const directories: string[] = await getDirectories(functionsPath);
		if (!directories.length) {
			console.log(`No functions found in ${relative('.', functionsPath)}. Please add one and try again!`);
			return;
		}

		method = await SELECT_FUNCTIONS(directories);
	} else {
		webhook = await INPUT_WEBHOOK();
	}

  content = CREATE_CONTENT(
    schedule,
    type,
    type === 'function' ?
      { function: functionName, method } : { webhook }
  )

  fileContent = require(cronsFilePath);
  fileContent = `${JSON.stringify([content, ...fileContent], null, 2)}`;

  await writeFile(cronsFilePath, fileContent);
}

const INPUT_SCHEDULE = async () => {
  const error: string = 'This is not a valid cron value. You can refer https://crontab.guru for a valid schedule.';
  const { value } = await prompts({
    type: "text",
    name: "value",
    message: "Please provide a valid cron schedule",
		validate: (value: string) => cron.validate(value) ? true : error
  });

  return value;
};

const SELECT_INSTANCES = async (_instances: (IInstance & IHasContainerController)[]) => {
	const choices = [];

	for await (const instance of _instances) {
    // Get the type of the instance
    const type: string | undefined = instance?.callerPlugin.getType();
    const name: string | undefined = instance?.callerPlugin.getName();

    // If and only if the instance is a "stateless" + "backend" plugin
    if (
      instance && type && name &&
      instance?.containerController &&
      type === 'stateless' && services.includes(name)
    ) {

			choices.push({
				title: instance.getName(),
				description: `Select instance ${instance.getName()}`,
				value: instance
			});
    }
  }

  const { value } = await prompts({
    type: "select",
    name: "value",
    message: "Select a service plugin",
    choices: choices
  });

  return value;
};

const SELECT_CALLBACK_TYPE = async () => {
  const choices: IChoice[] = [{
		title: 'function',
		description: `Callback to a Gluestack Service`,
		value: 'function',
  }, {
		title: 'webhook',
		description: `Callback to a Webhook`,
		value: 'webhook',
  }];

  const { value } = await prompts({
    type: "select",
    name: "value",
    message: "Select Cron's Callback Type",
    choices: choices,
		min: 1
  });

  return value;
};

const SELECT_FUNCTIONS = async (functions: string[]) => {
  const choices = functions.map((_function: string) => {
    return {
      title: _function,
      value: _function
    };
  });

  const { value } = await prompts({
    type: "select",
    name: "value",
    message: "Select a function",
    choices: choices,
  });

  return value;
};

const INPUT_WEBHOOK = async () => {
	const { value } = await prompts({
		type: "text",
		name: "value",
		message: "Please provide Webhook URL",
		validate: (value: string) => (value.length > 0) ? true : false
	});

	return value;
};

const CREATE_CONTENT = (schedule: string, type: 'function' | 'webhook', value: any) => {
	return {
		schedule,
		type,
		value: type === 'function' ? `${value.function}::${value.method}` : value.webhook
	};
};
