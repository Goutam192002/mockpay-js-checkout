---
sidebar_position: 1
id: intro
slug: intro
---

# What is Mockpay?

Mockpay is mock payment gateway - meaning it isn't real and will not process real payments unlike Razorpay or other payment gateways.

There is no integration with any bank aquirer for processing payments. Only if dealing with banks was that easy :wink:

It simply a library developers can integrate with your showcase projects.

**Example:** You are building an e-commerce website and want to integrate payments. But real payment gateways are complex to understand and you
have to fill in lengthy forms to be able to get access to their sandboxes.

*So we made this library so that you can get started in no time.*

## Getting Started

Get started by downloading the [Postman Collection](pathname://./assets/mockpay.postman_collection.json).

The postman collection provides APIs for creating user, generating API Keys and retreiving transactions.

To integrate checkout library add the following code to your body.
```javascript
<script src="https://raw.githubusercontent.com/Goutam192002/mockpay-js-checkout/master/checkout.js"></script>
```

## Accepting payments

Add this piece of code in the function where you want the payments to be processed.
```javascript
var mockpay = new MockPay({
    onFailure: (data) => {
        // do something when payment fails (eg: show error dialog)
    },
    onSuccess: (data) => {
        // do something when payment succeeds (eg: show success message)
    },
    keyId: 'mockpay_xxxxxx', // replace with your own mockpay key id
    amount: 5, // defaults to USD
    customer: {
        name: form.children[0].value, // customer name here (optional)
        email: form.children[1].value, // customer email here (optional)
    }
});
mockpay.open();
```

## Live Demo

View a live demo at https://demo-mockpay.goutambseervi.tech

Cheers!
