# Server API Documentation



## /USER

### /user/create_user
Request body: _name, surname, email, password_
Response data: user

### /user/get_user
Request body: _id_
Response data: user


## /AUTH

### /auth/login
Request body: _email, password_
Response data: user, token