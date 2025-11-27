import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

import { ZodError, z } from 'zod';

const stringBoolean = z.coerce
	.string()
	.transform((val) => {
		return val === 'true';
	})
	.default(false);

const EnvSchema = z.object({
	NODE_ENV: z.string().default('development'),
	DATABASE_URL: z.string(),
	BETTER_AUTH_SECRET: z.string(),
	BETTER_AUTH_URL: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	DB_SCHEME: z.string(),
	DB_USER: z.string(),
	DB_PASSWORD: z.string(),
	DB_HOST: z.string(),
	DB_PORT: z.coerce.number(),
	DB_NAME: z.string(),
	DB_OPTIONS: z.string(),
	DB_MIGRATING: stringBoolean,
	DB_SEEDING: stringBoolean,
	RESEND_API_KEY: z.string(),
	ARCJET_KEY: z.string(),
	ARCJET_ENV: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;


expand(config({
	path: './.env',
}));

try {
	EnvSchema.parse(process.env);
} catch (error) {
	if (error instanceof ZodError) {
		let message = 'Missing required values in .env:\n';
		error.issues.forEach((issue) => {
			message += String(issue.path[0]) + '\n';
		});
		const e = new Error(message);
		e.stack = '';
		throw e;
	} else {
		console.error(error);
	}
}

export default EnvSchema.parse(process.env);
