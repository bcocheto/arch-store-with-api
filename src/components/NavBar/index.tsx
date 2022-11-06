import { AppBar, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CartButtonComponent } from '../CartButton';

interface NavProps {
  toggleCart: () => void;
}

export const NavBarComponent = ({ toggleCart }: NavProps) => {
  return (
    <AppBar position='relative'>
      <Toolbar>
        <Typography variant='h6' color='inherit' noWrap>
          ArcH-Store
        </Typography>

        <CartButtonComponent toggleCart={toggleCart} />
      </Toolbar>
    </AppBar>
  );
};
