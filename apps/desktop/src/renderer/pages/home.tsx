import { Button, ButtonIcon } from '../components/ui/button';

import { Footer } from '../components/layout/footer';

import { RefreshCcw } from 'lucide-react';
import { ModpackList } from '../components/modpack-list';
import { useState } from 'react';
import { useLocalModpacks } from '../hooks/electron-integration/use-local-modpacks';
import { useModpacks } from '../hooks/api/use-modpacks';
import { useQueryClient } from '@tanstack/react-query';
import { SelectedModpackSection } from '../components/selected-modpack-section';
import { useCurseForgeInstances } from '../hooks/electron-integration/use-curse-forge-instances';
import { Header } from '../components/layout/header';

export function HomePage() {
	const queryClient = useQueryClient();
	const [selectedModpackId, setSelectedModpackId] = useState<string | undefined>(undefined);

	const { modpacks, isLoading: isLoadingModpacks } = useModpacks();
	const { installedModpacks, isLoading: isLoadingInstalledModpacks } = useLocalModpacks();
	const { instances } = useCurseForgeInstances();

	function handleSelectModpack(modpackId: string) {
		if (selectedModpackId === modpackId) {
			setSelectedModpackId(undefined);
			return;
		}

		setSelectedModpackId(modpackId);
	}

	function handleRefreshModpacks() {
		queryClient.invalidateQueries({ queryKey: ['modpacks'] });
		queryClient.invalidateQueries({ queryKey: ['local-modpacks'] });
	}

	return (
		<main className="min-h-screen h-full max-w-[100vw] w-full bg-slate-950 grid grid-rows-[auto_1fr_auto] gap-4">
			<Header />
			<div className='grid grid-cols-2 gap-8 px-8'>
				<section className='bg-slate-900 p-4 rounded-lg flex flex-col gap-6'>
					<header className='flex justify-between items-center'>
						<p className='text-slate-300 text-sm'>
							Modpacks disponíveis
						</p>
						<Button onClick={handleRefreshModpacks} size='icon' variant='ghost'>
							<ButtonIcon icon={RefreshCcw} isLoading={false} />
						</Button>
					</header>
					<ModpackList
						modpacks={modpacks}
						instances={instances}
						installedModpacks={installedModpacks}
						onSelectModpack={handleSelectModpack}
						selectedModpackId={selectedModpackId}
						isLoading={isLoadingModpacks || isLoadingInstalledModpacks}
					/>
				</section>
				{!selectedModpackId && (
					<section className='p-4 rounded-lg border border-slate-800 border-dashed flex justify-center items-center'>
						<p className='text-slate-400 text-sm'>
							Nenhum modpack selecionado
						</p>
					</section>
				)}
				{selectedModpackId && (
					<SelectedModpackSection
						modpack={modpacks.find(modpack => modpack.id === selectedModpackId)!}
						installedModpack={installedModpacks.find(localModpack => localModpack.modpackId === selectedModpackId)}
						hasInstance={instances.includes(modpacks.find(modpack => modpack.id === selectedModpackId)!.curseForgeInstanceName)}
					/>
				)}
			</div>
			<Footer />
		</main>
	);
}