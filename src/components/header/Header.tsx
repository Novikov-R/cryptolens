import { useGetTopCoinsQuery } from '../../api/apiSlice.ts';

import TopCoin from '../topCoin/TopCoin.tsx';
import Portfolio from '../portfolio/Portfolio.tsx';
import Spinner from '../ui/spinner/Spinner.tsx';

const Header = () => {
    const { data: topCoins = { data: [] }, isLoading } = useGetTopCoinsQuery(3);

    return (
        <div className='w-full h-[90px] md:h-[50px] bg-gray-100'>
            <div className='mx-auto w-full h-full max-w-[1440px] flex justify-between'>
                <div className='justify-center md:w-2/5 flex md:flex-row flex-col md:items-center items-start space-x-0 space-y-2 md:space-y-0 px-4 md:space-x-6'>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        topCoins.data.map((coin) => (
                            <TopCoin
                                key={coin.id}
                                id={coin.id}
                                priceUsd={coin.priceUsd}
                                symbol={coin.symbol}
                                rank={coin.rank}
                            />
                        ))
                    )}
                </div>
                <div className='md:w-2/5 flex items-center justify-end'>
                    <Portfolio />
                </div>
            </div>
        </div>
    );
};

export default Header;
