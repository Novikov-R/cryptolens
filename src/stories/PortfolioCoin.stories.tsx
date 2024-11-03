import type { Meta, StoryFn } from '@storybook/react';
import PortfolioCoin, { PortfolioCoinProps } from '../components/portfolioCoin/PortfolioCoin.tsx';

const meta: Meta<typeof PortfolioCoin> = {
	title: 'Components/PortfolioCoin',
	component: PortfolioCoin,
	parameters: {
		docs: {
			description: {
				component: 'Компонент для отображения информации о монете в портфеле. Включает информацию о дате, названии, символе, цене и количестве.',
			},
		},
	},
	tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<PortfolioCoinProps> = (args) => <PortfolioCoin {...args} />;

export const Default = Template.bind({});
Default.args = {
	timestamp: Date.now(),
	symbol: 'BTC',
	name: 'Bitcoin',
	priceUsd: 50000,
	quantity: 2,
	id: '1',
};

export const RecentDate = Template.bind({});
RecentDate.args = {
	timestamp: Date.now() - 86400000 * 1.5,
	symbol: 'LTC',
	name: 'Litecoin',
	priceUsd: 200,
	quantity: 5,
	id: '4',
};

