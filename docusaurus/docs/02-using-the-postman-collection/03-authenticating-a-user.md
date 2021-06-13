---
id: authenticate-user
---

# Authenticate user


### Why authentication?

Consider this as your payment gateway dashboard login page. Every time you want to check your transactions or generate
your api key you would have to first verify if it's really you. 

This is what this API does..it verifies you by asking you to enter your username/password.
If the match is sucessfull..it returns a JWT Token else, it'll ask you to try again.

### How to authenticate?
You have to make a POST request at `https://api-mockpay.goutambseervi.tech/auth-token/`

Request format:
```json
{
  "username": "yourownusername",
  "password": "yourownpassword"
}
```

Response format:
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyMzY1ODU3NCwianRpIjoiNTgyOTg2ZWMwODkzNGU3NWIzNWNmMjkxNDNhNjc3YTEiLCJ1c2VyX2lkIjoyfQ.6nYPbB76QvYc_4p7OeQY_ANMq2Qz7E_XRr_JwJufm4Q",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzNTcyNDc0LCJqdGkiOiIwNGNlNWYyNjA4YjA0N2NhOWY1MjczMDVhZWJkYzdmOSIsInVzZXJfaWQiOjJ9.nkVIQsc2A4-nhHDr8CCQWQNO8C9Ap1L3-MtxiPPUYVk"
}
```


### About JWT
A JWT Token stands for JSON Web Token and consists of an access token and refresh token.
The access token has an expiry...here it is 60 minutes. After 60 minutes the access token becomes invalid.
The refresh-token API can be used to generate new access tokens.
