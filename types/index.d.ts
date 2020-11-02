export class WirecardEnterprise {
    constructor(options: IWirecardEnterpriseParams);

    authorise: (options: IAuthoriseSaleRequestOptions) => Promise<IAuthoriseSaleResponse>;
    authoriseReversal: (options: IAuthoriseReversalRequestOptions) => Promise<any>;
    sale: (options: IAuthoriseSaleRequestOptions) => Promise<IAuthoriseSaleResponse>;
    creditCapture: (options: ICreditRequestOptions) => Promise<ICreditResponse | any>;
    creditSale: (options: ICreditRequestOptions) => Promise<ICreditResponse | any>;
    capture: (options: ICaptureRequestOptions) => Promise<ICaptureResponse>;
    tdsLookup: (options: ITDSLookupRequestOptions) => Promise<ITDSLookupResponse>;
    tdsAuthentication: (options: ITDSAuthenticateRequestOptions) => Promise<ITDSAuthenticateResponse>;
    createToken: (options: ICreateTokenRequestOptions) => Promise<ITokenResponse>;
    readToken: (options: IReadTokenRequestOptions) => Promise<IReadTokenResponse>;
    updateToken: (options: IUpdateTokenRequestOptions) => Promise<ITokenResponse>;
    deleteToken: (options: IDeleteTokenRequestOptions) => Promise<IDeleteTokenResponse>;
}

export interface IWirecardEnterpriseParams {
    merchantUID: string;
    applicationUID: string;
    terminal?: string;
}

export interface IRequestOptions {
    applicationUID?: string;
    merchantReference?: string;
    mode?: string;
    terminal?: string;
}

export interface ISoapRequestHeader {
    authenticate: ISoapAuthenticateHeader;
}

export interface ISoapAuthenticateHeader {
    merchantUID: string;
    merchantToken: string;
    actionTypeID: string | number;
}

export interface IResponse {
    status: string;
    uidTransactionIndex: string;
    TransactionDateTime: string;
}

export interface ICardDetails {
    cardHolder: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvvNumber?: string;
    budgetPeriod?: string;
}

export interface IBrowserDetails {
    userAgent: string;
    browserHeader: string;
    ipAddressv4: string;
}

export interface IBillingDetails {
    customerID?: string;
    invoiceID?: string;
    invoiceDescription?: string;
    contact?: IContact;
    address?: IAddress;
}

export interface IShippingDetials {
    contact?: IContact;
    address?: IAddress;
}

export interface IContact {
    firstName?: string;
    lastName?: string;
    company?: string;
    contactNumber?: string;
    email?: string;
}

export interface IAddress {
    address1?: string;
    address2?: string;
    address3?: string;
    suburb?: string;
    city?: string;
    postalCity?: string;
    country?: string;
}

export interface INotification {
    email?: string;
    mobile?: string;
}

export interface IFraudDetails {
    uci: string;
}

export interface IBusinessRules {
    doFraudValidation: boolean | string;
}

export interface ITransactionAuth {
    transactionIndex: string;
    paresPayload?: string;
}

export interface IBillable {
    amount: string | number;
    cardDetails: ICardDetails;
    billingDetails?: IBillingDetails;
    shippingDetails?: IShippingDetials;
    notifications?: INotification;
    businessRules: IBusinessRules;
    fraudDetails?: IFraudDetails;
    browserDetails: IBrowserDetails;
}

export interface IAuthoriseSaleRequestOptions extends IRequestOptions, IBillable {
    transactionAuth: ITransactionAuth;
}

export interface IFSPMessage {
    code: number | string;
    message: string;
    description: string;
    error?: string;
    cardCountry: string;
    authorizationCode: number | string;
    processorResponse: string;
}

export interface IAuthoriseSaleResponse extends IResponse {
    fspMessage: IFSPMessage;
}

export interface IAuthoriseReversalRequestOptions extends IRequestOptions {
    transactionAuth: ITransactionAuth;
}

export interface ICreditRequestOptions extends IRequestOptions {
    transactionAuth: ITransactionAuth;
    terminal: string;
    amount: number | string;
}

export interface ICreditResponse extends IResponse {
    fspMessage: IFSPMessage;
}

export interface ICaptureRequestOptions extends IRequestOptions, IBillable {
    transactionAuth: ITransactionAuth;
}

export interface ICaptureResponse {
    fspMessage: IFSPMessage;
}

export interface ITDSLookupRequestOptions extends IBillable { }

export interface ITDSLookup {
    code?: string;
    message?: string;
    authRequired?: string;
    ccAuthAllowed?: string;
    eciFlag?: string;
    enrolled?: string;
    acsUrl?: string;
    payload?: string;
    action?: string;   
}

export interface ITDSLookupResponse extends IResponse {
    tdsLookup: ITDSLookup;
}

export interface ITDSAuthenticateRequestOptions extends IRequestOptions {
    transactionAuth: ITransactionAuth;
    merchantReference: string;
}

export interface ITDSAuthenticateResponse extends IResponse {
    tdsAuth: {
        code: string;
        message: string;
        description: string;
        authRequired: string;
        liabilityShift: string;
        ccAuthAllowed: string;
        eciFlag: string;
        action: string;
        paresStatus: string;
        signatureVerification: string;
        xid: string;
        cavv: string;
    }
}

export interface ICreateTokenRequestOptions extends IRequestOptions {
    cardDetails: ICardDetails;
}

export interface ITokenResponse extends IResponse {
    token: string;
}

export interface IReadTokenRequestOptions extends IRequestOptions {
    token: string;
}

export interface ITokenData {
    cardHolder: string;
    cardNumber_Masked: string;
    cardNumber_Hash: string;
    cardNumber_Encrypt: string;
    expiryMonth: string;
    expiryYear: string;
    tokenStatus: string;
}

export interface IReadTokenResponse extends IResponse {
    token: string;
    extraData: ITokenData;
}

export interface IDeleteTokenRequestOptions extends IRequestOptions {
    token: string;
}

export interface IDeleteTokenResponse extends IResponse {
    token: string;
}

export interface IUpdateTokenRequestOptions extends IRequestOptions {
    token: string;
    cardDetails: ICardDetails;
}