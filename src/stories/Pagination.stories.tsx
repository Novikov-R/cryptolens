import { Meta, StoryFn } from '@storybook/react';
import Pagination, { PaginationProps } from '../components/pagination/Pagination.tsx';

const meta: Meta<typeof Pagination> = {
	title: 'Components/Pagination',
	component: Pagination,
	parameters: {
		docs: {
			description: {
				component: 'Компонент пагинации для навигации между страницами.',
			},
		},
	},
	tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<PaginationProps> = (args) => <Pagination {...args} />;

export const FirstPage = Template.bind({});
FirstPage.args = {
	currentPage: 1,
	totalPages: 5,
	onPageChange: (page: number) => console.log(`Перейти на страницу ${page}`),
};

export const MiddlePage = Template.bind({});
MiddlePage.args = {
	currentPage: 3,
	totalPages: 5,
	onPageChange: (page: number) => console.log(`Перейти на страницу ${page}`),
};

export const LastPage = Template.bind({});
LastPage.args = {
	currentPage: 5,
	totalPages: 5,
	onPageChange: (page: number) => console.log(`Перейти на страницу ${page}`),
};

export const MultiplePages = Template.bind({});
MultiplePages.args = {
	currentPage: 4,
	totalPages: 10,
	onPageChange: (page: number) => console.log(`Перейти на страницу ${page}`),
};
