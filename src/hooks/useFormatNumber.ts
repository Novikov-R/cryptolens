import { useMemo } from 'react';

const useFormatNumber = (value: number) => {
	return useMemo(() => {
		if (value < 0.01 && value !== 0) {
			return '$0.01';
		}
		return '$' + new Intl.NumberFormat('en', {
			notation: 'compact',
			maximumFractionDigits: 2,
		}).format(value);
	}, [value]);
};

export default useFormatNumber;
