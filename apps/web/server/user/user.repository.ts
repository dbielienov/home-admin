'use server';

import { db, schema } from '@repo/api/db';
import { eq } from 'drizzle-orm';
import { NewUser, User } from './user.types';

export async function getUsersRepository() {
	return db.select().from(schema.user);
}

export async function createUserRepository(data: NewUser): Promise<User> {
	const [newUser] = await db
		.insert(schema.user)
		.values({ ...data })
		.returning();
	return newUser;
}

export async function updateUserRepository(id: string, data: Partial<NewUser>): Promise<User> {
	const [updatedUser] = await db
		.update(schema.user)
		.set({ ...data })
		.returning();
	return updatedUser;
}

export async function deleteUserRepository(id: string): Promise<User> {
	const [deletedUser] = await db.delete(schema.user).where(eq(schema.user.id, id)).returning();
	return deletedUser;
}

export async function getUserByEmailRepository(email: string): Promise<User | undefined> {
	const [foundUser] = await db.select().from(schema.user).where(eq(schema.user.email, email));
	return foundUser;
}
