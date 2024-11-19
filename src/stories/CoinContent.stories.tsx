import { Meta, StoryFn } from '@storybook/react';
import CoinContent, { CoinContentProps } from '../components/coinInfo/CoinContent.tsx';

const meta: Meta = {
    title: 'Components/CoinContent',
    component: CoinContent,
    argTypes: {
        isLoading: { control: 'boolean' },
        isError: { control: 'boolean' },
        handleModalOpen: { action: 'handleModalOpen' },
        handelBack: { action: 'handelBack' },
    },
    tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<CoinContentProps> = (args) => <CoinContent {...args} />;

export const Default = Template.bind({});
Default.args = {
    isLoading: false,
    isError: false,
    coin: {
        name: 'Bitcoin',
        symbol: 'BTC',
        formattedPriceUsd: '60,000',
        formattedMarketCapUsd: '1.1m',
        formattedMaxSupply: '21m',
        formattedSupply: '18.7m',
        rank: 1,
    },
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
    isError: false,
    coin: {
        name: '',
        symbol: '',
        formattedPriceUsd: '',
        formattedMarketCapUsd: '',
        formattedMaxSupply: '',
        formattedSupply: '',
        rank: 0,
    },
};

export const Error = Template.bind({});
Error.args = {
    isLoading: false,
    isError: true,
    coin: {
        name: '',
        symbol: '',
        formattedPriceUsd: '',
        formattedMarketCapUsd: '',
        formattedMaxSupply: '',
        formattedSupply: '',
        rank: 0,
    },
};
