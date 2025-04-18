import { z } from "zod"

const create_user = z.object({
    email: z.string()
        .min(14, 'The email should not be less than 13 characters')
        .max(25, 'The email should not be longer than 25 characters')
        .email('Email is not correct'),
    password: z.string()
        .min(8, 'The password should not be less than 8 characters')
        .max(30, 'The password should not be longer than 30 characters'),
    name: z.string()
        .min(2, 'The password should not be less than 8 characters')
        .max(30, 'The password should not be longer than 30 characters')
        .regex(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]+$/, "Only English and Cyrillic can be used. Spaces and special characters is banned"),
    surname: z.string()
        .min(2, 'The password should not be less than 8 characters')
        .max(30, 'The password should not be longer than 30 characters')
        .regex(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]+$/, "Only English and Cyrillic can be used. Spaces and special characters is banned")
})

const change_user_personal_data = z.object({
    username: z.string()
        .min(4, 'The email should not be less than 4 characters')
        .max(25, 'The email should not be longer than 25 characters')
        .regex(/^[A-Za-z]+$/, "Only English can be used. Spaces and special characters is banned")
        .optional(),
    email: z.string()
        .min(14, 'The email should not be less than 13 characters')
        .max(25, 'The email should not be longer than 25 characters')
        .email('Email is not correct')
        .optional(),
    name: z.string()
        .min(2, 'The password should not be less than 8 characters')
        .max(30, 'The password should not be longer than 30 characters')
        .regex(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]+$/, "Only English and Cyrillic can be used. Spaces and special characters is banned")
        .optional(),
    surname: z.string()
        .min(2, 'The password should not be less than 8 characters')
        .max(30, 'The password should not be longer than 30 characters')
        .regex(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]+$/, "Only English and Cyrillic can be used. Spaces and special characters is banned")
        .optional(),
    description: z.string()
        .max(255, 'The password should not be longer than 30 characters')
        .optional()
})

export const schema = {
    create_user,
    change_user_personal_data
};