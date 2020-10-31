interface WirecardEnterpriseInitOptions {
    merchantUID: string;
    applicationUID: string;
    terminalID?: string;
    mode?: number | 0;
    wsdlUrl?: string;
}

export { WirecardEnterpriseInitOptions };