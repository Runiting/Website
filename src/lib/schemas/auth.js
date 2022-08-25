import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email address required' })
        .email({ message: 'Email address invalid' }),
    password: z
        .string({ required_error: 'Password required' })
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(20, { message: 'Password must be at most 20 characters' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/gm, { message: 'Password must contain at least one lowercase letter, one uppercase letter and one number' }),
})

export const signUpSchema = z.object({
    email: z
        .string({ required_error: 'Email address required' })
        .email({ message: 'Email address invalid' }),
    firstname: z
        .string({ required_error: 'Firstname required' })
        .min(1, { message: 'Firstname required' }),
    lastname: z
        .string({ required_error: 'Lastname required' })
        .min(1, { message: 'Lastname required' }),
    password: z
        .string({ required_error: 'Password required' })
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(20, { message: 'Password must be at most 20 characters' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/gm, { message: 'Password must contain at least one lowercase letter, one uppercase letter and one number' }),
})