import * as z from 'zod';

export const signupSchema = z
	.object({
		name: z.string().min(3, { message: 'Name must be at least 3 characters' }).max(32),
		email: z.email({ message: 'Invalid email address' }),
		password: z.string().min(8, { message: 'Password must be at least 8 characters' }).max(100),
		confirmPassword: z.string().min(8, { message: 'Confirm password is required' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export type SignupValues = z.infer<typeof signupSchema>;
