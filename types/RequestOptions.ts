/*
* Default options that are required for every request made to the wirecard server
*/
interface RequestOptions {
    mode?: number;
    applicationUID?: string;
    terminal?: string;
    merchantReference?: string;
}

export { RequestOptions };