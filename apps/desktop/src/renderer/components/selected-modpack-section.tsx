import { ArrowDownUp, DownloadCloud } from 'lucide-react';
import { Modpack, LocalModpack } from "../../types/modpack";
import { useModpackDownload } from '../context/modpack-download-context';
import { Badge } from './ui/badge';
import { Button, ButtonIcon } from './ui/button';
import ProgressBar from './ui/progress';
import { maxStringLength } from '../helpers/max-string-length';
import { formatRelative } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

	function handleInstallModpack(versionTag: string) {
		installModpack({
			modpackId: modpack.id,
			versionTag,
			loadToCache: !isSynced
		});
	}

	return (
		<section className='bg-slate-900 p-4 rounded-lg flex flex-col gap-6'>
			<header className='flex gap-2 items-center'>
				<p className='text-white text-lg'>{modpack.displayName}</p>
				{isSynced && (
					<Badge variant='slate-800'>
						v{installedModpack?.installedVersionTag}
					</Badge>
				)}
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
			<div className='text-slate-400 text-sm grid grid-cols-2 gap-2'>
				<p><strong>Versão do Minecraft:</strong> {modpack.minecraftVersion}</p>
				<p><strong>Versão do Forge:</strong> {modpack.forgeVersion}</p>
				<p><strong>Versão do modpack instalada:</strong> {installedModpack?.installedVersionTag}</p>
				<p><strong>Versão do modpack atual:</strong> {modpack.currentVersionTag}</p>
			</div>
			{isWorking && !isDownloading && (
				<>
					<div className='flex justify-between items-center'>
						<p>Processando informações dos mods...</p>
						{loadInfosProgress && <p className='text-indigo-500 text-sm'>{maxStringLength(loadInfosProgress.lastProjectName, 30)}</p>}
					</div>
					{loadInfosProgress && <ProgressBar label={`${loadInfosProgress.progress}%`} current={loadInfosProgress.progress} max={100} />}
				</>
			)}
			<Button onClick={() => handleInstallModpack(modpack.currentVersionTag)} disabled={isWorking || isUpdated}>
				<ButtonIcon icon={DownloadCloud} isLoading={isWorking} />
				{isWorking ? 'Instalando...' : 'Atualizar'}
			</Button>
			<div className='flex flex-col gap-2'>
				<p className='text-slate-300 text-sm'>Versões disponíveis:</p>
				<ul className='flex flex-col gap-2 max-h-[calc(100vh-500px)] h-full overflow-y-auto'>
					{modpack.versions.map(version => (
						<li key={version.id} className='flex justify-between items-center bg-slate-800 p-2 rounded-md'>
							<div className='flex items-center gap-2'>
								<p className='text-slate-200 text-sm'>{version.tag}</p>
								<p className='text-slate-400 text-xs'>{formatRelative(new Date(version.createdAt), new Date(), { locale: ptBR })}</p>
							</div>
							<Button variant='secondary' className='bg-slate-900 hover:bg-slate-900/70' size='small' onClick={() => handleInstallModpack(version.tag)} disabled={isWorking || version.tag === installedModpack?.installedVersionTag}>
								<ButtonIcon icon={ArrowDownUp} />
								Instalar
							</Button>
						</li>
					))}
										{modpack.versions.map(version => (
						<li key={version.id} className='flex justify-between items-center bg-slate-800 p-2 rounded-md'>
							<div className='flex items-center gap-2'>
								<p className='text-slate-200 text-sm'>{version.tag}</p>
								<p className='text-slate-400 text-xs'>{formatRelative(new Date(version.createdAt), new Date(), { locale: ptBR })}</p>
							</div>
							<Button variant='secondary' className='bg-slate-900 hover:bg-slate-900/70' size='small' onClick={() => handleInstallModpack(version.tag)} disabled={isWorking || version.tag === installedModpack?.installedVersionTag}>
								<ButtonIcon icon={ArrowDownUp} />
								Instalar
							</Button>
						</li>
					))}
										{modpack.versions.map(version => (
						<li key={version.id} className='flex justify-between items-center bg-slate-800 p-2 rounded-md'>
							<div className='flex items-center gap-2'>
								<p className='text-slate-200 text-sm'>{version.tag}</p>
								<p className='text-slate-400 text-xs'>{formatRelative(new Date(version.createdAt), new Date(), { locale: ptBR })}</p>
							</div>
							<Button variant='secondary' className='bg-slate-900 hover:bg-slate-900/70' size='small' onClick={() => handleInstallModpack(version.tag)} disabled={isWorking || version.tag === installedModpack?.installedVersionTag}>
								<ButtonIcon icon={ArrowDownUp} />
								Instalar
							</Button>
						</li>
					))}
										{modpack.versions.map(version => (
						<li key={version.id} className='flex justify-between items-center bg-slate-800 p-2 rounded-md'>
							<div className='flex items-center gap-2'>
								<p className='text-slate-200 text-sm'>{version.tag}</p>
								<p className='text-slate-400 text-xs'>{formatRelative(new Date(version.createdAt), new Date(), { locale: ptBR })}</p>
							</div>
							<Button variant='secondary' className='bg-slate-900 hover:bg-slate-900/70' size='small' onClick={() => handleInstallModpack(version.tag)} disabled={isWorking || version.tag === installedModpack?.installedVersionTag}>
								<ButtonIcon icon={ArrowDownUp} />
								Instalar
							</Button>
						</li>
					))}
										{modpack.versions.map(version => (
						<li key={version.id} className='flex justify-between items-center bg-slate-800 p-2 rounded-md'>
							<div className='flex items-center gap-2'>
								<p className='text-slate-200 text-sm'>{version.tag}</p>
								<p className='text-slate-400 text-xs'>{formatRelative(new Date(version.createdAt), new Date(), { locale: ptBR })}</p>
							</div>
							<Button variant='secondary' className='bg-slate-900 hover:bg-slate-900/70' size='small' onClick={() => handleInstallModpack(version.tag)} disabled={isWorking || version.tag === installedModpack?.installedVersionTag}>
								<ButtonIcon icon={ArrowDownUp} />
								Instalar
							</Button>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}