import { Meta, StoryFn } from '@storybook/react';
import Header from '../components/header/Header.tsx';

const meta: Meta<typeof Header> = {
    title: 'Components/Header',
    component: Header,
    parameters: {
        docs: {
            description: {
                component: 'Компонент заголовка, отображающий лучшие монеты и портфель.'
            }
        }
    },
    tags: ['autodocs']
};

export default meta;

const Template: StoryFn = () => <Header />;

export const Default = Template.bind({});
Default.args = {};
