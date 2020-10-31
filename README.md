# Wirecard Enterprise (JavaScript Package)
Wirecard Enterpise allows the developer to have control over the entire payment process. The [original API](https://developers.wirecard.co.za/enterprise.php) uses **XML** and **SOAP** for communication, making it hard to implement with JavaScript since in JavaScript we are mostly familiar with **JSON**, this package does the heavy lifting so you can focus more on your project.

# Intergration
## Preparation for testing your Enterprise implementation
For the purposes of testing you can use the following credentials
> Merchant UID: **F5785ECF-1EAE-40A0-9D37-93E2E8A4BAB3**

> Application ID: **3C5F80CB-F2DA-45D3-800D-A876E6258F17**

> Test Card (Visa Non-3D)

| Visa (Succesful)       | Visa (Declined)   |
| :------------- | :----------: |
|  Joan Soap  | Joan Soap  |
| 4111111111111111   | 4242424242424242 |
| Any future data for expiry month and year
| Any 3/4 digit number for CVV Number

> Test Card (Visa 3D-Enabled)

| Visa (Succesful)       | Visa (Declined)   |
| :------------- | :----------: |
|  Joan Soap  | Joan Soap  |
| 4000000000000002   | 5200000000000007 |
| Any future data for expiry month and year
| Any 3/4 digit number for CVV Number

**NB: Always be sure to use mode=0 for the purpose of testing when using live credentials**

When going live, these will need to be replaced by credentials issued to you by Wirecard.

For a more details explaination of the API check out the [offical API documentation](https://developers.wirecard.co.za/enterprise.php).

# Installation
### NPM
> npm i wirecard-enterprise --save
### YARN
> yarn add wirecard-enterpise

# Usage

```js
const wirecard = require('wirecard-enterpise');
```

## Authorise
The  Authorise message creates a request to hold the requested amount and mark it as unavailable from the customer's card until it is either Captured or the hold terminates, thus rendering the amount available again.
```js
wirecard.authorise(...options): Promise;
```

## Authorise - Reversal
The Authorise – Reversal Message releases the hold that the Authorize placed on the customer's credit card funds. Use this service to reverse an unnecessary or undesired Authorisation. You can use full Authorise – Reversal only for an authorisation that has not been captured.
```js
wirecard.authoriseReversal(...options): Promise;
```
## Capture

When you are ready to fulfil a customer's order, Capture the Authorisation for that order.
```js
wirecard.capture(...options): Promise
```

## Sale
A sale is a bundled authorization and capture. You can use a Sale instead of a separate Authorise and Capture if there is no delay between taking a customer's order and shipping the goods.

```js
wirecard.sale(...options): Promise;
```

## Credit Capture
A Follow-On Credit is linked to a Capture in the system. You can request multiple Follow-On Credits against a single Capture. This action would reverse a Capture – Action 3.

```js
wirecard.creditCapture(...options): Promise;
```

## 3DS Lookup
This message is used to verify if the issuer and cardholder participates in 3D Secure program.

```js
wirecard.tdsLookup(...options): Promise;
```

## 3DS Authenticate
This message is used direct the card holder to their banks authentication page where they will validate the transaction using their secret password.

```js
wirecard.tdsAuthenticate(...options): Promise;
```

## Credit Sale
Credit Request messages are generated when a merchant wants to return the funds after  a transaction that has been captured (refund of a Sale - action 5).

```js
wirecard.creditSale(...options): Promise;
```

## Reports
The Report request exposes console and internal database reporting via an API call.

```js
wirecard.reports(...options): Promise;
```

## Create Token
This method is used when creating a token.

```js
wirecard.createToken(...options): Promise;
```

## Read Token
This method is used when read a token.

```js
wirecard.readToken(...options): Promise;
```

## Update Token
This method is used when updating a token.

```js
wirecard.updateToken(...options): Promise;
```

## Delete Token
This method is used when deleting a token.

```js
wirecard.deleteToken(...options): Promise;
```

# Why?
When I got started with using Wirecard Enterprise to implement it to a project it took me a long while to do so, meant that project was slowed down because I needed to learn about it's implementation (with XML and SOAP) so hopefully this will help a fellow developer out there, since Wirecard Enterprise is a very powerful tool for online payments.
