import { apiClient } from '@/lib/axios';
import { Session } from './types';

export const fetchSession = async (): Promise<Session | null> => {
	const { data } = await apiClient.get('/auth/session');
	return data as Session | null;
};
