import {AxiosResponse} from "axios";
import {SoapRequest, SoapRequests} from "./SoapRequests";
import {DefaultSoapRequest} from "./SoapRequests/DefaultSoapRequest";

export interface ClientConfig {
    url?: any,
    xml?: any,
    headers?: any,
    timeout?: number,
    pfxFilePath?: any,
    pfxPass?: any,
    isDebug?: boolean
}

export class Client {

    private _config: ClientConfig;
    private _soapRequest: SoapRequest;
    private _logger: [any];

    constructor(config: ClientConfig) {
        this._config = config
        this._soapRequest = new DefaultSoapRequest(config);
        this._logger = [{
            title: '[SOAP Client initiated]'
        }];
    }

    get config(): ClientConfig {
        return this._config;
    }

    set config(value: ClientConfig) {
        this._config = value;
    }

    get soapRequest(): SoapRequest {
        return this._soapRequest;
    }

    set soapRequest(value: SoapRequest) {
        this._soapRequest = value;
    }

    get logger(): [any] {
        return this._logger;
    }

    /**
     * @returns AxiosResponse
     */
    async execute(action: string, config: ClientConfig = {}, mock = false) {
       this.config = { ...this.config, ...config};

       if (SoapRequests[action]) {
           this.soapRequest = new SoapRequests[action](this.config);
       } else {
           throw "Soap request not found: " + action;
       }

       let response: AxiosResponse;

       if (mock)
           this._logger.push({title: `SOAP MOCK ENABLED`});

       try {
            response = mock ?
              await this.soapRequest.executeMock()
              : await this.soapRequest.execute();
        } catch (e) {
           response = this.processError(e);
        }

        return this.processResponse(response);
    }

    /**
     * @returns AxiosResponse
     */
    async executeMock(action: string, config: ClientConfig = {}) {
        return await this.execute(action, config, true);
    }

    /**
      * @returns AxiosResponse
      */
    processError(e: any) {

        if (this.config.isDebug)
            this._logger.push({
                title: '[SOAP Client] processError ',
                data: e
            })

        if (e.response) {
            this._logger.push({
                title: `SOAP FAIL: ${e}`
            });
            return e.response;
        } else {
            this._logger.push({
                title: `SOAP FAIL: ${e}`
            });
            return {
                status: 500,
                statusText: 'Unknown error',
                headers: {},
                config: {}
            }
        }
    }

    /**
     * @returns AxiosResponse
     */
    processResponse(response: AxiosResponse) {
        this._logger.push({
            title: `[Client] processResponse `,
            data: response
        });

        if (!response) return {
            status: 500,
            statusText: 'Empty response',
            headers: {},
            config: {}
        };

        return {
            response: {
                body: response.data,
                statusCode: response.status,
            }
        }
    }

}
