import { useModpackDownload } from '../../context/modpack-download-context';
import ProgressBar from '../ui/progress';

export function Header() {
	const { isDownloading, queue, currentMod, progress, error } = useModpackDownload();

	return (
		<header className='p-4'>
			{!isDownloading && (
				<p className='text-slate-300 text-center'>Nenhum download em andamento</p>
			)}
			{isDownloading && (
				<div className='grid gap-4 grid-cols-[auto_1fr_auto]'>
					<p className='text-slate-300 text-center'>{currentMod?.name}</p>
					<ProgressBar current={progress} max={100} label={`${Math.round(progress)}%`} />
					<p className='text-slate-300 text-center'>{queue?.length} mods restantes</p>
				</div>
			)}
			{error && (
				<p className='text-red-500 text-center'>Erro: {error.message}</p>
			)}
		</header>
	);
}