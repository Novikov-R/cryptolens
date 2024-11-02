import { useMemo } from 'react';

const useThousandSeparator = (value: number, decimals = 0): string => {
	return useMemo(() => {
		return value.toLocaleString('en-US', {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals,
		});
	}, [value, decimals]);
};

export default useThousandSeparator;