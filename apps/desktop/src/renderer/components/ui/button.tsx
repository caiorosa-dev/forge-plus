import { FC, forwardRef, MouseEventHandler, ReactNode } from "react";
import { useAnimatedUnmount } from '../../hooks/use-animated-unmount';
import { Spinner } from './spinner';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../../libs/utils';

const buttonVariants = cva(
  "transition-all active:opacity-90 flex items-center justify-center gap-1 disabled:opacity-85 disabled:text-slate-400 disabled:hover:opacity-75 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-indigo-800 hover:bg-indigo-700 text-white px-6",
        secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100 px-6",
        destructive: "bg-red-800 hover:bg-red-700 text-white px-6",
        ghost: "bg-transparent text-indigo-500 hover:text-white hover:bg-indigo-600",
        'ghost-secondary': "bg-transparent text-slate-200 hover:text-white hover:bg-slate-700",
      },
      size: {
        medium: "h-10 rounded-xl",
        small: "h-8 rounded-lg text-sm",
        icon: "h-8 w-8 rounded-md p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

type Props = ButtonVariants & {
  className?: string;
  children?: ReactNode;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler;
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant, size, loading, ...props }, ref) => {
    const { shouldRender, animatedElementRef } = useAnimatedUnmount(
      loading === true
    );

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {shouldRender && (
          <Spinner
            className={loading ? "animate-fadeIn" : "animate-fadeOut"}
            color={loading ? "slate" : "white"}
            divRef={animatedElementRef}
          />
        )}
        {props.children}
      </button>
    );
  }
);
Button.displayName = "Button";


type ButtonIconProps = {
  icon: FC<{ className?: string }>;
  isLoading?: boolean;
  className?: string;
}

function ButtonIcon({
  icon: Icon,
  isLoading,
  className
}: ButtonIconProps) {
  if (isLoading) {
    return <Spinner className={cn(className, "h-4 w-4")} color='white' />
  }

  return (
    <Icon className={cn(className, "h-4 w-4")} />
  );
}

export { Button, ButtonIcon };