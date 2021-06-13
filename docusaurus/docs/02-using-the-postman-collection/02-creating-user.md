---
id: creating-user
---

# Creating a user

### Why is this required?
Creating a user is required for the server to identify different merchants.

### How to create user?
You have to make a simple POST request at `https://api-mockpay.goutambseervi.tech/users/`

Request format:
```json
{
  "username": "yourownusername",
  "password": "yourownpassword",
  "confirm_password": "yourownpassword"
}
```

Response format:
```json
{
    "username": "yourownusername",
    "merchant_id": "merchant_yIkkai8omU9wMt13qq", // This merchant id is unique to every user
    "balance": 0
}
```

Example:

```shell script
curl -X POST "https://api-mockpay.goutambseervi.tech/users/" -d "username=yourownusername&password=yourownpassword&confirm_password=yourownpassword"
```
