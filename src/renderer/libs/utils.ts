import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const debounce = (callback: (...args: unknown[]) => void, wait: number) => {
	let timeoutId: NodeJS.Timeout | null = null;

	return (...args: Parameters<typeof callback>) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			callback(...args);
		}, wait);
	};
}

export const titleCase = (text: string) => {
	return text
		.replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
		.replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word
}
