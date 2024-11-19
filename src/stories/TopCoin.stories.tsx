import type { Meta, StoryFn } from '@storybook/react';
import TopCoin from '../components/topCoin/TopCoin.tsx';

const meta: Meta<typeof TopCoin> = {
    title: 'Components/TopCoin',
    component: TopCoin,
    parameters: {
        docs: {
            description: {
                component: 'Компонент для отображения информации о популярной монете, включая её цену, ранг и символ.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        priceUsd: {
            control: { type: 'number' },
            description: 'Цена монеты в долларах США.',
        },
        rank: {
            control: { type: 'number' },
            description: 'Ранг монеты.',
        },
        symbol: {
            control: { type: 'text' },
            description: 'Символ монеты.',
        },
        id: {
            control: { type: 'text' },
            description: 'Идентификатор монеты для ссылки.',
        },
    },
};

export default meta;

const Template: StoryFn<typeof TopCoin> = (args) => <TopCoin {...args} />;

export const Default = Template.bind({});
Default.args = {
    priceUsd: 1000,
    rank: 1,
    symbol: 'BTC',
    id: 'bitcoin',
};

export const WithLowPrice = Template.bind({});
WithLowPrice.args = {
    priceUsd: 0.005,
    rank: 2,
    symbol: 'ETH',
    id: 'ethereum',
};
