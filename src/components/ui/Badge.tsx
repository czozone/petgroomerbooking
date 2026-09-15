import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface BadgeProps {
  className?: string;
  variant?: "default" | "secondary" | "outline" | "danger" | "success";
  children?: React.ReactNode;
  [key: string]: any;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2",
        {
          "border-transparent bg-stone-900 text-stone-50": variant === "default",
          "border-transparent bg-stone-100 text-stone-900": variant === "secondary",
          "border-transparent bg-red-100 text-red-800": variant === "danger",
          "border-transparent bg-green-100 text-green-800": variant === "success",
          "text-stone-950": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
