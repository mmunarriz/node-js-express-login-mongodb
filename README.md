# Node.js Express and MongoDB: Login and Registration example:

## Instrucciones:

Instalar dependencias: npm i

Ejecutar: npm start

## Ejemplos:

Test All:
GET http://localhost:8080/api/test/all

Signup:
POST http://localhost:8080/api/auth/signup

    Body:

    {
        "username": "mod",
        "email": "mod@gmail.com",
        "password": "123456",
        "roles": ["user", "moderator"]
    }

Test User: (protected)
GET http://localhost:8080/api/test/user

Signin:
POST http://localhost:8080/api/auth/signin

    Body:

    {
        "username": "mod",
        "password": "123456"
    }

Test Mod: (protected)
GET http://localhost:8080/api/test/mod

Test Admin: (protected)
GET http://localhost:8080/api/test/admin

Signout:
POST http://localhost:8080/api/auth/signout
