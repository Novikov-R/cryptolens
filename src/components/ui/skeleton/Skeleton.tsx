import { HTMLAttributes } from 'react';
import cn from '../../../utils/cn.ts';

const Skeleton = ({
					  className,
					  ...props
				  }: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn('animate-pulse rounded-md bg-gray-300', className)}
			{...props}
		/>
	);
};

export default Skeleton;