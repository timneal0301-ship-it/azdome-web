import Link from "next/link";
import { forwardRef } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "soft"
  | "ghost"
  | "outlineLight"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
};

const BASE =
  "inline-flex items-center justify-center gap-1.5 font-semibold tracking-tight rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-sm md:text-base",
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md focus-visible:ring-offset-white",
  secondary:
    "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-offset-white",
  soft:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-offset-white",
  ghost:
    "text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus-visible:ring-offset-white",
  outlineLight:
    "border border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/10 focus-visible:ring-offset-slate-900",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-offset-white",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: SharedProps = {}) {
  return [
    BASE,
    SIZES[size],
    VARIANTS[variant],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");
}

type ButtonProps = SharedProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant, size, fullWidth, className, ...rest }: ButtonProps,
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={buttonClasses({ variant, size, fullWidth, className })}
        {...rest}
      />
    );
  },
);

type LinkButtonProps = SharedProps &
  Omit<React.ComponentProps<typeof Link>, "className">;

export function LinkButton({
  variant,
  size,
  fullWidth,
  className,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...rest}
    />
  );
}
