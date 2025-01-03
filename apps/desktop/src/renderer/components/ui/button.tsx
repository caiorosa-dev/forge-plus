import { MouseEventHandler, ReactNode } from "react";
import { styled } from "react-tailwind-variants";
import { useAnimatedUnmount } from '../../hooks/use-animated-unmount';
import { Spinner } from './spinner';

const StyledButton = styled("button", {
  base: "transition-all active:opacity-90 flex items-center justify-center gap-1 disabled:bg-slate-800 disabled:text-slate-400 disabled:hover:bg-slate-700 disabled:hover:opacity-75 disabled:cursor-not-allowed",
  variants: {
    variant: {
      default: "bg-indigo-800 hover:bg-indigo-700 text-white px-6",
      secondary: "bg-slate-700 hover:bg-slate-600 text-white px-6",
      destructive: "bg-red-800 hover:bg-red-700 text-white px-6",
      ghost: "bg-transparent text-indigo-600 hover:text-indigo-400",
    },
    size: {
      medium: "h-10 rounded-xl",
      small: "h-8 rounded-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "medium",
  },
});

type Props = {
  className?: string;
  children: ReactNode;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "medium" | "small";
  variant?: "default" | "secondary" | "destructive" | "ghost";
  disabled?: boolean;
  onClick?: MouseEventHandler;
};

export function Button({
  children,
  className,
  onClick,
  variant,
  disabled,
  loading,
  type,
  size,
}: Props) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(
    loading === true
  );

  return (
    <StyledButton
      disabled={disabled || loading}
      type={type || "button"}
      onClick={onClick}
      className={className}
      variant={variant}
      size={size}
    >
      {shouldRender && (
        <Spinner
          className={loading ? "animate-fadeIn" : "animate-fadeOut"}
          color={loading ? "slate" : "white"}
          divRef={animatedElementRef}
        />
      )}
      {children}
    </StyledButton>
  );
}
