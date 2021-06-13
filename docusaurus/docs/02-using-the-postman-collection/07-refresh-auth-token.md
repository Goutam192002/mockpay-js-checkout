---
id: refresh-token
---

# Refresh Token

### What is refresh token?
Like mentioned previously, JWT provides an access token with expiry and a refresh token.
You use refresh token to generate new access token once the exisitng one has required

### How to use the refresh token API?
You have to make a POST request at `https://api-mockpay.goutambseervi.tech`

Request:
```json
{
    "refresh": "YOUR_REFRESH_TOKEN"
}
```

Response:
```json
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIzNTcxNDg3LCJqdGkiOiJiOGE1MGU1YWUxZGU0YTQxYjM1MmRmNzMwZTcyZjA3OSIsInVzZXJfaWQiOjJ9.bLyBN62b8l-AQV_FZkAyltHTjVHgk9gKajcD5F2VgCw"
}
```
