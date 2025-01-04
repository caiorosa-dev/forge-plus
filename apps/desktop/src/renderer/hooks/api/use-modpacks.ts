import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../libs/api';
import { Modpack } from '../../../types/modpack';

export function useModpacks() {
	const { data, isFetching, error } = useQuery({
		queryKey: ['modpacks'],
		queryFn: async () => {
			const response = await apiClient.get<Modpack[]>('/modpacks')

			return response.data;
		},
		refetchInterval: false,
		refetchOnMount: false,
	});

	return {
		modpacks: data || [],
		isLoading: isFetching,
		error,
	}
}