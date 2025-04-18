# Server API Documentation

*При помилці сервер завжди повертає _message_

## :8000

### /user/create_user
Request body: *name, surname, email, password*

Response data: user

### /user/get
Request query: *id, email*

Response data: user

*Можна передавати навіть 1 параментр пошуку (наприклад: http://localhost:8000/user/get?email=sampleemail@gmail.com)

### /user/change_user_personal_data
Request header: *authorization* (Bearer Token)

Request body: *username, name, surname, description* (Примітка: у тіло запиту можна передавати навіть 1 поле)

Response data: *message, user*



## :9000

### /auth/login
Request body: *email, password*

Response data: *user, token, auth_message*

### /auth/protected
Request header: *authorization* (Bearer Token)

Response data: *user (id, iat, exp), is_login*



## :7000

### /user/change_avatar/:id
Request header: *authorization* (Bearer Token)

Request params: *id*

Request body: *file*

Response data: *message, avatar_filename*

### /static/profile_avatars/<image_filename>
Адрес, за яким можна отримати статичні файли (зображення)

Застосування:  
```html 
<img src={`${backendUrl}/static`} />
```