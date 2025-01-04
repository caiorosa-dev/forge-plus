import { useQuery } from '@tanstack/react-query';
import { LocalModpack } from '../../../types/modpack';

export function useLocalModpacks() {
	const { data, isFetching, error } = useQuery({
		queryKey: ['local-modpacks'],
		queryFn: () => {
			return window.api.invoke<LocalModpack[]>('local-modpacks:get-all');
		},
		refetchInterval: false,
	});

	return {
		installedModpacks: data || [],
		isLoading: isFetching,
		error,
	}
}