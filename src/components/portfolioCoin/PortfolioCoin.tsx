import { FC } from 'react';
import useFormatNumber from '../../hooks/useFormatNumber.ts';
import { Button } from '../ui/button/Button.tsx';
import useDeleteCoinFromStorage from '../../hooks/useDeleteCoinFromStorage.ts';

type PortfolioCoinProps = {
	timestamp: number,
	symbol: string,
	name: string,
	priceUsd: number,
	quantity: number,
	id: string
}

const PortfolioCoin: FC<PortfolioCoinProps> = ({ timestamp, symbol, name, quantity, priceUsd, id }) => {
	const deleteCoin = useDeleteCoinFromStorage(id, timestamp);

	const date = new Date(timestamp);

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return <div
		className="flex items-center space-x-2 border-gray-400">
		<div>{day}.{month}.{year}</div>
		<img className="w-6 h-6"
			 src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
			 alt={symbol} />
		<div>{name}</div>
		<div>{useFormatNumber(priceUsd * quantity)}</div>
		<Button variant="default" onClick={deleteCoin}>Удалить</Button>
	</div>;
};

export default PortfolioCoin;
