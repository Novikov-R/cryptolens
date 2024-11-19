import { Portfolio } from '../types/protfolio';
import { updatePortfolioData } from './useGetPortfolio.ts';

const useDeleteCoinFromStorage = (id: string, timestamp: number) => {
    return () => {
        const portfolio = localStorage.getItem('portfolio');

        if (portfolio) {
            const data: Portfolio = JSON.parse(portfolio);
            data[id] = data[id].filter((value) => value.timestamp !== timestamp);
            localStorage.setItem('portfolio', JSON.stringify(data));
            updatePortfolioData(data);
        }
    };
};

export default useDeleteCoinFromStorage;
