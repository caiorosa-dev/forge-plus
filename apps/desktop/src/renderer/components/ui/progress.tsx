import * as React from "react";
import { cn } from '../../libs/utils';

interface ProgressBarProps {
	current: number;
	max: number;
	label: string;
	className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, max, label, className }) => {
	const progress = (current / max) * 100;

	return (
		<div className={cn("w-full bg-slate-800 rounded-full h-6 relative", className)}>
			<div
				className="bg-indigo-600 h-6 rounded-full"
				style={{ width: `${progress}%` }}
			></div>
			<span className="absolute inset-0 flex items-center justify-center text-white">
				{label}
			</span>
		</div>
	);
};

export default ProgressBar;
