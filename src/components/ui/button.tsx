import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-slate-800 shadow-lg shadow-primary/15 rounded-full hover:-translate-y-px",
        accent: "bg-gradient-to-r from-accent to-cyan-500 text-white hover:shadow-xl hover:shadow-accent/20 rounded-full hover:-translate-y-px",
        outline: "border-2 border-slate-200 text-primary hover:border-accent/40 hover:bg-accent/[0.04] hover:text-accent rounded-full",
        ghost: "hover:bg-slate-100/80 text-slate-600 rounded-full",
        amazon: "bg-[#FF9900] text-black hover:bg-[#e88b00] shadow-lg shadow-[#FF9900]/15 rounded-full font-bold hover:-translate-y-px",
        walmart: "bg-[#0071DC] text-white hover:bg-[#005bb5] shadow-lg shadow-[#0071DC]/15 rounded-full hover:-translate-y-px",
        secondary: "bg-white text-primary hover:bg-slate-50 shadow-lg shadow-black/5 rounded-full hover:-translate-y-px",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
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
