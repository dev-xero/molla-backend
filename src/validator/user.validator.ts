import { z } from 'zod'

export const userZodSchema = z.object({
    username: z
        .string()
        .min(4, { message: 'Username must be at least 4 characters long.' })
        .max(24, { message: 'Username must not exceed 24 characters.' }),
    password: z
        .string()
        .min(4, { message: 'Min password length is 4 characters.' })
        .max(24, { message: 'Max password length is 24 characters.' }),
    email: z.string().email({ message: 'Provide a valid email address.' }),
    isAdmin: z.enum(['true', 'false']).transform((value) => value === 'true'), // weirdly enough zod strings don't read "false" as false
})
