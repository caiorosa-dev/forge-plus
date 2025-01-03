import { cn } from '../../libs/utils';
import "../../style/spinner.css";

type Props = {
	className?: string;
	divRef?: React.MutableRefObject<null>;
	color?: "white" | "indigo" | "slate";
	size?: "small" | "normal" | "large";
};

export function Spinner({ color, size, className, divRef }: Props) {
	let sizeToRender = "";

	switch (size) {
		case "small":
			sizeToRender = "h-8 w-8";
			break;
		case "large":
			sizeToRender = "h-16 w-16";
			break;
		default:
			sizeToRender = "h-10 w-10";
			break;
	}

	let colorToRender = "";

	switch (color) {
		case "indigo":
			colorToRender = "stroke-indigo-500";
			break;
		case "slate":
			colorToRender = "stroke-slate-600";
			break;
		default:
			colorToRender = "stroke-white";
			break;
	}

	return (
		<div className={cn("spinner", className, sizeToRender)} ref={divRef} >
			<svg viewBox="0 0 100 100" >
				<circle
					className={cn(colorToRender, "transition-all")}
					cx="50"
					cy="50"
					r="20"
				/>
			</svg>
		</div>
	);
}
