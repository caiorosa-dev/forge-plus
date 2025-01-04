import { DownloadCloud } from 'lucide-react';
import { Modpack, LocalModpack } from "../../types/modpack";
import { useModpackDownload } from '../context/modpack-download-context';
import { Badge } from './ui/badge';
import { Button, ButtonIcon } from './ui/button';
import ProgressBar from './ui/progress';

interface SelectedModpackSectionProps {
	modpack: Modpack;
	hasInstance: boolean;
	installedModpack?: LocalModpack;
}

export function SelectedModpackSection({ modpack, installedModpack, hasInstance }: SelectedModpackSectionProps) {
	const { installModpack, isWorking, isDownloading, loadInfosProgress } = useModpackDownload();

	const isInstalled = hasInstance;
	const isSynced = !!installedModpack && isInstalled;
	const isUpdated = isSynced && installedModpack?.installedVersionTag === modpack.currentVersionTag;

	function handleInstallModpack() {
		installModpack({
			modpackId: modpack.id,
			versionTag: modpack.currentVersionTag,
			loadToCache: !isSynced
		});
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
			{isWorking && !isDownloading && (
				<>
					<div className='flex justify-between items-center'>
						<p>Processando informações dos mods...</p>
						{loadInfosProgress && <p className='text-indigo-600 text-sm'>{loadInfosProgress.lastProjectName}</p>}
					</div>
					{loadInfosProgress && <ProgressBar label={`${loadInfosProgress.progress}%`} current={loadInfosProgress.progress} max={100} />}
				</>
			)}
			<Button onClick={handleInstallModpack} disabled={isWorking || isUpdated}>
				<ButtonIcon icon={DownloadCloud} isLoading={isWorking} />
				{isWorking ? 'Instalando...' : 'Atualizar'}
			</Button>
		</section>
	)
}