import {PfxRequest, SoapRequest} from "./index";

interface INameToValueMap
{
    [key: string]: any;
}

export const SoapRequests: INameToValueMap = {
    PfxRequest: PfxRequest,
    SoapRequest: SoapRequest
};
