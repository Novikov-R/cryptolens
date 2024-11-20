import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import useFormatNumber from '../../hooks/useFormatNumber.ts';
import useCoinWebSocket from '../../hooks/useCoinWebSocket.ts';
import { useGetCoinQuery } from '../../api/apiSlice.ts';
import { selectCoinById, setSelectedCoin } from '../../slices/coinSlice.ts';

import AddCoinModal from '../addCoinModal/AddCoinModal.tsx';
import CoinContent from './CoinContent.tsx';
import useThousandSeparator from '../../hooks/useThousandSeparator.ts';

const CoinInfo = ({ coinId }: { coinId: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleModalOpen = () => {
        setIsModalOpen(true);
        dispatch(setSelectedCoin(coinId));
    };

    const handelBack = () => {
        navigate('/');
    };

    const { isLoading, isError } = useGetCoinQuery(coinId);
    const coin = useAppSelector((state) => selectCoinById(state, coinId)) || {
        name: '',
        symbol: '',
        rank: 0,
        supply: 0,
        maxSupply: 0,
        priceUsd: 0,
        marketCapUsd: 0
    };

    useCoinWebSocket({ assetIds: [coinId] });

    const formattedSupply = useThousandSeparator(coin.supply);
    const formattedMaxSupply = useThousandSeparator(coin.maxSupply);
    const formattedPriceUsd = useFormatNumber(coin.priceUsd);
    const formattedMarketCapUsd = useFormatNumber(coin.marketCapUsd);

    return (
        <>
            <CoinContent
                isError={isError}
                isLoading={isLoading}
                handelBack={handelBack}
                coin={{
                    ...coin,
                    formattedPriceUsd,
                    formattedMarketCapUsd,
                    formattedSupply,
                    formattedMaxSupply
                }}
                handleModalOpen={handleModalOpen}
            />
            <AddCoinModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </>
    );
};

export default CoinInfo;
