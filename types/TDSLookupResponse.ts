import { RequestResponse } from "./RequestResponse";

interface TDSLookupResponse extends RequestResponse {
    tdsLookup: {
        code: string;
        message: string;
        authRequired: string;
        liabilityShift: string;
        ccAuthAllowed: string;
        eciFlag: string;
        enrolled: string;
        acsUrl: string;
        payload: string;
        action: string;
    }
}

export { TDSLookupResponse };