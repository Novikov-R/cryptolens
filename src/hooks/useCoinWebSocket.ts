import { useEffect } from 'react';
import { setCoinPriceUpdates } from '../slices/coinSlice';
import { useAppDispatch } from './hooks.ts';

interface PriceUpdate {
    [id: string]: number;
}

const useCoinWebSocket = ({ assetIds }: { assetIds: string[] }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (assetIds.length === 0) {
            return;
        }
        const pricesWs = new WebSocket(`wss://wss.coincap.io/prices?assets=${assetIds.join(',')}&apiKey=922270bf460c0c898a76c468c877e25dd12e4fc1761064b38911e4be232d2760`);

        pricesWs.onmessage = function (msg: MessageEvent) {
            const data: PriceUpdate = JSON.parse(msg.data);

            const updates = Object.entries(data).map(([id, price]) => ({
                id,
                priceUsd: Number(price)
            }));

            dispatch(setCoinPriceUpdates(updates));
        };

        return () => {
            pricesWs.close();
        };
    }, [assetIds, dispatch]);
};

export default useCoinWebSocket;
