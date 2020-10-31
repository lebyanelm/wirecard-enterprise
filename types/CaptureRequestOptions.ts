import { RequestOptions } from "./RequestOptions";
import { TransactionAuthOptions } from "./TransactionAuthOptions";
import { BillingDetailsOption } from "./BillingDetailsOption";
import { ShippingDetailsOption } from "./ShippingDetailsOption";
import { SalesItem } from "./SalesItem";

interface CaptureRequestOptions extends RequestOptions {
    transactionAuth: TransactionAuthOptions;
    amount: string | number;
    billingDetails?: BillingDetailsOption;
    shippingDetails?: ShippingDetailsOption;
    salesItems: SalesItem[];
}

export { CaptureRequestOptions };