import axios from "axios";

import { IEngine } from "./interfaces/IEngine";
import { HttpMethod } from "./interfaces/HttpMethod";

import { SDK, ISDKPlugin } from "@gluestack/glue-plugin-sdk";

export class EnginePlugin implements ISDKPlugin, IEngine {
  sdk: SDK | undefined;
  baseURL: string;

  constructor(baseURL: string = "") {
    this.baseURL = baseURL;
  }

  register(sdk: SDK) {
    this.sdk = sdk;
  }

  async invoke(
    serviceAppId: string,
    serviceMethod: string,
    body: any = {},
    headers: any = {},
    method: HttpMethod = HttpMethod.POST,
  ) {
    const { data } = await axios({
      method: HttpMethod.POST,
      url: `${this.baseURL}/backend/engine/server/invoke`,
      data: {
        action_name: serviceAppId,
        method_uri: serviceMethod,
        method_name: method,
        data: body
      },
      headers: headers
    });
    return data.data;
  }
}
