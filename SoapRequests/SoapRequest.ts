import { ClientConfig } from "../Client";
import {AxiosResponse} from "axios";

export abstract class SoapRequest {

    protected readonly _config: ClientConfig;

    protected constructor(config: ClientConfig) {
        this._config = config;
    }

    get config(): ClientConfig {
        return this._config;
    }

    /**
     * @returns AxiosResponse
     */
    execute = async () => <AxiosResponse> {}

    /**
     * @returns AxiosResponse
     */
    executeMock = async () => <AxiosResponse> {}
}
