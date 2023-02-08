import { IStatelessPlugin } from "./IStatelessPlugin";

export interface IGlueEngine {
  statelessPlugins: IStatelessPlugin[];

  collectPlugins(pluginType: 'stateless' | 'stateful'): Promise<void>;

  start(): Promise<void>;
  stop(): Promise<void>;
  build(): Promise<void>;

  startDockerCompose(): Promise<void>;
  stopDockerCompose(): Promise<void>;

  createDockerCompose(): Promise<void>;
  createNginxConfig(environment: 'dev' | 'prod'): Promise<void>;
}
