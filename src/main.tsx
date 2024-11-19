import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store';

import './index.css';
import Root from './routes/Root.tsx';
import Home from './routes/Home.tsx';
import Coin from './routes/Coin.tsx';
import ErrorPage from './routes/ErrorPage.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/coin/:coinId',
                element: <Coin />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
        ,
    </StrictMode>
);
