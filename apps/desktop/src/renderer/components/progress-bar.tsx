import React, { useMemo } from 'react';

interface ProgressData {
	step: 'info' | 'download';
	status: 'start' | 'progress';
	projectID: number;
	fileID?: number;
	progress?: string; // string, ex: "42.34"
}

interface ProgressBarProps {
	progressData: ProgressData[];
	downloadCount: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progressData, downloadCount }) => {

	// Agrupamos os dados de download
	const downloads = useMemo(() => {
		return progressData.filter(d => d.step === 'download');
	}, [progressData]);

	return (
		<div>
			<p className="mb-2">Total Downloads Iniciados: {downloadCount}</p>
			<div className="space-y-1">
				{downloads.map((d, idx) => {
					const prog = d.progress ? Number(d.progress) : 0;
					return (
						<div key={`${d.projectID}-${d.fileID}-${idx}`} className="mb-2">
							<div className="text-sm">
								Mod #{d.projectID} / File #{d.fileID}
							</div>
							<div className="w-full bg-gray-300 rounded h-4">
								<div
									className="bg-blue-500 h-4 rounded"
									style={{ width: `${prog}%` }}
								/>
							</div>
							{prog > 0 && <span className="text-xs">{prog.toFixed(2)}%</span>}
						</div>
					);
				})}
			</div>
		</div>
	);
};

