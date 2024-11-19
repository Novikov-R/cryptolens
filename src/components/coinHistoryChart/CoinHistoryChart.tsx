import { ChangeEvent, useState } from 'react';
import { useGetCoinHistoryQuery } from '../../api/apiSlice.ts';

import Spinner from '../ui/spinner/Spinner.tsx';
import Chart from '../chart/Chart.tsx';

import { Interval } from '../../types/api';

const CoinHistoryChart = ({ coinId }: { coinId: string }) => {
    const [interval, setIntervalValue] = useState<Interval>('m1');
    const { isLoading, isError, data } = useGetCoinHistoryQuery({ interval, id: coinId });

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setIntervalValue(event.target.value as Interval);
    };

    const renderLoadingOrError = () => {
        if (isLoading) {
            return <Spinner className='mx-auto' />;
        }

        if (isError) {
            return <div className='mx-auto'>Ошибка</div>;
        }

        return null;
    };

    const loadingOrError = renderLoadingOrError();

    return (
        <div className='flex flex-col w-full md:w-2/3 p-6 bg-white'>
            {loadingOrError || (
                <>
                    <label htmlFor='timeframe' className='text-gray-500 mb-2 font-medium'>
                        Выберите период времени
                    </label>
                    <select
                        id='timeframe'
                        className='w-1/3 border rounded-lg p-2 mb-6 text-gray-700 shadow-sm'
                        value={interval}
                        onChange={handleSelectChange}
                    >
                        <option value='h1'>1 час</option>
                        <option value='h12'>12 часов</option>
                        <option value='m1'>24 часа</option>
                    </select>
                    <div className='w-full h-full bg-gray-100 border border-gray-200 rounded-lg shadow-inner flex items-center justify-center'>
                        {data?.data ? (
                            <Chart data={data.data} />
                        ) : (
                            <p className='text-gray-400'>Нет данных для отображения</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default CoinHistoryChart;
