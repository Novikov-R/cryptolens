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
        const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${assetIds.join(',')}`);

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
