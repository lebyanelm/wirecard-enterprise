interface BillingDetailsOption {
    customerID: string;
    invoiceID: string;
    invoiceDescription: string;
    contact: BillingDetailsContactOption,
    address: BillingDetailsAddressOption
}

interface BillingDetailsContactOption {
    firstName: string;
    lastName: string;
    company: string;
    contactNumber: string;
    email: string;
}

interface BillingDetailsAddressOption {
    address1: string;
    address2: string;
    address3: string;
    suburb: string;
    city: string;
    postalCode: string;
    country: string;
}

export {
    BillingDetailsOption,
    BillingDetailsContactOption,
    BillingDetailsAddressOption
}