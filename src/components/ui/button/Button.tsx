import { ButtonHTMLAttributes, forwardRef } from 'react';
import cn from '../../../utils/cn.ts';

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	size?: 'default' | 'sm' | 'lg' | 'icon';
}

const buttonVariants = {
	base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	variants: {
		default: 'bg-blue-600 text-white hover:bg-blue-500',
		destructive: 'bg-red-600 text-white hover:bg-red-500',
		outline: 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-100',
		secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
		ghost: 'bg-transparent hover:bg-gray-100 text-gray-800',
		link: 'text-blue-600 underline underline-offset-4 hover:no-underline',
	},
	sizes: {
		default: 'h-10 px-4 py-2',
		sm: 'h-9 rounded-md px-3',
		lg: 'h-11 rounded-md px-8',
		icon: 'h-10 w-10',
	},
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
		return (
			<button
				className={cn(
					buttonVariants.base,
					buttonVariants.variants[variant],
					buttonVariants.sizes[size],
					className,
				)}
				ref={ref}
				{...props}
			>
				{children}
			</button>
		);
	},
);
Button.displayName = 'Button';

export { Button };
