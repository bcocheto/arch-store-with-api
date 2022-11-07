import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AppThemeProvider } from './contexts/ThemeContext';
import { ErrorPage } from './pages/Error';
import { Home } from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/bags-and-shoes',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/mens-fashion',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/womens-fashion',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/jewlary-and-watches',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/computers',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/phone-and-tablets',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home-and-furniture',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/tools-and-hardware',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <AppThemeProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AppThemeProvider>
  );
}

export default App;
