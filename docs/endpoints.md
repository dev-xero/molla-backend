# Documentation: Endpoints

Molla's backend provides a set of endpoints for communicating with the server. They're listed below.

## Endpoints

1. GET `/`
2. GET `/products`
3. GET `/product/single?id=someID`
4. POST `/auth/sign-in`
5. POST `/auth/sign-up`

## Home `/`

This is the base endpoint, all requests made to this endpoint should return a 200 OK.

request:

```url
GET /
```

response (success):

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