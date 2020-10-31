import { RequestOptions } from "./RequestOptions";
import { TransactionAuthOptions } from "./TransactionAuthOptions";
import { CardDetailsOption } from './CardDetailsOption';
import { BrowserDetailsOption } from './BrowserDetailsOption';
import { BillingDetailsOption } from './BillingDetailsOption';
import { ShippingDetailsOption } from "./ShippingDetailsOption";
import { NotificationOption } from "./NotificationOption";
import { SalesItem } from "./SalesItem";

interface AuthoriseSaleRequestOptions extends RequestOptions {
    transactionAuth: TransactionAuthOptions;
    cardDetails: CardDetailsOption;
    browserDetails: BrowserDetailsOption;
    amount: number | string;
    billingDetails?: BillingDetailsOption;
    shippingDetails?: ShippingDetailsOption;
    notification?: NotificationOption;
    salesItems?: SalesItem[];
    fraudDetails?: { uci: string };
    businessRules?: { doFraudValidation: boolean }
}

export { AuthoriseSaleRequestOptions };