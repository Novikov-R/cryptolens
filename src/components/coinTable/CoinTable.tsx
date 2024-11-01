import { useGetCoinsQuery } from '../../api/apiSlice.ts';
import { useAppSelector } from '../../hooks/hooks.ts';
import { selectAllCoins } from '../../slices/coinSlice.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDeferredValue, useState } from 'react';
import useCoinWebSocket from '../../hooks/useCoinWebSocket.ts';

import Spinner from '../spiner/Spinner.tsx';
import CoinTableItem from '../coinTableItem/CoinTableItem.tsx';
import FilterList from '../filterList/FilterList.tsx';
import Pagination from '../pagination/Pagination.tsx';
import useFilteredCoins from '../../hooks/useFilteredCoins.tsx';

import { Asset } from '../../types/asset';
import AddCoinModal from '../addCoinModal/AddCoinModal.tsx';

const ITEMS_PER_PAGE = 100;
const TOTAL_PAGES = 24;

const CoinTable = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const page = Number(searchParams.get('page')) || 1;
	const offset = (page - 1) * ITEMS_PER_PAGE;

	const { isLoading, isError } = useGetCoinsQuery({ offset });
	const activeCoins = useAppSelector(selectAllCoins);
	const searchValue = useAppSelector(state => state.coins.searchValue);
	const deferredSearchValue = useDeferredValue(searchValue);
	const { filter: activeFilter, reverse: filterReveres } = useAppSelector(state => state.coins.activeFilter);

	useCoinWebSocket({ assetIds: activeCoins.map(coin => coin.id) });

	const filteredCoins = useFilteredCoins({ activeCoins, activeFilter, filterReveres, deferredSearchValue });

	const handlePageChange = (newPage: number) => {
		navigate(`/?page=${newPage}`);
	};

	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className="container mx-auto max-w-[1260px] max-lg:w-full">
			{renderTableContent({ isError, isLoading, filteredCoins, setIsModalOpen })}
			<Pagination
				totalPages={TOTAL_PAGES}
				currentPage={page}
				onPageChange={handlePageChange}
			/>
			<AddCoinModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
		</div>
	);
};

const renderTableContent = ({ isLoading, isError, filteredCoins, setIsModalOpen }: {
	isLoading: boolean,
	isError: boolean,
	filteredCoins: Asset[],
	setIsModalOpen: (state: boolean) => void
}) => {
	if (isLoading) {
		return <Spinner size={48} className="mx-auto mt-2" />;
	}
	if (isError) {
		return <div>Ошибка загрузки монет</div>;
	}
	return (
		<table className="w-full border-collapse border-t-[1px] border-gray-100">
			<FilterList />
			<tbody>
			{filteredCoins.map(coin => (
				<CoinTableItem
					key={coin.id}
					{...coin}
					onAddCoin={setIsModalOpen}
				/>
			))}
			</tbody>
		</table>
	);
};

export default CoinTable;
