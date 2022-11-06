/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { CartContext } from '~/contexts/CartContext';
import { Product } from '~/types/Product';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { formatPrice } from '~/utility/formatPrice';

interface CartItemProps {
  id: string;
  quantity: number;
  products: Product[];
}

export const CartItemComponent = ({ id, quantity, products }: CartItemProps) => {
  const { removeItem } = useContext(CartContext);
  const item: Product[] = products?.filter((element: Product) => element.id === id);

  return (
    <Box>
      <Card
        sx={{
          p: '5px',
          m: '5px',
          height: '150px',
          display: 'flex',
          flexDirection: 'row',
          width: '450px',
        }}
      >
        <CardMedia
          component='img'
          height={100}
          image={item[0]?.image}
          alt={item[0]?.slug}
          sx={{
            objectFit: 'contain',
          }}
        />
        <CardContent>
          <Typography variant='h4' component='h1' fontSize={18}>
            {item[0]?.title}
          </Typography>
          <Typography>{quantity}</Typography>
          <Typography>{formatPrice(item[0]?.price)}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='error'
            size='small'
            endIcon={<RemoveShoppingCartIcon />}
            onClick={() => removeItem(item[0]?.id)}
          >
            <Typography fontSize={12}>Remove to cart</Typography>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
