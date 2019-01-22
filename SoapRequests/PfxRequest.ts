import axios, { AxiosResponse } from "axios";
import * as https from "https";
import { ClientConfig } from "../Client";
import { SoapRequest } from "./SoapRequest";
import * as fs from "fs";


interface PfxRequestConfig extends ClientConfig {

}

export class PfxRequest implements SoapRequest {

    private _config: PfxRequestConfig;

    constructor(config: PfxRequestConfig) {
        this._config = config
    }

    get config(): PfxRequestConfig {
        return this._config;
    }

    /**
     * @returns AxiosResponse
     */
    async execute(): Promise<AxiosResponse> {
        let {url, xml, pfxFilePath, pfxPass, headers, timeout = 120000} = this.config;

        return await axios({
            method: 'post',
            url,
            headers,
            data: xml,
            timeout,
            httpsAgent: new https.Agent({
                pfx: fs.readFileSync(pfxFilePath),
                passphrase: pfxPass
            })
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
