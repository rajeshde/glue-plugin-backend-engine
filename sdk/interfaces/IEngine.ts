import { HttpMethod } from "./HttpMethod";

export interface IEngine {
  invoke(
    serviceAppId: string,
    serviceMethod: string,
    body: any,
    headers: any,
    method: HttpMethod,
  ): Promise<any>;
}
