type PortfolioItem = {
	price: number,
	timestamp: number,
	quantity: number
}

export interface Portfolio {
	[id: string]: PortfolioItem[];
}