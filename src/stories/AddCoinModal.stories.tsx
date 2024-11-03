import { Meta, StoryFn } from '@storybook/react';
import AddCoinModal from '../components/addCoinModal/AddCoinModal.tsx';
import { useState } from 'react';

const meta: Meta = {
	title: 'Components/AddCoinModal',
	component: AddCoinModal,
	argTypes: {
		isOpen: { control: 'boolean' },
	},
	tags: ['autodocs']
};

export default meta;

const Template: StoryFn<{ isOpen: boolean }> = (args) => {
	const [isOpen, setIsOpen] = useState(args.isOpen);

	return (
		<AddCoinModal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
		/>
	);
};

export const Default = Template.bind({});
Default.args = {
	isOpen: true,
};

export const Closed = Template.bind({});
Closed.args = {
	isOpen: false,
};
