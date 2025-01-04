/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvokeChannelType, SendChannelType, EventChannelType } from './types/electron-ipc';

declare global {
	interface Window {
		api: {
			// IPC Main
			send: (channel: SendChannelType, data: any) => void;
			invoke: <T = any>(channel: InvokeChannelType, data?: any) => Promise<T>;
			on: (channel: EventChannelType, listener: (event: any, data: any) => void) => void;
			removeAllListeners: (channel: EventChannelType) => void;
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