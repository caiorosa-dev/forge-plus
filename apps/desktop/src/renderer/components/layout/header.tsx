import { List } from 'lucide-react';
import { useModpackDownload } from '../../context/modpack-download-context';
import { Button, ButtonIcon } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import ProgressBar from '../ui/progress';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { cn } from '../../libs/utils';
import { maxStringLength } from '../../helpers/max-string-length';

type QueuePopoverProps = {
	queue?: {
		projectId: number;
		name: string;
		image: string;
	}[];
	currentMod?: {
		projectId: number;
		name: string;
		progress: number;
	} | null;
}

export function QueuePopover({ queue, currentMod }: QueuePopoverProps) {
	const [parent] = useAutoAnimate({ duration: 300 });

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='secondary' size='small' className='justify-self-end'>
					<ButtonIcon icon={List} />
					Fila de downloads
				</Button>
			</PopoverTrigger>
			<PopoverContent className='max-h-[50vh] overflow-y-auto'>
				<p className='text-slate-300 text-sm text-start mb-3'>Fila</p>
				<ul className='flex flex-col gap-2' ref={parent}>
					{queue.map(mod => {
						const isCurrentMod = mod.projectId === currentMod?.projectId;

						return (
							(
								<li key={mod.projectId} className={cn('flex gap-2 items-center bg-slate-800 p-1 rounded-md', isCurrentMod && 'bg-slate-700')}>
									<img src={mod.image} alt={mod.name} className='w-8 h-8 rounded-md object-fill' />
									<p className='text-slate-300 text-sm'>{maxStringLength(mod.name || '', 25)} {isCurrentMod && <span className='text-indigo-300 text-xs'>{Math.round(currentMod.progress)}%</span>}</p>
								</li>
							)
						)
					})}
				</ul>
			</PopoverContent>
		</Popover>
	)
}

export function Header() {
	const { isDownloading, queue, currentMod, totalProgress, error } = useModpackDownload();

	return (
		<header className='p-4'>
			{!isDownloading && (
				<p className='text-slate-300 text-center'>Nenhum download em andamento</p>
			)}
			{isDownloading && (
				<div className='grid gap-4 grid-cols-5'>
					<p className='text-slate-400 text-start text-sm'>{maxStringLength(currentMod?.name || '', 25)}</p>
					<ProgressBar className='col-span-3' current={totalProgress} max={100} label={`${Math.round(totalProgress)}%`} />
					<QueuePopover queue={queue} currentMod={currentMod} />
				</div>
			)}
			{error && (
				<p className='text-red-500 text-center'>Erro: {error.message}</p>
			)}
		</header>
	);
}