import { BoltIcon } from "@heroicons/react/24/solid";
import { cn } from '../../libs/utils';

type Props = {
	size?: "normal" | "large" | "small";
	className?: string;
};

export function Logo({ size, className }: Props) {
	let imageSize = "";
	let textSize = "";

	switch (size) {
		case "large":
			imageSize = "h-9 w-9";
			textSize = "text-3xl";
			break;
		case "small":
			imageSize = "h-6 w-6";
			textSize = "text-lg";
			break;
		default:
			imageSize = "h-8 w-8";
			textSize = "text-2xl";
			break;
	}

	return (
		<div className={cn("flex cursor-default items-center justify-center gap-3", className)}>
			<BoltIcon className={cn("text-indigo-600", imageSize)} />
			<h2 className={cn("font-bold text-white", textSize)}>forgeplus</h2>
		</div>
	);
}
