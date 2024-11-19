import type { Meta, StoryFn } from '@storybook/react';
import Modal from '../components/ui/modal/Modal';
import { ComponentProps, useState } from 'react';
import { Button } from '../components/ui/button/Button.tsx';

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    parameters: {
        docs: {
            description: {
                component: 'Компонент модального окна для отображения контента и взаимодействия с пользователем.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            control: { type: 'boolean' },
            description: 'Управляет открытием модального окна.',
        },
        onClose: {
            action: 'closed',
            description: 'Функция, вызываемая при закрытии модального окна.',
        },
        title: {
            control: 'text',
            description: 'Заголовок модального окна.',
        },
        description: {
            control: 'text',
            description: 'Описание модального окна.',
        },
        footer: {
            control: false,
            description: 'Контент в подвале модального окна.',
        },
        className: {
            control: 'text',
            description: 'Дополнительные классы для кастомизации компонента.',
        },
    },
};

export default meta;

const Template: StoryFn<ComponentProps<typeof Modal>> = (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    const handleClose = () => {
        setIsOpen(false);
        args.onClose();
    };

    const children = args.children;

    return (
        <>
            <button onClick={() => setIsOpen(true)} className='mb-4 p-2 bg-blue-500 text-white rounded'>
                Открыть модальное окно
            </button>
            <Modal {...args} isOpen={isOpen} onClose={handleClose}>
                {children}
            </Modal>
        </>
    );
};

export const Default = Template.bind({});
Default.args = {
    isOpen: false,
    title: 'Модальное окно',
    description: 'Это описание модального окна.',
    footer: (
        <Button variant='default' onClick={() => alert(1)}>
            Click
        </Button>
    ),
};

export const WithChildren = Template.bind({});
WithChildren.args = {
    isOpen: false,
    title: 'Модальное окно с детьми',
    children: <div>Ребенок</div>,
};
