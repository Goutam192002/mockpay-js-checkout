---
id: transactions
---

# Transactions

### What does this API do?
The Transactions API provides a log of transactions for a user. 

### How to use the API?
You have to make a GET request at `https://api-mockpay.goutambseervi.tech/transactions/`

Remember to add the authentication header as follows
```http request
Authorization: Bearer xxxxxxxxx
```

Response:
```json
[
  {
    "txn_id": "txn_xxxxxxxx",
    "mockpay_signature": "a_random_string",
    "amount": 500,
    "api_key": "mockpay_xxxxx",
    "customer_name": "your_customer_name",
    "customer_email": "your_customer_email",
    "status": "success" // or "failure"
  }
]
```
