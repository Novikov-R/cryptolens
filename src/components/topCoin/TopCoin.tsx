import useFormatNumber from '../../hooks/useFormatNumber.ts';
import { Link } from 'react-router-dom';

const TopCoin = ({ priceUsd, rank, symbol, id }: { priceUsd: number, rank: number, symbol: string, id: string }) => {
	return (
		<Link to={`/coin/${id}`}>
			<div className="flex space-x-2 items-center">
				<div className="font-bold mr-1">{rank}:</div>
				<img className="w-6 h-6" src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
					 alt={symbol}></img>
				<div>{useFormatNumber(priceUsd)}</div>
			</div>
		</Link>
	);
};

export default TopCoin;
