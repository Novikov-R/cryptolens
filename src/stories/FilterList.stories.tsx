import { Meta, StoryFn } from '@storybook/react';
import FilterList from '../components/filterList/FilterList.tsx';

const meta: Meta<typeof FilterList> = {
    title: 'Components/FilterList',
    component: FilterList,
    parameters: {
        docs: {
            description: {
                component: 'Компонент списка фильтров для сортировки криптовалют.'
            }
        }
    },
    tags: ['autodocs']
};

export default meta;

const Template: StoryFn = (args) => <FilterList {...args} />;

export const Default = Template.bind({});
Default.args = {};
