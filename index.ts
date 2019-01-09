import axios, {AxiosResponse} from "axios";
import https from "https";

export class SoapPfxRequest {
    execute = async (parameters: { url: any, xml: any, pfxFilePath: any, pfxPass: any, headers: any, timeout?: number }) => {
        let {url, xml, pfxFilePath, pfxPass, headers, timeout = 120000} = parameters;

        let soapResponse: AxiosResponse;

        try {
            soapResponse = await axios({
                method: 'post',
                url,
                headers,
                data: xml,
                timeout,
                httpsAgent: new https.Agent({
                    pfx: require('fs').readFileSync(pfxFilePath),
                    passphrase: pfxPass
                })
            })
        } catch (e) {
            if (e.response) {
                console.log(`SOAP FAIL: ${e}`);
                return e.response.data;
            } else {
                console.log(`SOAP FAIL: ${e}`);
                return e
            }
        }

        if (soapResponse) {
            return {
                response: {
                    body: soapResponse.data,
                    statusCode: soapResponse.status,
                }
            }
        }
    };
}
