import { Logo } from '../ui/logo';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button, ButtonIcon } from '../ui/button';
import { DatabaseZap, Settings, Upload } from 'lucide-react';
import { CacheControlDialog } from '../dialog/cache-control-dialog';
import { UploadCenterDialog } from '../dialog/upload-center-dialog';

export function Footer() {
	return (
		<footer className='p-2 rounded flex justify-center items-center gap-2 relative'>
			<Logo size='small' />
			<p className='text-slate-400 text-sm'>
				v1.2.0
			</p>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant='secondary' size='icon' className='absolute right-8 bottom-3'>
						<ButtonIcon icon={Settings} />
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<CacheControlDialog>
						<Button variant='ghost-secondary' className='w-full justify-between px-4'>
							<ButtonIcon icon={DatabaseZap} />
							Configurações de cache
						</Button>
					</CacheControlDialog>
					<UploadCenterDialog>
						<Button variant='ghost-secondary' className='w-full justify-between px-4'>
							<ButtonIcon icon={Upload} />
							Central de upload
						</Button>
					</UploadCenterDialog>
				</PopoverContent>
			</Popover>
		</footer>
	);
}