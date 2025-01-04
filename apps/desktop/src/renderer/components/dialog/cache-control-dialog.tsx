import { useState } from 'react';
import { Button, ButtonIcon } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Bomb, BookX, FileX } from 'lucide-react';

type CacheCleanType = 'info' | 'files' | 'all';

export function CacheControlDialog({ children }: { children: React.ReactNode }) {
	const [isDeleting, setIsDeleting] = useState<CacheCleanType | null>();

	async function handleClearCache(type: CacheCleanType) {
		setIsDeleting(type);
		await window.api.invoke('cache:clean', type);
		setIsDeleting(null);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Configurações de cache</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Você pode limpar o cache das informações dos mods baixados, e também limpar o cache de arquivos dos mods. (isso pode deixar o processo de atualização mais lento)
				</DialogDescription>
				<div className='flex flex-col gap-2'>
					<Button variant='secondary' onClick={() => handleClearCache('info')} disabled={!!isDeleting}><ButtonIcon icon={BookX} isLoading={isDeleting === 'info'} /> Limpar informações</Button>
					<Button variant='secondary' onClick={() => handleClearCache('files')} disabled={!!isDeleting}><ButtonIcon icon={FileX} isLoading={isDeleting === 'files'} /> Limpar arquivos</Button>
					<Button variant='destructive' onClick={() => handleClearCache('all')} disabled={!!isDeleting}><ButtonIcon icon={Bomb} isLoading={isDeleting === 'all'} /> Limpar todo o cache</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}