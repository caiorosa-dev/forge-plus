/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
	interface Window {
		myAPI: {
			send: (channel: string, data: any) => void;
			invoke: (channel: string, data?: any) => Promise<any>;
			on: (channel: string, listener: (event: any, data: any) => void) => void;
			removeAllListeners: (channel: string) => void;
		};
	}
}

export { };