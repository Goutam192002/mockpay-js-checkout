---
id: intro
---

# Introduction

### How to include checkout.js into you app?
Add this line to your html body
```html
<script src="https://raw.githubusercontent.com/Goutam192002/mockpay-js-checkout/master/checkout.js"></script>
```

### Using checkout
Inside your app create a mockpay instance as follows
```javascript
var mockpay = new MockPay({
    onFailure: (data) => {
        // do something when payment fails
    },
    onSuccess: (data) => {
        // do something when payment succeeds
    },
    keyId: 'mockpay_jUOwXX1cIh80', // Your own key_id
    amount: 5, // amount
    customer: {
        name: form.children[0].value, // Customer name (optional)
        email: form.children[1].value, // Customer email (optional)
    }
});
```

Add this line of code when you want to show the checkout dialog.
**Example:** When user clicks on checkout button.
```javascript
mockpay.open()
```

Success data schema:
```json
{
  "txn_id": "txn_xxxxxxxx",
  "mockpay_signature": "some_random_generated_hmac",
  "amount": 5,
  "api_key": "mockpay_xxxxx",
  "status": "success",
  "customer_name": "your_customer_name",
  "customer_email": "your_customer_email"
}
```

Failure data schema:
```json
{
  "success": false
}
```
