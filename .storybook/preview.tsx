// @ts-ignore
import '../src/index.css';
import { Provider } from 'react-redux';
import store from '../src/store/index';
import { Preview, StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export const decorators = [
	(Story: StoryFn) => (
		<Provider store={store}>
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		</Provider>
	),
];

export default preview;
