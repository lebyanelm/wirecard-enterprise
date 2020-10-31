import { BillingDetailsContactOption, BillingDetailsAddressOption } from "./BillingDetailsOption";

interface ShippingDetailsOption {
    contact: BillingDetailsContactOption;
    address: BillingDetailsAddressOption;
}

export { ShippingDetailsOption };