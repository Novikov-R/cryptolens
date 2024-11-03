import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-onboarding',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		{
			name: '@storybook/addon-postcss',
			options: {
				cssLoaderOptions: {

					importLoaders: 1,
				},
			},
		},
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
};
export default config;
