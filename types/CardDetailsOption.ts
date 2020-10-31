interface CardDetailsOption {
    cardHolder: string;
    cardNumber: string | number;
    expiryMonth: string;
    expiryYear: string;
    cvvNumber?: string | number;
}

export { CardDetailsOption };