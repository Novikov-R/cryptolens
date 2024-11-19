import { Meta, StoryFn } from '@storybook/react';
import CoinHistoryChart from '../components/coinHistoryChart/CoinHistoryChart.tsx';

const meta: Meta = {
    title: 'Components/CoinHistoryChart',
    component: CoinHistoryChart,
    argTypes: {
        coinId: { control: 'text' },
    },
    tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<{ coinId: string }> = (args) => <CoinHistoryChart {...args} />;

export const Default = Template.bind({});
Default.args = {
    coinId: 'bitcoin',
};
export const Error = Template.bind({});
Error.args = {
    coinId: 'bitcin',
};
