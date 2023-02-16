import { IEngine } from "./interfaces/IEngine";
import { HttpMethod } from "./interfaces/HttpMethod";
import { SDK, ISDKPlugin } from "@gluestack/glue-plugin-sdk";
export declare class EnginePlugin implements ISDKPlugin, IEngine {
    sdk: SDK | undefined;
    baseURL: string;
    constructor(baseURL?: string);
    register(sdk: SDK): void;
    boot(_sdk: SDK): void;
    invoke(serviceAppId: string, serviceMethod: string, body?: any, headers?: any, method?: HttpMethod): Promise<any>;
}
