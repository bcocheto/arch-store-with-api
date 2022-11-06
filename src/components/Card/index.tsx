import { Box, ButtonGroup, Container, IconButton, Input, Menu, MenuItem } from '@mui/material';
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
import { useContext, useState } from 'react';
import { CardWrapper } from './style';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CardModalComponent } from './Modal';
interface CardProps {
  product: Product;
}

const ITEM_HEIGHT = 48;

export const CardComponent = ({ product }: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useContext(CartContext);
  const quantity = cart.getItemQuantity(product.id);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <Grid item md={6}>
      <CardWrapper>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'absolute' }}>
            <Button
              aria-label='more'
              id='long-button'
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup='true'
              variant='contained'
              color='info'
              onClick={handleClick}
              startIcon={<SettingsOutlinedIcon />}
            ></Button>
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
              <MenuItem onClick={toggleModal}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                  }}
                >
                  <Typography>Edit </Typography>
                  <EditIcon />
                </Box>
              </MenuItem>
              <MenuItem>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                  }}
                >
                  <Typography>Delete </Typography>
                  <DeleteForeverIcon />
                </Box>
              </MenuItem>
            </Menu>
          </div>
          <CardMedia
            component='img'
            sx={{
              objectFit: 'fill',
              maxHeight: '350px',
            }}
            image={product.image}
            alt={product.slug}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography noWrap gutterBottom variant='h5' component='h2'>
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
                  Remove
                </Button>
              </Container>
            )}
          </CardActions>
        </Card>
      </CardWrapper>
      <CardModalComponent isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </Grid>
  );
};
