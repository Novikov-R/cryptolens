import { FC } from 'react';
import cn from '../../../utils/cn.ts';

export type TriangleProps = {
    size: number;
    color: string;
    direction: 'up' | 'down';
    className?: string;
};

const Triangle: FC<TriangleProps> = ({ size, color, direction, className }) => {
    const triangleClass = 'w-0 h-0 border-l-[${borderSize / 2}px] border-r-[${borderSize / 2}px] border-transparent';

    const borderStyle = {
        borderLeftWidth: `${size / 2}px`,
        borderRightWidth: `${size / 2}px`,
        borderBottomWidth: direction === 'up' ? `${size}px` : '0',
        borderTopWidth: direction === 'down' ? `${size}px` : '0',
        borderBottomColor: direction === 'up' ? color : 'transparent',
        borderTopColor: direction === 'down' ? color : 'transparent',
    };

    return <div className={cn(triangleClass, className)} style={borderStyle} />;
};

export default Triangle;
