/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPCChannelType } from './types/electron-ipc';

declare global {
	interface Window {
		api: {
			// IPC Main
			send: (channel: IPCChannelType, data: any) => void;
			invoke: <T = any>(channel: IPCChannelType, data?: any) => Promise<T>;
			on: (channel: IPCChannelType, listener: (event: any, data: any) => void) => void;
			removeAllListeners: (channel: IPCChannelType) => void;
			// Window
			minimizeWindow: () => void;
			maximizeWindow: () => void;
			restoreWindow: () => void;
			closeWindow: () => void;
			isWindowMaximized: () => boolean;
		};
	}
}

export { };