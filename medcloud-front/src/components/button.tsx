import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";


const buttonVariants = tv({
    base: "rounded-lg text-center flex items-center justify-center gap-2 text-white border-transparent",
  
    variants: {
      variant: {
        primary: "bg-cyan-550 hover:bg-cyan-600",
        secondary: "bg-blue-600 hover:bg-blue-700",
        tertiary: "bg-zinc-500 hover:bg-zinc-600",
        quaternary: "bg-red-600 hover:bg-red-700",
        quinary: "bg-white hover:bg-zinc-200 text-zinc-700 border border-zinc-200"
      },
  
      size: {
          default: 'py-1.5 px-8 text-sm',
          search: 'py-3',
          modal: 'px-4 py-1.5 text-sm'
      },
    },
  
    defaultVariants: {
      variant: "primary",
      size: "default"
    },
  });

interface ButtonProps extends ComponentProps<"button">,
VariantProps<typeof buttonVariants> {
children: ReactNode;
}

export function Button({ children, variant, size, ...props }: ButtonProps) {
    return(
        <button {...props} className={buttonVariants({ variant, size})}>
            {children}
        </button>
    )
}