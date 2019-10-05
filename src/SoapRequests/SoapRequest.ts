import { ClientConfig } from "../Client";
import {AxiosResponse} from "axios";

export abstract class SoapRequest {

    constructor(config: ClientConfig) {

    }

    get config(): ClientConfig { return {} as ClientConfig }

    /**
     * @returns AxiosResponse
     */
    async execute(): Promise<AxiosResponse> { return {} as AxiosResponse}

    /**
     * @returns AxiosResponse
     */
    async executeMock(): Promise<AxiosResponse> { return {} as AxiosResponse}
}
