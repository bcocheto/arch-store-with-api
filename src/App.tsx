import { Route } from 'react-router';
import { Routes, BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AppThemeProvider } from './contexts/ThemeContext';
import { Home } from './pages/Home';

function App() {
  return (
    <AppThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AppThemeProvider>
  );
}

export default App;
