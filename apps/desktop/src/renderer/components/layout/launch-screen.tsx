import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import { useAnimatedUnmount } from '../../hooks/use-animated-unmount';
import { Logo } from '../ui/logo';
import { Spinner } from '../ui/spinner';

export function LaunchScreen({ className }: { className?: string }) {
	const [visible, setVisible] = useState(true);

	const { shouldRender, animatedElementRef } = useAnimatedUnmount(
		visible,
		'fadeOut',
	);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setVisible(false);
		}, 2500);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	if (!shouldRender) return;

	return (
		<div
			className={twMerge(
				'absolute flex h-full min-h-screen w-full max-w-[100vw] overflow-x-hidden items-center flex-col justify-center bg-indigo-800 z-50',
				className,
				!visible && 'animate-fadeOut',
			)}
			ref={animatedElementRef}
		>
			<div className="animate-fadeIn">
				<Logo size="normal" color='white' />
			</div>
			<Spinner color='white' className='animate-fadeIn' />
		</div>
	);
}