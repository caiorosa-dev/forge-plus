import React from 'react';

interface ModpackListProps {
	instances: string[];
	selectedInstance: string | null;
	onSelectInstance: (instance: string) => void;
}

export const ModpackList: React.FC<ModpackListProps> = ({
	instances,
	selectedInstance,
	onSelectInstance
}) => {
	return (
		<div className="border p-2 rounded w-64 h-64 overflow-auto">
			<h2 className="font-semibold mb-2">Modpacks Instalados</h2>
			<ul>
				{instances.map((inst) => (
					<li key={inst}>
						<button
							onClick={() => onSelectInstance(inst)}
							className={`block text-left w-full px-2 py-1 rounded ${selectedInstance === inst ? 'bg-blue-200' : 'hover:bg-gray-100'
								}`}
						>
							{inst}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
