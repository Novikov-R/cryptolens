import { ChangeEvent, KeyboardEvent, useState } from 'react';

const useBoundedInput = (initialValue: number, minValue: number, maxValue: number) => {
    const [value, setValue] = useState(initialValue.toString());

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'ArrowUp') {
            setValue((prevState) => (Number(prevState) < maxValue ? (Number(prevState) + 1).toString() : prevState));
        }

        if (e.code === 'ArrowDown') {
            setValue((prevState) => (Number(prevState) > minValue ? (Number(prevState) - 1).toString() : prevState));
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        if (/^0\d+/.test(newValue)) {
            newValue = newValue.replace(/^0/, '');
        }
        if (!/^(0|-?([1-9]\d*|0)?([.,]\d{0,18})?)$/.test(newValue)) {
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
        onKeyDown
    };
};

export default useBoundedInput;
