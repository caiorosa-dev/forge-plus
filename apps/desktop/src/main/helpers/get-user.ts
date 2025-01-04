import os from 'os';

export function getUser() {
	return os.userInfo().username;
}