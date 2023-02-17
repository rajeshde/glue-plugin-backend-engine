import IApp from "@gluestack/framework/types/app/interface/IApp";
import { IGlueEngine } from "./types/IGlueEngine";
import { IStatelessPlugin } from "./types/IStatelessPlugin";
export default class GluestackEngine implements IGlueEngine {
    private backendPlugins;
    private engineExist;
    app: IApp;
    actionPlugins: IStatelessPlugin[];
    statelessPlugins: IStatelessPlugin[];
    statefulPlugins: IStatelessPlugin[];
    constructor(app: IApp, backendInstancePath: string);
    start(): Promise<void>;
    stop(): Promise<void>;
    createNginxConfig(environment?: 'dev' | 'prod'): Promise<void>;
    collectPlugins(pluginType?: 'stateless' | 'stateful', status?: 'up' | 'down'): Promise<void>;
    createDockerCompose(): Promise<void>;
    startDockerCompose(): Promise<void>;
    stopDockerCompose(): Promise<void>;
    private collectDockerContext;
    build(): Promise<void>;
}
