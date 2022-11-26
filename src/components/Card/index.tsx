import { Box, ButtonGroup, Menu, MenuItem, Paper, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
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
import { useContext, useState } from 'react';
import { CardWrapper } from './style';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { EditModalComponent } from './Modal';
import { Category } from '~/types/Category';

interface CardProps {
  product: Product;
  categories: Category[];
  editItem: (newItem: Product) => void;
  deleteItem: (itemId: string) => () => void;
}

const ITEM_HEIGHT = 48;

export const CardComponent = ({ product, categories, deleteItem, editItem }: CardProps) => {
  const cart = useContext(CartContext);
  const quantity = cart.getItemQuantity(product.id);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item md={5}>
      <Paper>
        <CardWrapper>
          <Card sx={{ height: '600px', display: 'flex', flexDirection: 'column', width: '350px' }}>
            <div style={{ position: 'absolute', margin: '10px' }}>
              <Button
                aria-label='more'
                id='long-button'
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup='true'
                variant='contained'
                color='info'
                onClick={handleClick}
                sx={{ boxShadow: ' 2px 2px 5px 0px rgba(0,0,0,0.75)' }}
              >
                Settings
              </Button>
              <Menu
                id='long-menu'
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >
                <MenuItem>
                  <Button variant='text' color='info' endIcon={<EditIcon />} onClick={toggleModal}>
                    Edit
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    variant='text'
                    color='error'
                    endIcon={<DeleteForeverIcon />}
                    onClick={deleteItem(product.id)}
                  >
                    Delete
                  </Button>
                </MenuItem>
              </Menu>
            </div>
            <CardMedia
              component='img'
              sx={{
                objectFit: 'fill',
                height: '350px',
              }}
              image={product.image}
              alt={product.slug}
            />
            <CardContent>
              <Typography noWrap gutterBottom variant='h5' component='h2'>
                {product.title}
              </Typography>
              <Typography>{product.description ? product.description : 'Sem descrição'}</Typography>
              <Typography>{formatPrice(product.price)}</Typography>
            </CardContent>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ButtonGroup aria-label='text button group' size='large'>
                <Button
                  variant='contained'
                  color='info'
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => cart.increaseItem(product.id)}
                ></Button>
                <Box sx={{ width: '50px', display: 'flex', justifyContent: 'center' }}>
                  <TextField
                    disabled
                    variant='standard'
                    size='medium'
                    value={quantity}
                    margin='dense'
                    sx={{ input: { textAlign: 'center' } }}
                  />
                </Box>
                <Button
                  variant='contained'
                  color='info'
                  endIcon={<RemoveCircleOutlineIcon />}
                  onClick={() => cart.decreaseItem(product.id)}
                ></Button>
              </ButtonGroup>
            </Box>
            {quantity > 0 && (
              <Box
                mt={2}
                mb={2}
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant='contained'
                  color='error'
                  size='small'
                  endIcon={<RemoveShoppingCartIcon />}
                  onClick={() => cart.removeItem(product.id)}
                >
                  Remove
                </Button>
              </Box>
            )}
          </Card>
        </CardWrapper>
        <EditModalComponent
          isOpen={isOpen}
          product={product}
          editItem={editItem}
          toggleModal={toggleModal}
          categories={categories}
        />
      </Paper>
    </Grid>
  );
};
