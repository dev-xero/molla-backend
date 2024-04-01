import { z } from 'zod'

export const userZodSchema = z.object({
    username: z.string().min(4).max(24),
    password: z.string().min(4).max(24),
    email: z.string().email(),
    isAdmin: z.enum(['true', 'false']).transform((value) => value === 'true'), // weirdly enough zod strings don't read "false" as false
})
