import type { Meta, StoryFn } from '@storybook/react';
import Triangle, { TriangleProps } from '../components/ui/triangle/Triangle';

const meta: Meta<typeof Triangle> = {
    title: 'Components/Triangle',
    component: Triangle,
    parameters: {
        docs: {
            description: {
                component: 'Компонент треугольника, который можно использовать для отображения стрелок или указателей.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'number' },
            description: 'Размер треугольника в пикселях.',
        },
        color: {
            control: { type: 'color' },
            description: 'Цвет треугольника.',
        },
        direction: {
            control: { type: 'radio', options: ['up', 'down'] },
            description: 'Направление треугольника.',
        },
        className: {
            control: 'text',
            description: 'Дополнительные tailwind классы для кастомизации компонента.',
        },
    },
};

export default meta;

const Template: StoryFn<TriangleProps> = (args) => <Triangle {...args} />;

export const UpTriangle = Template.bind({});
UpTriangle.args = {
    size: 50,
    color: '#007bff',
    direction: 'up',
    className: '',
};

export const DownTriangle = Template.bind({});
DownTriangle.args = {
    size: 50,
    color: '#dc3545',
    direction: 'down',
    className: '',
};
