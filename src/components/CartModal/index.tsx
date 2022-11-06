import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { CartContext } from '~/contexts/CartContext';
import { CartItemComponent } from '../CartItem';
import { formatPrice } from '~/utility/formatPrice';
import storeItems from '~/data/items.json';
import { useContext } from 'react';
import { Product } from '~/types/Product';
import { CartItem } from '~/types/CartItem';

const drawerBleeding = 56;

interface Props {
  isOpen: boolean;
  products: Product[];
  toggleCart: () => void;
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

export const CartModalComponent = ({ isOpen, toggleCart, products }: Props) => {
  const cart = useContext(CartContext);

  return (
    <Root>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(40% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        anchor='bottom'
        open={isOpen}
        onClose={toggleCart}
        onOpen={toggleCart}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
      >
        <Typography variant='h1' fontSize={22} sx={{ p: 2, color: 'text.secondary' }}>
          Cart items
        </Typography>
        <Box
          sx={{
            p: '10px',
            display: 'flex',
            flexWrap: 'nowrap',
            overflow: 'auto',
          }}
        >
          {cart.cartItems.map((item: CartItem) => (
            <CartItemComponent
              key={item.id}
              id={item.id}
              quantity={item.quantity}
              products={products}
            />
          ))}
        </Box>
        <Box ml={2} mt={2}>
          <Typography fontWeight={800}>Total </Typography>
          {formatPrice(
            cart.cartItems.reduce((total, cartItem) => {
              const item = storeItems.find((element) => element.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0),
          )}
        </Box>
      </SwipeableDrawer>
    </Root>
  );
};
