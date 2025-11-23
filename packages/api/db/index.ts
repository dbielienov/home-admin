import { drizzle } from 'drizzle-orm/neon-http';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
	path: path.join(__dirname, '..', '.env'),
});

export const db = drizzle(process.env.DATABASE_URL!);
