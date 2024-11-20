import cn from '../../../utils/cn.ts';

interface SpinnerProps {
    size?: number;
    color?: string;
    className?: string;
}

const Spinner = ({ size = 24, color = '#3b82f6', className = '' }: SpinnerProps) => {
    const isTailwindColor = color.includes('-');
    const colorClass = isTailwindColor ? `border-${color}` : '';
    const styleColor = !isTailwindColor ? { borderColor: color, borderTopColor: 'transparent' } : {};

    return (
        <div
            className={cn('rounded-full border-4 border-t-transparent animate-spin', colorClass, className)}
            style={{
                width: size,
                height: size,
                ...styleColor
            }}
        />
    );
};

export default Spinner;
