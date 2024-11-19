import Input from '../ui/input/Input.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { ChangeEvent } from 'react';
import { setSearchValue } from '../../slices/coinSlice.ts';

const SearchPanel = () => {
    const dispatch = useAppDispatch();
    const searchValue = useAppSelector((state) => state.coins.searchValue) ?? '';

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValue(e.target.value));
    };

    return (
        <div className='w-1/2 mx-auto my-3 flex items-center h-auto'>
            <Input
                className='flex-1'
                placeholder={'Поиск в таблице'}
                value={searchValue}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchPanel;
