import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AppThemeProvider } from './contexts/ThemeContext';
import { Home } from './pages/Home';

function App() {
  return (
    <AppThemeProvider>
      <CartProvider>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </CartProvider>
    </AppThemeProvider>
  );
}

export default App;
