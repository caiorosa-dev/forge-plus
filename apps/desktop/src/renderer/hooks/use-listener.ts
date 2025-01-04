import { useEffect } from 'react';
import { IPCChannelType } from '../../types/electron-ipc';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useListener<T = any>(channel: IPCChannelType, callback: (event: any, data: T) => void) {
	useEffect(() => {
		window.api.on(channel, callback);

		return () => {
			window.api.removeAllListeners(channel);
		};
	}, []);
}