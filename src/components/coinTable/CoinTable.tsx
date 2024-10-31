import { useGetCoinsQuery } from '../../api/apiSlice.ts';
import { useAppSelector } from '../../hooks/hooks.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDeferredValue, useMemo } from 'react';

import Spinner from '../spiner/Spinner.tsx';
import CoinTableItem from '../coinTableItem/CoinTableItem.tsx';
import { selectAllCoins, setError } from '../../slices/coinSlice.ts';
import useCoinWebSocket from '../../hooks/useCoinWebSocket.ts';
import FilterList from '../filterList/FilterList.tsx';
import SearchPanel from '../searchPanel/SearchPanel.tsx';
import Pagination from '../pagination/Pagination.tsx';

const CoinTable = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const pageParam = searchParams.get('page');
	const page = pageParam ? Number(pageParam) : 1;
	const offset = (page - 1) * 100;
	const totalPages = 23;

	const handlePageChange = (page: number) => {
		navigate(`/?page=${page}`);
	};


	//count of coins is 2201
	const { isLoading, isFetching, isError } = useGetCoinsQuery({ offset });
	const activeCoins = useAppSelector(state => selectAllCoins(state));

	const searchValue = useAppSelector(state => state.coins.searchValue);
	const deferredSearchValue = useDeferredValue(searchValue);

	const {
		filter: activeFilter,
		reverse: filterReveres,
	} = useAppSelector(state => state.coins.activeFilter);


	const assetIds = useMemo(() => activeCoins.map(coin => coin.id), [activeCoins]);
	useCoinWebSocket({ assetIds });


	const filteredCoins = useMemo(() => {
		const filteredCoins = activeCoins.filter((coin) => {
				const normalizedSearchValue = deferredSearchValue?.toLowerCase() || '';
				return coin.name.toLowerCase().includes(normalizedSearchValue) || coin.symbol.toLowerCase().includes(normalizedSearchValue);
			},
		);
		return filteredCoins.sort((a, b) =>
			filterReveres ? b[activeFilter] - a[activeFilter] : a[activeFilter] - b[activeFilter],
		);
	}, [activeCoins, deferredSearchValue, activeFilter, filterReveres]);

	const renderTable = () => {
		if (isLoading || isFetching) {
			return <Spinner className="mx-auto"></Spinner>;
		}
		if (isError) {
			setError(true);
			return <div>error</div>;
		}

		return (
			<>
				<SearchPanel />
				<table className="w-full border-collapse border-t-[1px] border-gray-100">
					<FilterList />
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
				<Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageChange} />
			</>
		);
	};

	return (
		<div className="container mx-auto max-w-[1260px] max-lg:w-full">
			{renderTable()}
		</div>
	);
};

export default CoinTable;
