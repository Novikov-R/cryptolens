import type { Meta, StoryFn } from '@storybook/react';
import { Input, InputProps } from '../components/ui/input/Input.tsx';

const meta: Meta<InputProps> = {
	title: 'Components/Input',
	component: Input,
	parameters: {
		docs: {
			description: {
				component: 'Текстовое поле для ввода.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: ['text', 'password', 'email', 'number'],
			description: 'Тип ввода текста.',
		},
		disabled: {
			control: 'boolean',
			description: 'Отключает поле ввода.',
		},
		placeholder: {
			control: 'text',
			description: 'Текст-подсказка в поле ввода.',
		},
	},
	args: {
		placeholder: 'Введите текст...',
	},
};

export default meta;

const Template: StoryFn<InputProps> = (args: InputProps) => (
	<Input {...args} />
);

export const Default = Template.bind({});
Default.args = {
	type: 'text',
};

export const Disabled = Template.bind({});
Disabled.args = {
	type: 'text',
	disabled: true,
};

export const Password = Template.bind({});
Password.args = {
	type: 'password',
	placeholder: 'Введите пароль...',
};

export const Email = Template.bind({});
Email.args = {
	type: 'email',
	placeholder: 'Введите ваш email...',
};

export const Number = Template.bind({});
Number.args = {
	type: 'number',
	placeholder: 'Введите число...',
};
