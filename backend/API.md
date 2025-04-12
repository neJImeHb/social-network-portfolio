# Server API Documentation

*При помилці сервер завжди повертає <u>_message_</u>

## /USER

### /user/create_user
Request body: <u>*name, surname, email, password*</u>

Response data: user

### /user/get_user
Request body: <u>*id*</u>

Response data: user

### /user/change_user_avatar
Request header: <u>*authorization*</u> (Bearer Token)

Request body: <u>*file*</u>

Response data: <u>*message, avatar_filename*</u>

### /user/change_user_personal_data
Request header: <u>*authorization*</u> (Bearer Token)

Request body: <u>*username, name, surname, description*</u> (Примітка: у тіло запиту можна передавати навіть 1 поле)

Response data: <u>*message, user*</u>



## /AUTH

### /auth/login
Request body: <u>*email, password*</u>

Response data: <u>*user, token, auth_message*</u>

### /auth/protected
Request header: <u>*authorization*</u> (Bearer Token)

Response data: <u>*user (id, iat, exp), is_login*</u>



## /STATIC
Адрес, за яким можна отримати статичні файли (зображення)
Застосування:  &lt;img src={`${backendUrl}/static`} /&gl;

### /profile_avatars/image_filename
Наприклад: /profile_avatars/user_avatar-date-12345231-user_id-1.png