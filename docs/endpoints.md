# Endpoints

Molla's backend provides a set of endpoints for communicating with the server. They're listed below.

## Endpoints

1. GET `/`
2. GET `/products`
3. GET `/product/single?id=someID`
4. POST `/auth/sign-in`
5. POST `/auth/sign-up`

## Home `/`

This is the base endpoint, all requests made to this endpoint should return a 200 OK.

### Request:

```url
[GET] /
```

### Response (success):

```json
{
    "message": "Welcome to Molla's backend API.",
    "success": true,
    "code": 200,
    "payload": null
}
```

Accessing undefined endpoints responds with a 404 Not Found.

```json
{
    "message": "Undefined endpoint accessed.",
    "success": false,
    "code": 404,
    "payload": null
}
```

## All Products `/products`

Retrieves all products from the database, responds with a 200 OK.

### Request:

```url
[GET] /products
```

### Response (success):

```json
{
    "message": "GET all products.",
    "success": true,
    "code": 200,
    "payload": "productsArray"
}
```

## Single Product `/products/single?id=someID`

Retrieves a single  product from the database, responds with a 200 OK.

request:

### Request:

```url
[GET] /products/single?id=someID
```

### Response (success):

```json
{
    "message": "GET product by an id.",
    "success": true,
    "code": 200,
    "payload": "productObj"
}
```

### Response (failure):

```json
{
    "message": "Product with that id not found.",
    "success": false,
    "code": 400,
    "payload": null
}
```

## SignUp `auth/sign-up`

Creates a new user and returns an authentication token.

### Request body:

The request body most contain these fields to create a new user.

```json
{
    "username": "usr",
    "email": "usr@root.ssh",
    "password": "rootusr",
    "isAdmin": "true"
}
```

### Response (success):

```json
{
    "message": "Successfully created new user.",
    "success": true,
    "code": 201,
    "payload": {
        "user": {
            "username": "usr",
            "email": "usr@root.ssh",
            "isAdmin": true,
            "_id": "660dea845a64312631b0bc90",
            "__v": 0
        },
        "token": "jwt-token"
    }
}
```

### Response (failure):

The server will respond with an error message describing why the request failed. An example response may be:

```json
{
    "message": "A user with those credentials already exists.",
    "success": false,
    "code": 400,
    "payload": null
}
```

## Sign In `/auth/sign-in`

Signing-in requires the email address and the matching password for the account if it exists.

### Request body:

```json
{
    "email": "usr@root.ssh",
    "password": "rootusr"
}
```

### Response (success):

```json
{
    "message": "Successfully signed-in user.",
    "success": true,
    "code": 200,
    "payload": {
        "user": "userObj",
        "token": "jwt-token"
    }
}
```

### Response (failure):

On event that the password doesn't match or the account doesn't exist or any other possible error, the server responds appropriately. An example response:

```json
{
    "message": "Passwords mismatch.",
    "success": false,
    "code": 401,
    "payload": null
}
```
