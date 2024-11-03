import { useEffect, useState } from 'react';

import { AssetResponse } from '../types/api';
import { Portfolio } from '../types/protfolio';
import { Asset } from '../types/asset';

export type PortfolioCoin = Asset & {
	quantity: number;
	timestamp: number
};


type PortfolioData = {
	cost: number,
	dif: number,
	difInPercent: number,
	portfolioCoins: PortfolioCoin[]
};

const useGetPortfolio = () => {
	const [portfolioData, setPortfolioData] = useState<PortfolioData>({
		cost: 0,
		dif: 0,
		difInPercent: 0,
		portfolioCoins: [],
	});

	const loadPortfolioData = async () => {
		const data = localStorage.getItem('portfolio');
		if (data) {
			const portfolio: Portfolio = JSON.parse(data);

			const ids = Object.keys(portfolio);
			const portfolioCoins: PortfolioCoin[] = [];
			let newTotalSum = 0;
			let totalSum = 0;

			await Promise.all(
				ids.map(async (id) => {
					const coin: AssetResponse = await fetchCoinData(id);
					totalSum += portfolio[id].reduce((acc, val) => {
						portfolioCoins.push({ ...coin.data, quantity: val.quantity, timestamp: val.timestamp });
						const count = Number(val.quantity);
						newTotalSum += Number(coin.data.priceUsd) * count;
						return acc + Number(val.price) * count;
					}, 0);
				}),
			);

			const dif = newTotalSum - totalSum;
			const difInPercent = totalSum ? (newTotalSum - totalSum) / totalSum * 100 : 0;

			setPortfolioData({
				cost: newTotalSum,
				dif,
				difInPercent,
				portfolioCoins,
			});
		}
	};

	useEffect(() => {
		loadPortfolioData();

		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === 'portfolio') {
				loadPortfolioData();
			}
		};

		const handlePortfolioUpdate = () => {
			loadPortfolioData();
		};

		window.addEventListener('storage', handleStorageChange);
		window.addEventListener('portfolioUpdate', handlePortfolioUpdate);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
			window.removeEventListener('portfolioUpdate', handlePortfolioUpdate);
		};
	}, []);

	return portfolioData;
};

export const updatePortfolioData = (newData: Portfolio) => {
	localStorage.setItem('portfolio', JSON.stringify(newData));
	const event = new CustomEvent('portfolioUpdate');
	window.dispatchEvent(event);
};

const fetchCoinData = async (id: string): Promise<AssetResponse> => {
	const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);

	if (!response.ok) {
		throw new Error(`Ошибка при загрузке данных: ${response.statusText}`);
	}

	return await response.json();
};

export default useGetPortfolio;
