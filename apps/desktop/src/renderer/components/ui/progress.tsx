import * as React from "react";

interface ProgressBarProps {
	current: number;
	max: number;
	label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, max, label }) => {
	const progress = (current / max) * 100;

	return (
		<div className="w-full bg-slate-800 rounded-full h-6 relative">
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
