import { HTMLAttributes } from 'react';
import clsx from 'clsx';

const Skeleton = ({
					  className,
					  ...props
				  }: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={clsx('animate-pulse bg-gray-300', className)}
			{...props}
		/>
	);
};

export default Skeleton;