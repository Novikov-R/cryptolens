import { useGetCoinsQuery } from '../../api/apiSlice.ts';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

import Spinner from '../spiner/Spinner.tsx';
import CoinTableItem from '../coinTableItem/CoinTableItem.tsx';
import { RootState } from '../../store';
import { selectAllCoins, setError } from '../../slices/coinSlice.ts';
import useCoinWebSocket from '../../hooks/useCoinWebSocket.ts';

const CoinTable = () => {
	const [searchParams] = useSearchParams();
	const page = searchParams.get('page');

	const offset = page ? (Number(page) - 1) * 100 : 0;
	//count of coins is 2201
	const { isLoading, isError, error } = useGetCoinsQuery({ offset });

	const activeCoins = useSelector((state: RootState) => selectAllCoins(state));

	const activeFilter = useSelector((state: RootState) => state.coins.activeFilter);

	const assetIds = activeCoins.map(coin => coin.id);

	useCoinWebSocket({ assetIds });

	const filteredCoins = useMemo(() => {
		const filteredCoins = activeCoins.slice();

		if (activeFilter === 'rank') {
			return filteredCoins;
		} else {
			return filteredCoins.sort((a, b) => b[activeFilter] - a[activeFilter]);
		}
	}, [activeCoins, activeFilter]);


	const thClass = 'p-3 relative after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gray-100';

	const renderTable = () => {
		if (isLoading) {
			return <Spinner></Spinner>;
		}
		if (isError) {
			setError(error);
			return <div>error</div>;
		}
		return (
			<table className="w-full border-collapse">
				<thead className="sticky top-0 z-10 bg-white">
				<tr>
					<th className={thClass}></th>
					<th className={thClass}>
						<div>#</div>
					</th>
					<th className={thClass}>
						<div>Название</div>
					</th>
					<th className={thClass}>
						<div>Логотип</div>
					</th>
					<th className={thClass}>
						<div>Цена</div>
					</th>
					<th className={thClass}>
						<div>Рыночная капитализация</div>
					</th>
					<th className={thClass}>
						<div>24ч %</div>
					</th>
				</tr>
				</thead>

				<tbody>
				{filteredCoins.map((coin) => (
					<CoinTableItem
						key={coin.id}
						symbol={coin.symbol}
						marketCapUsd={coin.marketCapUsd}
						changePercent24Hr={coin.changePercent24Hr}
						rank={coin.rank}
						priceUsd={coin.priceUsd}
						id={coin.id} />
				))}
				</tbody>
			</table>
		);
	};

	return (
		<div className="container mx-auto max-w-[1260px] max-lg:w-full">
			{renderTable()}
		</div>
	);
};

export default CoinTable;
