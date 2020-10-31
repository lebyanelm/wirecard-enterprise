import { RequestOptions } from './RequestOptions';
import { TransactionAuthOptions } from './TransactionAuthOptions';

interface CreditRequestOptions extends RequestOptions {
    transactionAuth: TransactionAuthOptions;
    amount: string | number;
}

export { CreditRequestOptions };