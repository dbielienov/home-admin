import { useQuery } from '@tanstack/react-query';
import { fetchSession } from './session.api';

export const useSession = () => {
	return useQuery({
		queryKey: ['session'],
		queryFn: fetchSession,
		staleTime: 1000 * 60 * 5, // 5min cache
	});
};
