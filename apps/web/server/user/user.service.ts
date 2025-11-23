'use server';

import { DbError } from '@/lib/errors/DbError';
import {
	getUsersRepository,
	createUserRepository,
	updateUserRepository,
	deleteUserRepository,
} from './user.repository';
import { NewUser } from './user.types';

export async function getUsers() {
	try {
		return await getUsersRepository();
	} catch (error) {
		console.error('getUsers error:', error);
		throw new DbError('Failed to fetch users', 500);
	}
}

export async function createUser(data: NewUser) {
	try {
		const newUser = await createUserRepository(data);
		return newUser;
	} catch (error) {
		console.error('createUser error:', error);
		throw new DbError('Failed to create user', 500);
	}
}

export async function updateUser(id: string, data: Partial<NewUser>) {
	try {
		const updatedUser = await updateUserRepository(id, data);
		return updatedUser;
	} catch (error) {
		console.error('updateUser error:', error);
		throw new DbError('Failed to update user', 500);
	}
}

export async function deleteUser(id: string) {
	try {
		const deletedUser = await deleteUserRepository(id);
		return deletedUser;
	} catch (error) {
		console.error('deleteUser error:', error);
		throw new DbError('Failed to delete user', 500);
	}
}
