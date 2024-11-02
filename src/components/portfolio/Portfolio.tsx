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
	const formattedDif = useThousandSeparator(dif);
	const formattedDifInPercent = useThousandSeparator(difInPercent);

	return (
		<>
			<Button variant={'ghost'} className="flex" onClick={() => setIsModalOpen(true)}>
				{formattedCost}
				{!!cost && <div className="ml-4">{formattedDif} ({formattedDifInPercent} %)</div>}
			</Button>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ваш портфель монет">
				{portfolioCoins.length ? <div className="space-y-3">
					{portfolioCoins.map((coin, index) => <PortfolioCoin key={index} priceUsd={coin.priceUsd}
																		name={coin.name} quantity={coin.quantity}
																		timestamp={coin.timestamp}
																		symbol={coin.symbol} id={coin.id} />,
					)}
				</div> : 'Ваш портфель пуст'}
			</Modal>
		</>
	);
};

export default Portfolio;
