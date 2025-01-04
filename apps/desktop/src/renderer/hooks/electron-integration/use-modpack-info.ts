import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useListener } from '../use-listener';

export function useModpackInfo(modpackId: string) {
	const [progress, setProgress] = useState(0);
	const { data, isLoading, error } = useQuery({
		queryKey: ['modpack-info', modpackId],
		queryFn: () => {
			return window.api.invoke('modpack:load-infos', modpackId);
		},
		refetchInterval: false,
	})

	useListener<number>('modpack:load-infos:progress', (event, progress: number) => {
		setProgress(progress);
	});

	return { projectInfos: data || [], isLoading, error, progress };
}