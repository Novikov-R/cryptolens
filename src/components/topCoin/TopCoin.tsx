import useFormatNumber from '../../hooks/useFormatNumber.ts';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface TopCoinProps {
	priceUsd: number;
	rank: number;
	symbol: string;
	id: string;
}

const TopCoin: FC<TopCoinProps> = ({ priceUsd, rank, symbol, id }) => {
	const formattedPrice = useFormatNumber(priceUsd);

	return (
		<Link to={`/coin/${id}`}>
			<div className="flex space-x-2 items-center">
				<div className="font-bold mr-1">{rank}:</div>
				<img
					className="w-6 h-6"
					src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
					alt={symbol}
				/>
				<div>{formattedPrice}</div>
			</div>
		</Link>
	);
};

export default TopCoin;