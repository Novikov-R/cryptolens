const useAddCoinToStorage = () => {
	return (id: string, price: number, date: number, count: number) => {
		const portfolio = JSON.parse(localStorage.getItem('portfolio') ?? '{}');
		if (!portfolio[id]) {
			portfolio[id] = [];
		}
		portfolio[id].push({ price, date, count });
		localStorage.setItem('portfolio', JSON.stringify(portfolio));
	};
};

export default useAddCoinToStorage;