import Modal from '../modal/Modal.tsx';
import { Form } from 'react-router-dom';
import Input from '../input/Input.tsx';
import { Button } from '../button/Button.tsx';
import { useAppSelector } from '../../hooks/hooks.ts';
import { selectCoinById } from '../../slices/coinSlice.ts';
import useFormatNumber from '../../hooks/useFormatNumber.ts';
import useBoundedInput from '../../hooks/useBoundedInput.ts';
import useAddCoinToStorage from '../../hooks/useAddCoinToStorage.ts';

const AddCoinModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) => {
	const { onChange: onChangeCount, value: countOfCoins } = useBoundedInput(0, 0, 2000);

	const selectedCoinId = useAppSelector(state => state.coins.selectedCoin);
	const selectedCoin = useAppSelector(state =>
		selectedCoinId ? selectCoinById(state, selectedCoinId) : null,
	);

	const { name = '', priceUsd = 0 } = selectedCoin || {};

	const addCoinToStorage = useAddCoinToStorage();

	const handleAddCoin = () => {
		if (selectedCoinId) {
			addCoinToStorage(selectedCoinId, priceUsd, Date.now(), Number(countOfCoins));
		}
		setIsOpen(false);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
			title={`Добавить транзакцию с ${name}`}
			description={`Цена одной монеты ${useFormatNumber(priceUsd)}`}
		>
			<Form>
				<Input placeholder="0" onChange={onChangeCount} value={countOfCoins} />
				<div className="mt-2 text-center">Общая сумма: <span
					className="font-bold">{useFormatNumber(priceUsd * Number(countOfCoins))}</span>
				</div>
				<div className="flex mt-4">
					<Button variant="outline" onClick={() => setIsOpen(false)}
							className="text-gray-500 hover:text-gray-700 mr-2">
						Отмена
					</Button>
					<Button type="submit" variant="outline" onClick={handleAddCoin}>
						Подтвердить
					</Button>
				</div>
			</Form>
		</Modal>
	);
};

export default AddCoinModal;
