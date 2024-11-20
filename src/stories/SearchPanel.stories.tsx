import type { Meta, StoryFn } from '@storybook/react';
import SearchPanel from '../components/searchPanel/SearchPanel.tsx';

const meta: Meta<typeof SearchPanel> = {
    title: 'Components/SearchPanel',
    component: SearchPanel,
    parameters: {
        docs: {
            description: {
                component: 'Компонент панели поиска для фильтрации элементов.'
            }
        }
    },
    tags: ['autodocs']
};

export default meta;

const Template: StoryFn = (args) => <SearchPanel {...args} />;
export const Default = Template.bind({});
