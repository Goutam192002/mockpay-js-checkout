---
id: user-profile
---

# User Profile

### What does this API provider?

The User Profile API provides a basic summary of the user. The balance, merchant id etc.

### How to use the API?

You have to make a GET request at `https://api-mockpay.goutambseervi.tech/users/me`

Remember to add your auth-token in the header as follows
```http request
Authorization: Bearer xxxxxx
``` 

Response:
```json
{
    "username": "testuser",
    "merchant_id": "merchant_nAR87qRUYKmxgsyOVF",
    "balance": 0
}
```
