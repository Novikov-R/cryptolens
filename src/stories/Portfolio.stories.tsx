import { Meta, StoryFn } from '@storybook/react';
import Portfolio from '../components/portfolio/Portfolio.tsx';


const meta: Meta<typeof Portfolio> = {
	title: 'Components/Portfolio',
	component: Portfolio,
};

export default meta;

const Template: StoryFn = () => <Portfolio />;
export const Default = Template.bind({});
