import type { Meta, StoryFn } from '@storybook/react';
import Skeleton from '../components/ui/skeleton/Skeleton.tsx';
import { HTMLAttributes } from 'react';

const meta: Meta<typeof Skeleton> = {
    title: 'Components/Skeleton',
    component: Skeleton,
    parameters: {
        docs: {
            description: {
                component: 'Компонент-заполнитель, который можно использовать при загрузке данных.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        className: {
            control: 'text',
            description: 'Дополнительные tailwind классы для кастомизации компонента',
        },
    },
};

export default meta;

const Template: StoryFn<HTMLAttributes<HTMLDivElement>> = (args) => <Skeleton {...args} />;

export const Default = Template.bind({});
Default.args = {
    className: 'h-10 w-full',
};
