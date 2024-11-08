import { ChangeEvent, useState } from 'react';

const useBoundedInput = (initialValue: number, minValue: number, maxValue: number) => {
	const [value, setValue] = useState(initialValue.toString());

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		let newValue = e.target.value;
		if (!/^-?\d*[.,]?\d{0,18}$/.test(newValue)) {
			return;
		}

		if (newValue === '') {
			setValue('');
			return;
		}

		newValue = newValue.replace(',', '.');

		const numValue = parseFloat(newValue);

		if (!isNaN(Number(numValue)) && numValue >= minValue && numValue <= maxValue) {
			setValue(newValue);
		}
	};

	const clearValue = () => {
		setValue('');
	};

	return {
		value,
		onChange,
		clearValue,
	};
};

export default useBoundedInput;
