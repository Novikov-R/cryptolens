import type { Meta, StoryFn } from '@storybook/react';
import { Button, ButtonProps } from '../components/ui/button/Button.tsx';
import { fn } from '@storybook/test';

const meta: Meta<ButtonProps> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        docs: {
            description: {
                component: 'Кнопка'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
            description: 'Определяет стиль кнопки'
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'icon'],
            description: 'Определяет размер кнопки'
        },
        disabled: {
            control: 'boolean',
            description: 'Отключает кнопку'
        }
    },
    args: {
        onClick: fn()
    }
};

export default meta;

const Template: StoryFn<ButtonProps> = (args: ButtonProps) => (
    <Button {...args}>{args.children ? args.children : 'Click me'}</Button>
);

export const Default = Template.bind({});
Default.args = {
    variant: 'default',
    size: 'default'
};

export const Destructive = Template.bind({});
Destructive.args = {
    variant: 'destructive',
    size: 'default'
};

export const Outline = Template.bind({});
Outline.args = {
    variant: 'outline',
    size: 'default'
};

export const Secondary = Template.bind({});
Secondary.args = {
    variant: 'secondary',
    size: 'default'
};

export const Ghost = Template.bind({});
Ghost.args = {
    variant: 'ghost',
    size: 'default'
};

export const Link = Template.bind({});
Link.args = {
    variant: 'link',
    size: 'default'
};

export const Small = Template.bind({});
Small.args = {
    size: 'sm'
};

export const Large = Template.bind({});
Large.args = {
    size: 'lg'
};

export const Icon = Template.bind({});
Icon.args = {
    size: 'icon',
    children: '🔍'
};

export const Disabled = Template.bind({});
Disabled.args = {
    variant: 'default',
    size: 'default',
    disabled: true
};
