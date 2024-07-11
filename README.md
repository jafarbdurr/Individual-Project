[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15255688&assignment_repo_type=AssignmentRepo)
# Individual Project Phase 2

PassMan API Documentation

## Models
_User_
- email : string (required)
- password : string (required)
- role : string (required)
- status : string(required)

_Order_
- OrderId : string (required)
- UsserId : integer (required)
- amount : integer (required)

_SavedPassword_
- name : string
- password : string
- reminder : string
- userId : string

List of available endpoints:

- `GET /`
- `POST /register`
- `POST /login`
- `GET /google-login`
- `GET /get-user-data`
- `GET /generatePassword/:length`
- `POST /savePassword`
- `GET /savePassword`
- `GET /savePassword/:id`
- `DELETE /savepassword/:id`
- `GET /users/me`
- `PATCH /users/me/upgrade`
- `GET /payment/midtrans/initiate`
- `POST /aigenerate`

&nbsp;

## 1. GET /

_Response (200 - ok)_

```
Hello world
```

## 2. POST /register
_Request:_

- body:
```json
{
  "email": "string",
  "password": "string",
}
```

_Response (201 - Created)_

```json
{
    "email": "string"
}
```

## 3. POST /login
_Request:_

- body:
```json
{
  "email": "string",
  "password": "string",
}
```

_Response (200 - ok)_

```json
{
    "message": "string"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Password wrong"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Email wrong"
}
```

## 3. GET /verify

_Response (200 - ok)_

```json
{
    "access_token": "string""
}
```

## 4. GET /get-user-data
_Response (200 - ok)_

```json
{
    "email": "string",
    "password": "string",
    "role": "string",
    "status": "status"
}
```

## 5. GET /generatePassword/:length
Request:
- params
_Response (200 - ok)_

```json
{
    "result": "string",
}
```

## 6. POST /savePassword
Request:
- req.user.id

_Response (200 - ok)_

```json
{
    "result": "string",
}
```

## 7. GET /savePassword
Request:
- req.user.id

_Response (200 - ok)_

```json
{
    "name": "string",
    "password": "string"
}
```

## 8. GET /savePassword/:id
 Request:
- params

_Response (200 - ok)_
```json
{
    "result": "string",
}
```

## 9. DELETE /savePassword/:id
 Request:
- params

_Response (200 - ok)_
```json
{
    "message": "succes delete password",
}
```




