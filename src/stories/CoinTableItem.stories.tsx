import { Meta, StoryFn } from '@storybook/react';
import CoinTableItem, { CoinTableItemProps } from '../components/coinTableItem/CoinTableItem.tsx';

const meta: Meta<typeof CoinTableItem> = {
    title: 'Components/CoinTableItem',
    component: CoinTableItem,
    parameters: {
        docs: {
            description: {
                component: 'Строка таблицы с информацией о монете'
            }
        }
    },
    argTypes: {
        id: {
            control: 'text'
        },
        symbol: {
            control: 'text'
        },
        priceUsd: {
            control: 'number'
        },
        changePercent24Hr: {
            control: 'number'
        },
        marketCapUsd: {
            control: 'number'
        },
        rank: {
            control: 'number'
        }
    },
    args: {
        id: 'btc',
        symbol: 'BTC',
        priceUsd: 50000,
        changePercent24Hr: 2.5,
        marketCapUsd: 900000000,
        rank: 1,
        onAddCoin: () => {}
    },
    tags: ['autodocs']
};

export default meta;

const Template: StoryFn<CoinTableItemProps> = (args) => (
    <table className='w-full'>
        <tbody>
            <CoinTableItem {...args} />
        </tbody>
    </table>
);

export const Default = Template.bind({});
Default.args = {
    changePercent24Hr: 2.5
};

export const NegativeChange = Template.bind({});
NegativeChange.args = {
    changePercent24Hr: -3.8
};
