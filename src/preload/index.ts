/* eslint-disable @typescript-eslint/no-explicit-any */
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

// Expor apenas o que for necessário
contextBridge.exposeInMainWorld('myAPI', {
	send: (channel: string, data: any) => {
		ipcRenderer.send(channel, data);
	},
	invoke: (channel: string, data?: any) => {
		return ipcRenderer.invoke(channel, data);
	},
	on: (channel: string, listener: (event: any, data: any) => void) => {
		ipcRenderer.on(channel, listener);
	},
	removeAllListeners: (channel: string) => {
		ipcRenderer.removeAllListeners(channel);
	},
});
