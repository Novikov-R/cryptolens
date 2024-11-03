import type { Meta, StoryFn } from '@storybook/react';
import Spinner from '../components/ui/spinner/Spinner';

const meta: Meta<typeof Spinner> = {
	title: 'Components/Spinner',
	component: Spinner,
	parameters: {
		docs: {
			description: {
				component: 'Компонент загрузки в виде спиннера, который можно использовать для отображения загрузки.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'number' },
			description: 'Размер спиннера в пикселях.',
		},
		color: {
			control: { type: 'color' },
			description: 'Цвет спиннера.',
		},
		className: {
			control: 'text',
			description: 'Дополнительные классы для кастомизации компонента.',
		},
	},
};

export default meta;

const Template: StoryFn<React.ComponentProps<typeof Spinner>> = (args) => (
	<Spinner {...args} />
);

export const Default = Template.bind({});
Default.args = {
	size: 24,
	className: '',
};

export const LargeSpinner = Template.bind({});
LargeSpinner.args = {
	size: 78,
	className: '',
};

export const CustomColorSpinner = Template.bind({});
CustomColorSpinner.args = {
	size: 36,
	color: '#1abc9c',
	className: '',
};
