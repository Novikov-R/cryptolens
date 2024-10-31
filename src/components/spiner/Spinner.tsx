import type { FC } from 'react';

interface SpinnerProps {
	size?: number;
	color?: string;
	className?: string;
}

const Spinner: FC<SpinnerProps> = ({ size = 24, color = '#334155', className = '' }) => {
	const isTailwindColor = color.includes('-');
	const colorClass = isTailwindColor ? `border-${color}` : '';
	const styleColor = !isTailwindColor ? { borderColor: color, borderTopColor: 'transparent' } : {};

	return (
		<div
			className={`rounded-full border-4 border-t-transparent animate-spin ${colorClass} ${className}`}
			style={{
				width: size,
				height: size,
				...styleColor,
			}}
		/>
	);
};

export default Spinner;
