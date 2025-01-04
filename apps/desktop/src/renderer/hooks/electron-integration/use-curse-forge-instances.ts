import { useQuery } from '@tanstack/react-query';

export function useCurseForgeInstances() {
	const { data, isFetching, error } = useQuery({
		queryKey: ['curse-forge:instances'],
		queryFn: () => {
			return window.api.invoke<string[]>('curse-forge:get-instances');
		},
		refetchInterval: false,
	});

	return {
		instances: data || [],
		isLoading: isFetching,
		error,
	}
}