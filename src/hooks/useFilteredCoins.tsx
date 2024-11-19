import { useMemo } from 'react';
import { Asset } from '../types/asset';
import { Filter } from '../types/filter';

const useFilteredCoins = ({
    activeCoins,
    deferredSearchValue,
    activeFilter,
    filterReveres,
}: {
    activeCoins: Asset[];
    deferredSearchValue: string | null;
    activeFilter: Filter;
    filterReveres: boolean;
}) => {
    return useMemo(() => {
        const normalizedSearchValue = deferredSearchValue?.toLowerCase() || '';
        const filteredCoins = activeCoins.filter((coin) => {
            return (
                coin.name.toLowerCase().includes(normalizedSearchValue) ||
                coin.symbol.toLowerCase().includes(normalizedSearchValue)
            );
        });
        return filteredCoins.sort((a, b) =>
            filterReveres ? b[activeFilter] - a[activeFilter] : a[activeFilter] - b[activeFilter]
        );
    }, [activeCoins, deferredSearchValue, activeFilter, filterReveres]);
};

export default useFilteredCoins;
