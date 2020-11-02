"use strict";
// Dependencies
const soap = require('soap');
const xmlbuilder = require('xmlbuilder');

// SOAP CLIENT OPTIONS
const SOAP_CLIENT_OPTIONS = {
    overridePromiseSuffix: 'Promise' };

let WirecardEnterprise = function(options = {}) {
    this._options = {
        MERCHANT_UID: options.merchantUID,
        APPLICATION_UID: options.applicationUID,
        TERMINAL_ID: options.terminalID,
        WSDL_URL: 'https://api.mygateglobal.com/api/?wsdl',
        MODE: options.mode || 0
    };

    if (!this._options.MERCHANT_UID)
        throw Error('ERROR: MERCHANT ID NOT PROVIDED.');
    if (!this._options.APPLICATION_UID)
        throw Error('ERROR: APPLICATION ID NOT PROVIDED.');
}

WirecardEnterprise.prototype._send = async function (data, actionType, callback) {
    if (data) {
        data = {xmlField: { 
            applicationUID: this._options.APPLICATION_UID,
            terminal: this._options.TERMINAL_ID,
            ...data
        }};

        let isAddTransactionMode = actionType === 1 || actionType === 14;
        data.xmlField.mode = isAddTransactionMode ? (this._options.MODE || 1) : undefined;

        if (actionType === 21) {
            delete data.xmlField.terminal;
            if (data.xmlField.cardDetails && data.xmlField.cardDetails.cvvNumber !== undefined)
                delete data.xmlField.cardDetails.cvvNumber;
        }
        
        if (!this.SOAP_CLIENT)
            this.SOAP_CLIENT = await soap.createClientAsync(this._options.WSDL_URL, SOAP_CLIENT_OPTIONS);
        this.SOAP_CLIENT.addSoapHeader(this._createSoapHeader(actionType));

        this.SOAP_CLIENT.execRequestPromise(this._toXML(data))
            .then((response) => {
                response = response ? response[0] : undefined;
                if (response) {
                    if (!response.errors) {
                        callback(null, response);
                    } else {
                        if (response.errors.constructor === Object) {
                            callback(response.errors.error[0].description);
                        } else if (response.errors.constructor === Array) {
                            callback(response.errors[0].error[0].description, null);
                        } else {
                            callback(response.errors);
                        }
                    }
                } else {
                    callback('ERROR: REQUEST NOT FAILED BEFORE IT COULD BE COMPLETED.')
                }
            })
    } else {
        callback('ERROR: OPTIONS ARE NOT PROVIDED TO THE REQUEST.', null);
    }
}

WirecardEnterprise.prototype._createSoapHeader = function (actionType) {
    const soapHeaderCredentials = {authenticate: {
        merchantUID: this._options.MERCHANT_UID,
        merchantToken: this._options.MERCHANT_UID,
        actionTypeID: actionType
    }};

    return this._toXML(soapHeaderCredentials);
}

WirecardEnterprise.prototype._toXML = function (object = {}, options = {}) {
    return xmlbuilder.create(object, { headless: true, ...options }).end({ pretty: true });
}

/* The Authorise message creates a request to hold the requested amount and mark it as unavailable from the customer's card until it is either Captured or the hold terminates, thus rendering the amount available again */
WirecardEnterprise.prototype.authorise = function (options = {}) {
    return new Promise((resolve, reject) => {
        this._send(options, 1, function (error, authoriseResponse) {
            if (!error) {
                resolve(authoriseResponse);
            } else {
                reject(error);
            }
        });
    });
}

/* The Authorise – Reversal Message releases the hold that the Authorize placed on the customer's credit card funds. Use this service to reverse an unnecessary or undesired Authorisation. You can use full Authorise – Reversal only for an authorisation that has not been captured.*/
WirecardEnterprise.prototype.authoriseReversal = function (options = {}) {
    return new Promise((resolve, reject) => {
        this._send(options, 2, function (error, authoriseReversalResponse) {
            if (!error) {
                resolve(authoriseReversalResponse);
            } else {
                reject(error);
            }
        });
    });
}

/* When you are ready to fulfil a customer's order, Capture the Authorisation for that order. */
WirecardEnterprise.prototype.capture = function (options = {}) {
    return new Promise((resolve, reject) => {
        this._send(options, 3, function(error, captureResponse) {
            if (!error) {
                resolve(captureResponse);
            } else {
                reject(error);
            }
        });
    });
}

/* A sale is a bundled authorization and capture. You can use a Sale instead of a separate Authorise and Capture if there is no delay between taking a customer's order and shipping the goods. */
WirecardEnterprise.prototype.sale = function (options = {}) {
    return new Promise((resolve, reject) => {
        this._send(options, 5, function (error, saleResponse) {
            if (!error) {
                resolve(saleResponse);
            } else {
                reject(error);
            }
        });
    });
}

/*  A Follow-On Credit is linked to a Capture in the system. You can request multiple Follow-On Credits against a single Capture. This action would reverse a Capture – Action 3. */
WirecardEnterprise.prototype.creditCapture = function (options = {}) {
    return new Promise((resolve, reject) => {
        this._send(options, 4, function (error, creditCapureResponse) {
            if (!error) {
                resolve(creditCapureResponse);
            } else {
                reject(error);
            }
        });
    });
}

/* Credit Request messages are generated when a merchant wants to return the funds after  a transaction that has been captured (refund of a Sale - action 5). */
WirecardEnterprise.prototype.creditSale = function (options = {}) {
    return new Promise((resolve, reject) => {
        this._send(options, 12, function(error, creditSaleResponse) {
            if (!error) {
                resolve(error);
            } else {
                reject(error);
            }
        })
    });
}

/** This message is used to verify if the issuer and cardholder participates in 3D Secure program. */
WirecardEnterprise.prototype.tdsLookup = function(options = {}) {
    return new Promise((resolve, reject) => {
        this._send(options, 14, function (error, tdsLookupResponse) {
            if (!error) {
                resolve(tdsLookupResponse);
            } else {
                reject(error);
            }
        });
    });
}

WirecardEnterprise.prototype.tdsAuthenticare = function(options = {}) {
    return new Promise((resolve, reject) => {
        this._send(options, 15, function (error, tdsAuthenticateResponse) {
            if (!error) {
                resolve(tdsAuthenticateResponse);
            } else {
                reject(error);
            }
        });
    });
}

/** The Report request exposes console and internal database reporting via an API call and returns the data in an xml format. */
WirecardEnterprise.prototype.reports = function(options = {}) {
    return new Promise((resolve, reject) => {
        this._send(options, 19, (error, reportsResponse) => {
            if (!error) {
                resolve(reportsResponse);
            } else {
                reject(error);
            }
        })
    });
}

/** This message is used when creating a token */
WirecardEnterprise.prototype.createToken = function(options = {}) {
    return new Promise((resolve, reject) => {
        this._send(options, 21, (error, createTokenResponse) => {
            if (!error) {
                resolve(createTokenResponse);
            } else {
                reject(error);
            }
        })
    });
}

/** This message is used when reading a token */
WirecardEnterprise.prototype.readToken = function(options = {}) {
    return new Promise((resolve, reject) => {
        this._send(options, 22, (error, readTokenResponse) => {
            if (!error) {
                resolve(readTokenResponse);
            } else {
                reject(error);
            }
        })
    });
}

/** This message is used when updating a token */
WirecardEnterprise.prototype.updateToken = function(options = {}) {
    return new Promise((resolve, reject) => {
        this._send(options, 24, (error, updateTokenResponse) => {
            if (!error) {
                resolve(updateTokenResponse);
            } else {
                reject(error);
            }
        })
    });
}

/** This message is used when deleting a token */
WirecardEnterprise.prototype.deleteToken = function(options = {}) {
    return new Promise((resolve, reject) => {
        this._send(options, 23, (error, deleteTokenResponse) => {
            if (!error) {
                resolve(deleteTokenResponse);
            } else {
                reject(error);
            }
        })
    });
}

module.exports = { WirecardEnterprise };