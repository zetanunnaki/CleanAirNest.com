import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-slate-800 shadow-lg shadow-primary/20 rounded-full",
        accent: "bg-gradient-to-r from-accent to-cyan-500 text-white hover:opacity-90 shadow-lg shadow-accent/25 rounded-full",
        outline: "border-2 border-slate-200 text-primary hover:border-primary hover:bg-slate-50 rounded-full",
        ghost: "hover:bg-slate-50 text-slate-600 rounded-full",
        amazon: "bg-[#FF9900] text-black hover:bg-[#e88b00] shadow-lg shadow-[#FF9900]/20 rounded-full font-bold",
        walmart: "bg-[#0071DC] text-white hover:bg-[#005bb5] shadow-lg shadow-[#0071DC]/20 rounded-full",
        secondary: "bg-white text-primary hover:bg-slate-50 shadow-lg rounded-full",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        default: "h-12 px-7 text-base",
        lg: "h-14 px-9 text-lg",
        xl: "h-16 px-12 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
