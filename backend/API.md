# Server API Documentation

*При помилці сервер завжди повертає _message_

## /USER

### /user/create_user
Request body: *name, surname, email, password*

Response data: user

### /user/get_user
Request body: *id*

Response data: user

### /user/change_user_avatar
Request header: *authorization* (Bearer Token)
Request body: *file*

Response data: *message, avatar_filename*

### /user/change_user_personal_data
Request header: *authorization* (Bearer Token)
Request body: *username, name, surname, description* (Примітка: у тіло запиту можна передавати навіть 1 поле)

Response data: *message, user*



## /AUTH

### /auth/login
Request body: *email, password*

Response data: *user, token, auth_message*

### /auth/protected
Request header: *authorization* (Bearer Token)

Response data: *user (id, iat, exp), is_login*



## /STATIC
Адрес, за яким можна отримати статичні файли (зображення)

Застосування:  
```html 
<img src={`${backendUrl}/static`} />
```

### /profile_avatars/image_filename
Наприклад: /profile_avatars/user_avatar-date-12345231-user_id-1.png