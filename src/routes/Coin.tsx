import { useParams } from 'react-router-dom'
	;
import CoinInfo from '../components/coinInfo/CoinInfo.tsx';
import CoinHistoryChart from '../components/coinHistoryChart/CoinHistoryChart.tsx';

const Coin = () => {
	const { coinId } = useParams();

	return (
		<div
			className="mx-auto w-full max-w-[1440px] flex items-center justify-center mt-3 sm:mt-6 md:px-6">
			<div
				className="bg-white shadow-lg rounded-2xl w-full h-full md:flex border border-gray-200 grid grid-rows-2 grid-cols-1">
				{coinId && (
					<>
						<CoinInfo coinId={coinId} />
						<CoinHistoryChart coinId={coinId} />
					</>
				)}
			</div>
		</div>

	);
};

export default Coin;