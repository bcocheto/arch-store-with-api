/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { CartContext } from '~/contexts/CartContext';
import { Product } from '~/types/Product';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
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
          width: '500px',
        }}
      >
        <CardMedia
          component='img'
          image={item[0]?.image}
          alt={item[0]?.slug}
          sx={{
            objectFit: 'fit',
          }}
        />
        <CardContent>
          <Box sx={{ width: '300px', height: '90px' }}>
            <Typography gutterBottom noWrap mb={1} variant='h1' component='h1' fontSize={16}>
              {item[0]?.title}
            </Typography>
            <Typography variant='h3' component='h3' fontSize={14}>
              Qtd: {quantity}
            </Typography>
            <Typography variant='h3' component='h3' fontSize={14}>
              {formatPrice(item[0]?.price)}
            </Typography>
          </Box>
          <Box sx={{ width: '300px' }}>
            <Button
              variant='contained'
              color='error'
              size='small'
              endIcon={<RemoveShoppingCartIcon />}
              onClick={() => removeItem(item[0]?.id)}
            >
              <Typography variant='h3' component='h3' fontSize={14}>
                Remove
              </Typography>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
