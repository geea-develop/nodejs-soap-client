import {AxiosResponse} from "axios";
import {SoapRequest, SoapRequests} from "./SoapRequests";

export interface ClientConfig {
    url?: any,
    xml?: any,
    headers?: any,
    timeout?: number,
    pfxFilePath?: any,
    pfxPass?: any
}

export class Client {

    private _config: ClientConfig;

    constructor(config: ClientConfig) {
        this._config = config
    }

    get config(): ClientConfig {
        return this._config;
    }

    set config(value: ClientConfig) {
        this._config = value;
    }

    /**
     * @returns string | {response: object} | null
     */
    async execute(action: string, config: ClientConfig, mock = false) {
       this.config = { ...this.config, ...config};

       let SoapRequest: SoapRequest;

       if (SoapRequests[action]) {
           SoapRequest = new SoapRequests[action](this.config);
       } else {
           throw "Soap request not found: " + action;
       }

       let response: AxiosResponse;

       if (mock)
        console.log(`SOAP MOCK ENABLED`);

       try {
            response = mock ?
              await SoapRequest.executeMock()
              : await SoapRequest.execute();
        } catch (e) {
            return this.processError(e);
        }

        return this.processResponse(response);
    }

    /**
     * @returns string | {response: object} | null
     */
    async executeMock(action: string, config: ClientConfig) {
        return await this.execute(action, config, true);
    }

    /**
      * @returns string
      */
    processError(e: any) {
        if (e.response) {
            console.log(`SOAP FAIL: ${e}`);
            return e.response.data;
        } else {
            console.log(`SOAP FAIL: ${e}`);
            return e
        }
    }

    /**
     * @returns {response: object} | null
     */
    processResponse(response: AxiosResponse|null) {
        if (!response) return null;

        return {
            response: {
                body: response.data,
                statusCode: response.status,
            }
        }
    }

}
