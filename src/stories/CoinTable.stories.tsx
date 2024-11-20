import { Meta, StoryFn } from '@storybook/react';
import CoinTable from '../components/coinTable/CoinTable.tsx';

const meta: Meta<typeof CoinTable> = {
    title: 'Components/CoinTable',
    component: CoinTable,
    parameters: {
        docs: {
            description: {
                component: 'Таблица криптовалют с фильтрацией, пагинацией и возможностью добавления монет в портфель.'
            }
        }
    },
    tags: ['autodocs']
};

export default meta;

const Template: StoryFn = () => <CoinTable />;

export const Default = Template.bind({});
Default.args = {};
