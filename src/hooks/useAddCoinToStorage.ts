import { updatePortfolioData } from './useGetPortfolio.ts';
import { Portfolio } from '../types/protfolio';

const useAddCoinToStorage = () => {
	return (id: string, price: number, timestamp: number, quantity: number) => {
		const portfolio: Portfolio = JSON.parse(localStorage.getItem('portfolio') ?? '{}');
		if (!portfolio[id]) {
			portfolio[id] = [];
		}
		portfolio[id].push({ price, timestamp, quantity });
		localStorage.setItem('portfolio', JSON.stringify(portfolio));
		updatePortfolioData(portfolio);
	};
};

export default useAddCoinToStorage;