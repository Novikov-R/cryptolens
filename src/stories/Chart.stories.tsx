import { Meta, StoryFn } from '@storybook/react';
import Chart from '../components/chart/Chart';
import { AssetHistory } from '../types/asset';

const meta: Meta = {
	title: 'Components/Chart',
	component: Chart,
	argTypes: {
		data: { control: 'object' },
	},
};

export default meta;

const Template: StoryFn<{ data: AssetHistory[] }> = (args) => <Chart {...args} />;

const sampleData: AssetHistory[] = [
	{
		time: Date.now() - 3600 * 1000 * 24,
		priceUsd: 34000,
		circulatingSupply: 18000000,
		date: new Date().toISOString(),
	},
	{
		time: Date.now() - 3600 * 1000 * 18,
		priceUsd: 34500,
		circulatingSupply: 17000000,
		date: new Date().toISOString(),
	},
	{
		time: Date.now() - 3600 * 1000 * 12,
		priceUsd: 33000,
		circulatingSupply: 12000000,
		date: new Date().toISOString(),
	},
	{
		time: Date.now() - 3600 * 1000 * 6,
		priceUsd: 33500,
		circulatingSupply: 11000000,
		date: new Date().toISOString(),
	},
	{ time: Date.now(), priceUsd: 34200, circulatingSupply: 19000000, date: new Date().toISOString() },
];

export const Default = Template.bind({});
Default.args = {
	data: sampleData,
};
