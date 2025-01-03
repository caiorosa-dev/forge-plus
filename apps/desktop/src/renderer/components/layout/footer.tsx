import { Badge } from '../ui/badge';
import { Logo } from '../ui/logo';

export function Footer() {
	return (
		<footer className='p-2 rounded flex justify-center items-center gap-2'>
			<Logo size='small' />
			<p className='text-slate-400 text-sm'>
				v0.5.0
			</p>
			<Badge variant='emerald'>
				BETA
			</Badge>
		</footer>
	);
}