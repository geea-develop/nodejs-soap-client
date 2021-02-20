import {SoapRequest} from "./SoapRequest";
import {ClientConfig} from "../Client";
import axios, { AxiosResponse } from "axios";

export class DefaultSoapRequest implements SoapRequest {
    constructor(config: ClientConfig) {

    }

    get config(): ClientConfig {
        return {} as ClientConfig;
    }

    /**
     * @returns AxiosResponse
     */
    async execute(): Promise<AxiosResponse> {
        let {url, xml, headers, timeout = 120000} = this.config;

        return await axios({
            method: 'post',
            url,
            headers,
            data: xml,
            timeout
        });
    };

    /**
     * @returns AxiosResponse
     */
    async executeMock(): Promise<AxiosResponse> {
        return {
                data: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\"><s:Body></s:Body></s:Envelope>",
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {}
            }
    }
}
