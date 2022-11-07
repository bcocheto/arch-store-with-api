import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AppThemeProvider } from './contexts/ThemeContext';
import { Home } from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <h1>TESTANDO ERRO</h1>,
  },
  {
    path: '/:category',
    element: <Home />,
    errorElement: <h1>TESTANDO ERRO</h1>,
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
