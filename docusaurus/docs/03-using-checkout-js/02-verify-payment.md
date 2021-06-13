---
id: verify-payment
---

# Verifying payments

Most payment gateways include a method to verify if the payment was "actually processed".
A common method is to generate a HMAC signature and send it via response.

Then the client can verify it by computing the HMAC again using it's own secret key.
If both match then the verification is sucessfull.

## How to verify payment?

We recommend you to perform the HMAC verification on a server.
In your sucess callback make a HTTP request to your server with your success response and
your server can verify the transaction.

```javascript
generated_signature = hmac_sha256(txn_id + "|" + api_key, api_secret); // compute your hmac-256
if (generated_signature == razorpay_signature) {
    // payment is successful
}
```
