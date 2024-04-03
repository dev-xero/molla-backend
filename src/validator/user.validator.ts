import { z } from 'zod'

export const userSignUpZodSchema = z.object({
    username: z
        .string({ required_error: 'Provide a username to sign-up.' })
        .min(4, { message: 'Username must be at least 4 characters long.' })
        .max(24, { message: 'Username must not exceed 24 characters.' }),
    password: z
        .string({ required_error: 'Provide a password to sign-up.' })
        .min(4, { message: 'Min password length is 4 characters.' })
        .max(24, { message: 'Max password length is 24 characters.' }),
    email: z
        .string({ required_error: 'Provide an email address to sign-up.' })
        .email({ message: 'Provide a valid email address.' }),
    isAdmin: z.enum(['true', 'false']).transform((value) => value === 'true'), // weirdly enough zod strings don't read "false" as false
})

export const userSignInZodSchema = z.object({
    email: z
        .string({ required_error: 'Provide an email address to sign-in.' })
        .email({ message: 'Provide a valid email address.' }),
    password: z
        .string({ required_error: 'Provide a password to sign-in.' })
        .min(4, { message: 'Min password length is 4 characters.' })
        .max(24, { message: 'Max password length is 24 characters.' }),
})
