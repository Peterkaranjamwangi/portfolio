import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // The redesign's call to action: square, rose, with the hard offset
        // shadow that collapses into the button on press.
        signal:
          "rounded-none border-2 border-ink bg-signal font-display font-semibold text-on-signal brutal-shadow transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1",
        ink: "rounded-none border-2 border-ink bg-ink font-display font-semibold text-on-ink hover:bg-ink/90",
        surface:
          "rounded-none border-2 border-ink bg-surface-container font-display text-on-surface brutal-shadow transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
        "icon-sm": "size-8 p-0",
      },
      /**
       * Full-width on phones, intrinsic from `sm` up: a wizard's Back/Continue
       * pair should stack edge to edge on a 390px screen and sit side by side
       * on a laptop, without either caller re-deciding the breakpoint.
       */
      block: {
        true: "w-full",
        responsive: "w-full sm:w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, block, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, block, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
