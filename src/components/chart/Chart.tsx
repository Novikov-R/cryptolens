import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import { AssetHistory } from '../../types/asset';

const Chart = ({ data }: { data: AssetHistory[] }) => {
    const seriesData = useMemo(() => data.map((item) => [item.time, parseFloat(String(item.priceUsd))]), [data]);

    const averagePrice = useMemo(() => {
        const total = seriesData.reduce((sum, point) => sum + point[1], 0);
        return total / seriesData.length;
    }, [seriesData]);

    const options = useMemo(
        () => ({
            chart: {
                type: 'area',
                backgroundColor: '#f4f4f4',
                spacing: [10, 10, 10, 10],
                height: '100%',
            },
            title: {
                text: '',
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Время',
                    style: { fontWeight: 'bold' },
                },
                labels: {
                    format: '{value:%e %b, %H:%M}',
                    rotation: -45,
                    align: 'right',
                },
                gridLineWidth: 1,
            },
            yAxis: {
                title: {
                    text: 'Цена (USD)',
                    style: { fontWeight: 'bold' },
                },
                plotLines: [
                    {
                        color: '#888',
                        width: 1,
                        value: averagePrice,
                        dashStyle: 'ShortDash',
                    },
                ],
            },
            tooltip: {
                shared: true,
                xDateFormat: '%A, %b %e, %H:%M',
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: `<span style="color:{point.color}">\u25CF</span> <span style="font-weight: bold">Цена в USD:</span> <b>{point.y:.6f}</b><br/>`,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: '#999999',
                borderRadius: 5,
                borderWidth: 1,
                style: {
                    fontSize: '12px',
                    padding: '10px',
                },
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 3,
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1,
                        },
                    },
                    threshold: averagePrice,
                    color: 'rgba(0, 255, 127, 1)',
                    negativeColor: 'rgba(255, 99, 71, 1)',
                },
            },
            series: [
                {
                    name: 'Цена в USD',
                    data: seriesData,
                    type: 'area',
                },
            ],
        }),
        [seriesData, averagePrice]
    );

    return (
        <div className='w-full'>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default Chart;
