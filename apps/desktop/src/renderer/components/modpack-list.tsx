import { LocalModpack, Modpack } from '../../types/modpack';
import { cn } from '../libs/utils';
import { Badge } from './ui/badge';
import { Spinner } from './ui/spinner';

type ModpackListProps = {
  modpacks: Modpack[];
  installedModpacks: LocalModpack[];

  selectedModpackId?: string;
  onSelectModpack: (modpackId: string) => void;

  isLoading?: boolean;
}

type ModpackCardProps = {
  modpack: Modpack;
  installedVersionTag?: string;
  onClick: () => void;
  isSelected: boolean;
}

function ModpackCard({ modpack, installedVersionTag, onClick, isSelected }: ModpackCardProps) {
  const isInstalled = installedVersionTag !== undefined;
  const isLatestVersion = installedVersionTag === modpack.currentVersionTag;

  return (
    <li className={cn('bg-slate-800 p-2 rounded-lg flex items-center gap-4 border border-transparent hover:border-indigo-600 transition-colors cursor-pointer', isSelected && 'border-indigo-700')} onClick={onClick}>
      <img src={modpack.image} alt='Modpack' className='w-28 h-28 rounded-md aspect-square object-cover' />
      <div className='flex flex-col gap-2 items-start'>
        <header className='flex items-center gap-2'>
          <p className='text-white'>{modpack.displayName}</p>
          {!isInstalled && <Badge variant='slate'>Não instalado</Badge>}
          {isInstalled && !isLatestVersion && <Badge variant='amber'>{installedVersionTag}</Badge>}
          {isInstalled && isLatestVersion && <Badge variant='emerald'>{modpack.currentVersionTag}</Badge>}
        </header>
        <p className='text-slate-300 text-sm'>
          {modpack.description}
        </p>
        <footer className='flex gap-2'>
          <p className='text-slate-400 text-sm'>MC {modpack.minecraftVersion}</p>
          <p className='text-slate-400 text-sm'>{modpack.modCount} mods</p>
          <p className='text-slate-400 text-sm'>{modpack.versions.length} versões</p>
        </footer>
      </div>
    </li>
  )
}

export function ModpackList({ modpacks, installedModpacks, selectedModpackId, onSelectModpack, isLoading }: ModpackListProps) {
  function getInstalledVersionTag(modpackId: string) {
    const installedModpack = installedModpacks.find(installedModpack => installedModpack.modpackId === modpackId);

    return installedModpack?.installedVersionTag;
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Spinner color='indigo' size='large' />
      </div>
    )
  }

  return (
    <ul className='flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-14rem)] h-full'>
      {modpacks.map(modpack => (
        <ModpackCard
          key={modpack.id}
          modpack={modpack}
          installedVersionTag={getInstalledVersionTag(modpack.id)}
          onClick={() => onSelectModpack(modpack.id)}
          isSelected={modpack.id === selectedModpackId}
        />
      ))}
    </ul>
  )
}
