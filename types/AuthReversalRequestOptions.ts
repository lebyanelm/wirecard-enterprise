import { RequestOptions } from "./RequestOptions";
import { TransactionAuthOptions } from "./TransactionAuthOptions";

interface AuthReversalRequestOptions extends RequestOptions {
    transactionAuth: TransactionAuthOptions;
}

export { AuthReversalRequestOptions };