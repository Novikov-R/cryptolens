import { FC, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSelectedCoin } from '../../slices/coinSlice.ts';
import clsx from 'clsx';

import Triangle from '../triangle/Triangle.tsx';
import { useAppDispatch } from '../../hooks/hooks.ts';
import useFormatNumber from '../../hooks/useFormatNumber.ts';
import { Button } from '../button/Button.tsx';

type CoinTableItemProps = {
	id: string;
	symbol: string;
	priceUsd: number;
	changePercent24Hr: number;
	marketCapUsd: number;
	rank: number;
	onAddCoin: (state: boolean) => void
};

const CoinTableItem: FC<CoinTableItemProps> = ({
												   id,
												   symbol,
												   priceUsd,
												   changePercent24Hr,
												   marketCapUsd,
												   rank,
												   onAddCoin,
											   }) => {
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

		const timer = setTimeout(() => {
			setPriceColor('');
		}, 2000);

		setPrevPrice(priceUsd);

		return () => clearTimeout(timer);
	}, [priceUsd, prevPrice]);


	const handelAddCoin = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		dispatch(setSelectedCoin(id));
		onAddCoin(true);
	};

	return (
		<tr
			className="hover:bg-gray-100 cursor-pointer border-y border-gray-100 text-center font-medium text-lg"
			onClick={() => navigate(`/coin/${id}`)}
		>
			<td className="p-3">
				<Button
					variant='outline'
					onClick={handelAddCoin}
					className="w-1/2 h-1/2 group">
					Добавить
				</Button>
			</td>
			<td className="p-3">
				<div>{rank}</div>
			</td>
			<td className="p-3">
				<div>{symbol}</div>
			</td>
			<td className="p-3">
				<div>
					<img
						className="w-6 h-6 mx-auto"
						src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
						alt="logo"
					/>
				</div>
			</td>
			<td className={clsx(
				'p-3 transition-colors ease-in duration-500',
				priceColor,
			)}>
				<div>{useFormatNumber(priceUsd)}</div>
			</td>
			<td className="p-3">
				<div>{useFormatNumber(marketCapUsd)}</div>
			</td>
			<td className="p-3">{renderDif(changePercent24Hr.toString())}</td>
		</tr>
	);
};

const renderDif = (value: string) => {
	const isNegative = value[0] === '-';
	const color = isNegative ? 'text-red-600' : 'text-green-600';
	const triangleDirection = isNegative ? 'down' : 'up';
	const num = isNegative ? Number(value.slice(1)) : Number(value);
	const stringNum = num < 0.01 ? '0.01' : num.toFixed(2);

	return (
		<div className={clsx(color, 'flex justify-center items-center')}>
			<Triangle size={8} color={isNegative ? '#dc2626' : '#16a34a'} direction={triangleDirection}
					  className="mx-1" />
			{stringNum}%
		</div>
	);
};

export default CoinTableItem;
