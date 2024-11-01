const useFormatNumber = (value: number) => {
	return value < 0.01 && value !== 0
		? '$0.01'
		: '$' +
		new Intl.NumberFormat('en', {
			notation: 'compact',
			maximumFractionDigits: 2,
		}).format(value);
};

export default useFormatNumber;