import { z } from 'zod'

export const userZodSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string(),
    isAdmin: z.enum(['true', 'false']).transform((value) => value === 'true'), // weirdly enough zod strings don't read "false" as false
})
