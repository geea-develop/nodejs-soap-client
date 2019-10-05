import {PfxRequest, SoapRequest} from "./index";
import {DefaultSoapRequest} from "./DefaultSoapRequest";

interface INameToValueMap
{
    [key: string]: any;
}

export const SoapRequests: INameToValueMap = {
    PfxRequest: PfxRequest,
    DefaultSoapRequest: DefaultSoapRequest
};
