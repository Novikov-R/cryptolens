import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSelectedCoin } from '../../slices/coinSlice.ts';
import cn from '../../utils/cn.ts';

import Triangle from '../ui/triangle/Triangle.tsx';
import { useAppDispatch } from '../../hooks/hooks.ts';
import useFormatNumber from '../../hooks/useFormatNumber.ts';
import { Button } from '../ui/button/Button.tsx';

export type CoinTableItemProps = {
    id: string;
    symbol: string;
    priceUsd: number;
    changePercent24Hr: number;
    marketCapUsd: number;
    rank: number;
    onAddCoin: (state: boolean) => void;
};

const CoinTableItem = ({
    id,
    symbol,
    priceUsd,
    changePercent24Hr,
    marketCapUsd,
    rank,
    onAddCoin
}: CoinTableItemProps) => {
    const navigate = useNavigate();
    const [prevPrice, setPrevPrice] = useState(priceUsd);
    const [priceColor, setPriceColor] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (priceUsd > prevPrice) {
            setPriceColor('text-green-600');
        } else if (priceUsd < prevPrice) {
            setPriceColor('text-red-600');
        }

        const timer = setTimeout(() => setPriceColor(''), 2000);

        setPrevPrice(priceUsd);

        return () => clearTimeout(timer);
    }, [priceUsd, prevPrice]);

    const handleAddCoin = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        dispatch(setSelectedCoin(id));
        onAddCoin(true);
    };

    return (
        <tr
            className='hover:bg-gray-100 cursor-pointer border-y border-gray-100 text-center font-medium text-lg'
            onClick={() => navigate(`/coin/${id}`)}
        >
            <td className='py-3 px-1 md:p-3'>
                <Button
                    variant='outline'
                    onClick={handleAddCoin}
                    className='w-full md:w-1/2 h-1/2 group'
                    data-testid='addBtn'
                >
                    Добавить
                </Button>
            </td>
            <td className='py-3 md:p-3'>
                <div>{rank}</div>
            </td>
            <td className='py-3 md:p-3'>
                <div>{symbol}</div>
            </td>
            <td className='py-3 md:p-3'>
                <div>
                    <img
                        className='w-6 h-6 mx-auto'
                        src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
                        alt={symbol}
                    />
                </div>
            </td>
            <td className={cn('py-3 md:p-3 transition-colors ease-in duration-500', priceColor)}>
                <div>{useFormatNumber(priceUsd)}</div>
            </td>
            <td className='py-3 md:p-3'>
                <div>{useFormatNumber(marketCapUsd)}</div>
            </td>
            <td className='py-3 md:p-3'>{renderChange(changePercent24Hr.toString())}</td>
        </tr>
    );
};

const renderChange = (value: string) => {
    const isNegative = value.startsWith('-');
    const color = isNegative ? 'text-red-600' : 'text-green-600';
    const triangleDirection = isNegative ? 'down' : 'up';
    const num = Math.abs(Number(value));
    const formattedNum = num < 0.01 ? '0.01' : num.toFixed(2);

    return (
        <div className={cn(color, 'flex justify-center items-center')}>
            <Triangle
                size={8}
                color={isNegative ? '#dc2626' : '#16a34a'}
                direction={triangleDirection}
                className='mx-1'
            />
            {formattedNum}%
        </div>
    );
};

export default CoinTableItem;
