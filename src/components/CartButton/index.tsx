import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartWrapper } from './style';
import { CartContext } from '~/contexts/CartContext';
import { useContext } from 'react';

interface CartButtonProps {
  toggleCart: () => void;
}

export const CartButtonComponent = ({ toggleCart }: CartButtonProps) => {
  const { cartQuantity } = useContext(CartContext);

  return (
    <CartWrapper onClick={toggleCart}>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab variant='extended'>
          <ShoppingCartIcon sx={{ mr: 1 }} />
          Shop Cart
          {cartQuantity > 0 && <span className='button__badge'>{cartQuantity}</span>}
        </Fab>
      </Box>
    </CartWrapper>
  );
};
