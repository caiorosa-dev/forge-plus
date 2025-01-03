/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
	interface Window {
		api: {
			// IPC Main
			send: (channel: string, data: any) => void;
			invoke: (channel: string, data?: any) => Promise<any>;
			on: (channel: string, listener: (event: any, data: any) => void) => void;
			removeAllListeners: (channel: string) => void;
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