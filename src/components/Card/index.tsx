import { ButtonGroup, Container, IconButton, Input } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Product } from '~/types/Product';
import { formatPrice } from '~/utility/formatPrice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { CartContext } from '~/contexts/CartContext';
import { useContext } from 'react';

interface CardProps {
  product: Product;
}

export const CardComponent = ({ product }: CardProps) => {
  const cart = useContext(CartContext);
  const quantity = cart.getItemQuantity(product.id);

  return (
    <Grid item md={6}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component='img'
          sx={{
            pt: '20%',
          }}
          height='400'
          image={product.image}
          alt={product.slug}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant='h5' component='h2'>
            {product.title}
          </Typography>
          <Typography>{product.description ? product.description : 'Sem descrição'}</Typography>
          <Typography>{formatPrice(product.price)}</Typography>
        </CardContent>
        <CardActions>
          <Container>
            <ButtonGroup aria-label='text button group' size='small'>
              <IconButton onClick={() => cart.increaseItem(product.id)}>
                <AddCircleOutlineIcon />
              </IconButton>
              <Input size='small' value={quantity} style={{ width: '20px' }} />
              <IconButton onClick={() => cart.decreaseItem(product.id)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            </ButtonGroup>
          </Container>
          {quantity > 0 && (
            <Container>
              <Button
                variant='contained'
                color='error'
                size='small'
                endIcon={<RemoveShoppingCartIcon />}
                onClick={() => cart.removeItem(product.id)}
              >
                Remove to cart
              </Button>
            </Container>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};
