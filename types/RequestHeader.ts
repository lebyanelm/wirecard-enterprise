interface RequestHeader {
    authenticate: RequestHeaderAuth;
}

interface RequestHeaderAuth {
    merchantUID: string;
    merchantToken: string;
    actionTypeID: number;
}

export { RequestHeader, RequestHeaderAuth };