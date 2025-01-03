/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ReactDOM from 'react-dom/client';
import { Button, ButtonIcon } from './components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { Footer } from './components/layout/footer';

function App() {
  return (
    <div className="h-screen w-screen bg-slate-950 grid grid-rows-[auto_1fr_auto] gap-4">
      <header className='p-4'>
        <p className='text-slate-300 text-center'>Nenhum download em andamento</p>
      </header>
      <div className='grid grid-cols-2 gap-8 px-8'>
        <div className='bg-slate-900 p-4 rounded-lg flex flex-col gap-6'>
          <header className='flex justify-between items-center'>
            <p className='text-slate-300 text-sm'>
              Modpacks disponíveis
            </p>
            <Button size='icon' variant='ghost'>
              <ButtonIcon icon={RefreshCcw} isLoading={false} />
            </Button>
          </header>
          <ul className='flex flex-col gap-4'>
            <li className='bg-slate-800 p-2 rounded-lg flex items-center gap-4 border border-transparent hover:border-indigo-500 transition-colors cursor-pointer'>
              <img src='https://i.imgur.com/ejHCV70.jpeg' alt='Modpack' className='w-28 h-28 rounded-md aspect-square object-cover' />
              <div className='flex flex-col gap-2 items-start'>
                <header className='flex items-center gap-2'>
                  <p className='text-white'>Horror & Chaos</p>
                  <span className='px-1 py-0.5 bg-indigo-600 text-indigo-100 text-xs rounded'>1.0.0</span>
                </header>
                <p className='text-slate-300 text-sm'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </p>
                <footer className='flex gap-2'>
                  <p className='text-slate-400 text-sm'>50 mods</p>
                  <p className='text-slate-400 text-sm'>MC 1.19.4</p>
                </footer>
              </div>
            </li>
          </ul>
        </div>
        <div className='p-4 rounded-lg border border-slate-800 border-dashed flex justify-center items-center'>
          <p className='text-slate-400 text-sm'>
            Nenhum modpack selecionado
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function render() {
  const rootElement = document.getElementById('app');
  if (!rootElement) throw new Error('Root element not found');

  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

render();
