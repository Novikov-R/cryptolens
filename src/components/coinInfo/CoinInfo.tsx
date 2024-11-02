import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import useFormatNumber from '../../hooks/useFormatNumber.ts';
import useCoinWebSocket from '../../hooks/useCoinWebSocket.ts';
import { useGetCoinQuery } from '../../api/apiSlice.ts';
import { selectCoinById, setSelectedCoin } from '../../slices/coinSlice.ts';

import AddCoinModal from '../addCoinModal/AddCoinModal.tsx';
import renderCoinContent from './renderCoinContent.tsx';

const CoinInfo = ({ coinId }: { coinId: string }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useAppDispatch();
	const handleModalOpen = () => {
		setIsModalOpen(true);
		dispatch(setSelectedCoin(coinId));
	};

	const navigate = useNavigate();
	const handelBack = () => {
		navigate(-1);
	};

	const { isLoading, isError } = useGetCoinQuery(coinId);
	const coin = useAppSelector(state => selectCoinById(state, coinId)) || {
		name: '',
		symbol: '',
		rank: 0,
		supply: 0,
		maxSupply: 0,
		priceUsd: 0,
		marketCapUsd: 0,
	};

	useCoinWebSocket({ assetIds: [coinId] });

	const formattedPriceUsd = useFormatNumber(coin.priceUsd);
	const formattedMarketCapUsd = useFormatNumber(coin.marketCapUsd);

	return (
		<>
			{renderCoinContent({
				isError,
				isLoading,
				handelBack,
				coin: { ...coin, formattedPriceUsd, formattedMarketCapUsd },
				handleModalOpen,
			})}
			<AddCoinModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
		</>

	);
};

export default CoinInfo;
