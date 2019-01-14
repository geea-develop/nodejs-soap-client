import axios, { AxiosResponse } from "axios";
import https from "https";
import { ClientConfig } from "../Client";
import { SoapRequest } from "./SoapRequest";

interface PfxRequestConfig extends ClientConfig {

}

export class PfxRequest extends SoapRequest {

    constructor(config: PfxRequestConfig) {
        super(config);
    }

    get config(): PfxRequestConfig {
        return this._config;
    }

    /**
     * @returns AxiosResponse
     */
    execute = async () => {
        let {url, xml, pfxFilePath, pfxPass, headers, timeout = 120000} = this.config;

        return await axios({
            method: 'post',
            url,
            headers,
            data: xml,
            timeout,
            httpsAgent: new https.Agent({
                pfx: require('fs').readFileSync(pfxFilePath),
                passphrase: pfxPass
            })
        });
    };

    /**
     * @returns AxiosResponse
     */
    executeMock = async () => {
        return {
                data: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\"><s:Body></s:Body></s:Envelope>",
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {}
            }
    }
}
