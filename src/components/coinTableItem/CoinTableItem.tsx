import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import Triangle from '../triangle/Triangle.tsx';

type CoinTableItemProps = {
	id: string;
	symbol: string;
	priceUsd: number;
	changePercent24Hr: number;
	marketCapUsd: number;
	rank: number;
};

const CoinTableItem: FC<CoinTableItemProps> = ({ id, symbol, priceUsd, changePercent24Hr, marketCapUsd, rank }) => {
	const navigate = useNavigate();

	const formatNumber = (value: number) => {
		return value < 0.01
			? '$0.01'
			: '$' +
			new Intl.NumberFormat('en', {
				notation: 'compact',
				maximumFractionDigits: 2,
			}).format(value);
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

	return (
		<tr
			className="hover:bg-gray-100 cursor-pointer border-y border-gray-100 text-center font-medium text-lg"
			onClick={() => navigate(`/coin/${id}`)}
		>
			<td className="p-3"></td>
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
			<td className="p-3">
				<div>{formatNumber(priceUsd)}</div>
			</td>
			<td className="p-3">
				<div>{formatNumber(marketCapUsd)}</div>
			</td>
			<td className="p-3">{renderDif(changePercent24Hr.toString())}</td>
		</tr>
	);
};

export default CoinTableItem;
