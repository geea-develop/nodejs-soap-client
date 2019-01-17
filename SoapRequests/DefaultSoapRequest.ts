import {SoapRequest} from "./SoapRequest";
import {ClientConfig} from "../Client";
import {AxiosResponse} from "axios";

export class DefaultSoapRequest implements SoapRequest {
    constructor(config: ClientConfig) {

    }

    get config(): ClientConfig {
        return {} as ClientConfig;
    }

    async execute(): Promise<AxiosResponse> { return {} as AxiosResponse}


    async executeMock(): Promise<AxiosResponse> { return {} as AxiosResponse}

}
