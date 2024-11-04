import { useState } from 'react';
import useGetPortfolio from '../../hooks/useGetPortfolio';
import useFormatNumber from '../../hooks/useFormatNumber';
import useThousandSeparator from '../../hooks/useThousandSeparator';

import { Button } from '../ui/button/Button';
import Modal from '../ui/modal/Modal.tsx';
import PortfolioCoin from '../portfolioCoin/PortfolioCoin.tsx';

const Portfolio = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { cost, dif, difInPercent, portfolioCoins } = useGetPortfolio();

	const formattedCost = useFormatNumber(cost);
	let formattedDif = useThousandSeparator(Math.abs(dif));
	formattedDif = dif === 0
		? '$0'
		: `${dif > 0 ? '+' : '-'} $${formattedDif}`;
	const formattedDifInPercent = useThousandSeparator(difInPercent);


	return (
		<>
			<Button variant={'ghost'} className="flex md:flex-row flex-col" onClick={() => setIsModalOpen(true)}>
				{formattedCost}
				{!!cost && <div
					className="md:ml-1">{formattedDif} ({formattedDifInPercent} %)</div>}
			</Button>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ваш портфель"
				   description={
					   <div>Стоимость вашего портфеля: <span className="font-bold">{formattedCost}</span></div>
				   }
				   footer={<Button variant="default" onClick={() => setIsModalOpen(false)}>Закрыть</Button>}
			>
				<div className="text-center mt-2 text-sm text-gray-600">Список транзакций</div>
				{portfolioCoins.length ? <div className="space-y-3 mt-3 pt-3 border-t-[1px] border-gray-300">
					{portfolioCoins.map((coin, index) => <PortfolioCoin key={index} priceUsd={coin.priceUsd}
																		name={coin.name} quantity={coin.quantity}
																		timestamp={coin.timestamp}
																		symbol={coin.symbol} id={coin.id} />,
					)}
				</div> : <div className="text-center mt-2 text-sm text-gray-600">Транзакции отсутствуют</div>}
			</Modal>
		</>
	);
};

export default Portfolio;
