/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ModpackManifest } from '../types/modpack-manifest';
import { ModpackList } from './components/modpack-list';
import { ProgressBar } from './components/progress-bar';

function App() {
  const [instances, setInstances] = useState<string[]>([]);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);
  const [manifest, setManifest] = useState<ModpackManifest | null>(null);

  // Para progresso
  const [progressInfos, setProgressInfos] = useState<any[]>([]);
  const [downloadCount, setDownloadCount] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Carrega a lista de modpacks instalados ao montar
    loadInstalledModpacks();

    // Listeners de eventos de progresso
    window.myAPI.on('modpack-update-progress', (_, data) => {
      setProgressInfos((prev) => {
        if (data.status === 'progress') {
          const updatedInfos = prev.map(info => 
            info.projectID === data.projectID && info.fileID === data.fileID ? data : info
          );
          return updatedInfos;
        }
        return [...prev, data];
      });
      if (data.step === 'download' && data.status === 'start') {
        setDownloadCount((prevCount) => prevCount + 1);
      }
    });

    // Evento final de atualização
    window.myAPI.on('modpack-update-complete', (_, data) => {
      setIsUpdating(false);
      if (data.success) {
        alert('Modpack atualizado com sucesso!');
      } else {
        alert(`Erro ao atualizar modpack: ${data.error}`);
      }
    });

    // Limpar listeners quando o componente desmontar
    return () => {
      window.myAPI.removeAllListeners('modpack-update-progress');
      window.myAPI.removeAllListeners('modpack-update-complete');
    };
  }, []);

  /**
   * Invoca o processo main para obter a lista de modpacks instalados
   */
  const loadInstalledModpacks = async () => {
    try {
      const result = await window.myAPI.invoke('get-installed-modpacks');
      setInstances(result);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Abre o diálogo para selecionar o .json e carrega o manifest
   */
  const handleLoadManifest = async () => {
    try {
      const { canceled, filePaths } = await window.myAPI.invoke('dialog:openFile', {
        title: 'Selecione o arquivo .json do Modpack',
        filters: [{ name: 'JSON Files', extensions: ['json'] }],
        properties: ['openFile']
      });

      if (!canceled && filePaths && filePaths.length > 0) {
        const filePath = filePaths[0];
        const loadedManifest: ModpackManifest = await window.myAPI.invoke('load-modpack-manifest', filePath);
        setManifest(loadedManifest);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Inicia a atualização do modpack (deleta pasta mods, baixa mods etc.)
   */
  const handleUpdateModpack = async () => {
    if (!selectedInstance || !manifest) {
      alert('Selecione uma instância e importe um manifest antes de atualizar.');
      return;
    }
    // Limpa os estados de progresso
    setProgressInfos([]);
    setDownloadCount(0);
    setIsUpdating(true);

    // Envia para o processo principal
    window.myAPI.send('update-modpack', {
      manifest,
      instanceName: selectedInstance
    });
  };

  return (
    <div className="h-screen w-screen p-4 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow p-4 rounded">
        <h1 className="text-2xl font-bold mb-4">Forge Plus - Gerenciador de Modpacks</h1>

        <div className="flex gap-4 mb-4">
          <ModpackList
            instances={instances}
            selectedInstance={selectedInstance}
            onSelectInstance={setSelectedInstance}
          />

          <div className="flex flex-col justify-start">
            <button
              onClick={handleLoadManifest}
              className="px-4 py-2 bg-blue-600 text-white rounded mb-2"
            >
              Selecionar Manifest (JSON)
            </button>
            <button
              onClick={handleUpdateModpack}
              className="px-4 py-2 bg-green-600 text-white rounded"
              disabled={!selectedInstance || !manifest || isUpdating}
            >
              {isUpdating ? 'Atualizando...' : 'Atualizar Modpack'}
            </button>
          </div>
        </div>

        {manifest && (
          <div className="border p-2 rounded mb-4">
            <p><strong>Manifest:</strong> {manifest.name} - {manifest.version}</p>
            <p>Minecraft: {manifest.minecraft.version}</p>
            <p>Mods: {manifest.files.length}</p>
          </div>
        )}

        {isUpdating && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Progresso de Atualização</h2>
            <ProgressBar progressData={progressInfos} downloadCount={downloadCount} />
          </div>
        )}
      </div>
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
