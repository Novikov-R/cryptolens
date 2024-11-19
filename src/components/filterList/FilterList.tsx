import { setActiveFilter } from '../../slices/coinSlice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import Triangle from '../ui/triangle/Triangle.tsx';

const FilterList = () => {
    const dispatch = useAppDispatch();

    const { filter, reverse } = useAppSelector((state) => state.coins.activeFilter);

    const thClass =
        "p-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gray-100";

    const renderSortIndicator = (currentFilter: string) => {
        if (filter !== currentFilter) return null;
        const direction = reverse ? 'down' : 'up';
        return <Triangle size={8} color={'#000'} direction={direction} className='mt-1 mx-1'></Triangle>;
    };

    return (
        <thead className='sticky top-0 z-10 bg-white'>
            <tr>
                <th className={thClass}></th>
                <th className={`${thClass} cursor-pointer`} id='rank' onClick={() => dispatch(setActiveFilter('rank'))}>
                    <div className='flex justify-center items-center'># {renderSortIndicator('rank')}</div>
                </th>
                <th className={thClass}>
                    <div>Название</div>
                </th>
                <th className={thClass}>
                    <div>Логотип</div>
                </th>
                <th
                    className={`${thClass} cursor-pointer`}
                    id='priceUsd'
                    onClick={() => dispatch(setActiveFilter('priceUsd'))}
                >
                    <div className='flex justify-center items-center'>Цена {renderSortIndicator('priceUsd')}</div>
                </th>
                <th
                    className={`${thClass} cursor-pointer`}
                    id='marketCapUsd'
                    onClick={() => dispatch(setActiveFilter('marketCapUsd'))}
                >
                    <div className='flex justify-center items-center'>
                        Рыночная капитализация {renderSortIndicator('marketCapUsd')}
                    </div>
                </th>
                <th
                    className={`${thClass} cursor-pointer`}
                    id='changePercent24Hr'
                    onClick={() => dispatch(setActiveFilter('changePercent24Hr'))}
                >
                    <div className='flex justify-center items-center'>
                        24ч % {renderSortIndicator('changePercent24Hr')}
                    </div>
                </th>
            </tr>
        </thead>
    );
};

export default FilterList;
