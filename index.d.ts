import { TDSLookupRequestOptions } from './types/TDSLookupRequestOptions';
import { TDSLookupResponse } from './types/TDSLookupResponse';

declare class WirecardTransactions {
    tdsLookup(options: TDSLookupRequestOptions): Promise<TDSLookupResponse>;
}