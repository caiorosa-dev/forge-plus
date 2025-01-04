/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage } from './pages/home';
import { LaunchScreen } from './components/layout/launch-screen';
import { ModpackDownloadProvider } from './context/modpack-download-context';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LaunchScreen />
      <ModpackDownloadProvider>
        <HomePage />
      </ModpackDownloadProvider>
    </QueryClientProvider>
  );
}

function render() {
  const rootElement = document.getElementById('app');
  if (!rootElement) throw new Error('Root element not found');

  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

render();
