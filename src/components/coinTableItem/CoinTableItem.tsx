import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

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
		return value < 0.01 ? '$' + 0.01 : '$' + new Intl.NumberFormat('en', {
			notation: 'compact',
			maximumFractionDigits: 2,
		}).format(value);
	};

	const renderDif = (value: string) => {
		let color: string;
		let num: number;
		let triangle;

		if (value[0] === '-') {
			color = 'red-600';
			triangle = (
				<div
					className="w-0 h-0 border-l-[4px] border-r-[4px] border-l-transparent border-r-transparent border-t-[8px] border-t-red-600 mr-1 mt-0.5"></div>
			);
			num = Number(value.slice(1));
		} else {
			color = 'green-600';
			triangle = (
				<div
					className="w-0 h-0 border-l-[4px] border-r-[4px] border-l-transparent border-r-transparent border-b-[8px] border-b-green-600 mr-1 mt-0.5" />
			);
			num = Number(value);
		}

		const stringNum = num < 0.01 ? '0.01' : num.toFixed(2);

		return (
			<div className={`text-${color} flex justify-center items-center`}>
				{triangle}
				{stringNum}%
			</div>
		);
	};

	return (
		<tr className="hover:bg-gray-100 cursor-pointer border-y border-gray-100 text-center font-medium text-lg"
			onClick={() => navigate(`/coin/${id}`)}>
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
			<td className="p-3">
				{renderDif(changePercent24Hr.toString())}
			</td>
		</tr>
	);
};

export default CoinTableItem;
