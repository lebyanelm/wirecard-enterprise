import { RequestOptions } from './RequestOptions';
import { CardDetailsOption } from './CardDetailsOption';
import { BillingDetailsOption } from './BillingDetailsOption';
import { BrowserDetailsOption } from './BrowserDetailsOption';

interface TDSLookupRequestOptions extends RequestOptions {
    cardDetails: CardDetailsOption;
    amount: string | number;
    billingDetails?: BillingDetailsOption;
    browserDetails?: BrowserDetailsOption;
}

export { TDSLookupRequestOptions };