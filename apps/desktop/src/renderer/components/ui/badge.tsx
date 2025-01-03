import { ReactNode } from "react";
import { cva, VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
	"inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium",
	{
		variants: {
			variant: {
				slate: "bg-slate-700 text-slate-100",
				indigo: "bg-indigo-700 text-indigo-100",
				green: "bg-green-700 text-green-100",
				amber: "bg-amber-700 text-amber-100",
				emerald: "bg-emerald-700 text-emerald-100",
				red: "bg-red-700 text-red-100",
			},
		},
		defaultVariants: {
			variant: "slate",
		},
	}
);

type BadgeVariants = VariantProps<typeof badgeVariants>;

type Props = BadgeVariants & {
	className?: string;
	children: ReactNode;
};

export function Badge({
	children,
	className,
	variant,
}: Props) {
	return (
		<span className={badgeVariants({ variant, className })}>
			{children}
		</span>
	);
}
