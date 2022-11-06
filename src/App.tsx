import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { Home } from './pages/Home';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
