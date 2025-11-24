import * as z from 'zod';

export const signinSchema = z.object({
  email: z.string().min(5).max(32),
  password: z.string().min(8).max(100),
});

export type SigninValues = z.infer<typeof signinSchema>;