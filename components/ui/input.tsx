import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex h-11 w-full border border-[var(--rule-strong)] bg-[var(--ink-up)] px-3.5 py-2 text-sm text-[var(--paper)] transition",
      "placeholder:text-[var(--paper-faint)]",
      "focus:border-[var(--rust)] focus:outline-none focus:ring-2 focus:ring-[var(--rust)]/30",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
