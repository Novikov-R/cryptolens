import { useGetTopCoinsQuery } from '../../api/apiSlice.ts';

import TopCoin from '../topCoin/TopCoin.tsx';
import Portfolio from '../portfolio/Portfolio.tsx';
import Spinner from '../ui/spinner/Spinner.tsx';

const Header = () => {
	const { data: topCoins = { data: [] }, isLoading } = useGetTopCoinsQuery(3);

	return (
		<div className="w-full h-[50px] bg-gray-100">
			<div className="mx-auto w-full h-full max-w-[1440px] flex items-center justify-between">
				<div className="w-2/5 flex items-center space-x-6">
					{isLoading ? <Spinner /> : topCoins.data.map((coin) => <TopCoin key={coin.id} id={coin.id}
																					priceUsd={coin.priceUsd}
																					symbol={coin.symbol}
																					rank={coin.rank} />)}
				</div>
				<div className="w-2/5 flex items-center justify-end">
					<Portfolio />
				</div>
			</div>
		</div>
	);
};

export default Header;
