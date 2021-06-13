---
id: generate-keys
---

# Generating API Keys

### What are API Keys?

As a developer you will be integrating 3rd-party services into your application. To authenticate the user we user API keys.
You might ask why not just use JWT tokens which we generated in the last step?

This is because it is generally a bad idea to use auth tokens to identify users when using indirectly i.e via client SDK or server SDK

So generally, third-parties generate a set of API Keys usually a public key and secret key which you can use in your application.

A public key like the name says can be exposed publicly, but the secret key cannot be exposed.


### How to generate an API Key?

You have to make a POST request at `https://api-mockpay.goutambseervi.tech/api-token`

Make sure you have set the `Authorization` header in the following format
```http request
Authorization: Bearer xxxxxx
```

Response:
```json
{ 
    "key_id": "mockpay_DJA0A82d9Owz", // this is the public key, you will add in checkout.js
    "key_secret": "RVdrTUaw9fzQpfFRImI4uapENPWWUTi5" // this is secret, required on server side.
}
```

