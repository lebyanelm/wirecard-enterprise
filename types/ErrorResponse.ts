interface ErrorResponse {
    status: string | number;
    uidTransactionIndex: string;
    TransactionDateTime: string;
    errors: Error[];
}

interface Error {
    code: string;
    message: string;
    description: string;
}

export { ErrorResponse, Error };