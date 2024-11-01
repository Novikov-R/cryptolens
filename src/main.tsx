import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import store from './store';

import './index.css';
import Root from './routes/Root.tsx';
import Home from './routes/Home.tsx';
import { StrictMode } from 'react';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
	</StrictMode>
);
