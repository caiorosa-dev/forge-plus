import { useState } from 'react';
import { Modpack, LocalModpack } from "../../types/modpack";
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useListener } from '../hooks/use-listener';
import { useQueryClient } from '@tanstack/react-query';

interface SelectedModpackSectionProps {
	modpack: Modpack;
	hasInstance: boolean;
	installedModpack?: LocalModpack;
}

export function SelectedModpackSection({ modpack, installedModpack, hasInstance }: SelectedModpackSectionProps) {
	const queryClient = useQueryClient();
	const [syncProgress, setSyncProgress] = useState(0);
	const [isSyncing, setIsSyncing] = useState(false);

	const isInstalled = hasInstance;
	const isSynced = !!installedModpack && isInstalled;
	const isUpdated = isSynced && installedModpack?.installedVersionTag === modpack.currentVersionTag;

	useListener<number>('modpack:sync:progress', (event, data) => {
		setSyncProgress(data);
		if (data === 100) {
			setIsSyncing(false);
		}
	});

	useListener('modpack:sync:success', () => {
		setIsSyncing(false);
		setSyncProgress(0);
		queryClient.invalidateQueries({ queryKey: ['local-modpacks'] });
	});

	function handleInstallModpack() {
		setIsSyncing(true);

		window.api.send('modpack:sync', modpack.id);
	}

	return (
		<section className='bg-slate-900 p-4 rounded-lg flex flex-col gap-6'>
			<header className='flex gap-2 items-center'>
				<p className='text-white text-lg'>{modpack.displayName}</p>
				{!isInstalled && (
					<Badge variant='slate'>
						Não instalado
					</Badge>
				)}
				{!isSynced && (
					<Badge variant='red'>
						Não sincronizado
					</Badge>
				)}
				{isSynced && !isUpdated && (
					<Badge variant='amber'>
						Atualização disponível
					</Badge>
				)}
				{isSynced && isUpdated && (
					<Badge variant='green'>
						Atualizado
					</Badge>
				)}
			</header>
			<p className='text-slate-200'>{modpack.description}</p>
			<div className='text-slate-400 text-sm'>
				<p><strong>Versão do Minecraft:</strong> {modpack.minecraftVersion}</p>
				<p><strong>Versão do Forge:</strong> {modpack.forgeVersion}</p>
				<p><strong>Versão recomendada:</strong> {modpack.currentVersionTag}</p>
			</div>
			<Button onClick={handleInstallModpack} disabled={isSyncing}>
				Instalar {isSyncing && <span className='text-xs'>{syncProgress.toFixed(2)}%</span>}
			</Button>
		</section>
	)
}