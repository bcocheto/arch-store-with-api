import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import { CartButtonComponent } from '../CartButton';
import {
  FormControlLabel,
  FormGroup,
  Grid,
  LinearProgress,
  styled,
  Switch,
  Tab,
  Tabs,
} from '@mui/material';
import { Category } from '~/types/Category';
import { useAppThemeContext } from '~/contexts/ThemeContext';

interface NavProps {
  toggleCart: () => void;
  handleChange: (_event: React.SyntheticEvent<Element, Event>, value: any) => void;
  tabValue: string;
  categories: Category[];
  isLoading: boolean;
}
interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgb(0, 176, 255)' : 'rgb(41, 98, 255)',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export const NavBarComponent = ({ props, navProps }: { props: Props; navProps: NavProps }) => {
  const { toggleTheme } = useAppThemeContext();

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <Box>
          <AppBar>
            <Toolbar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='h6' component='div'>
                  Arch-Store
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'nowrap',
                  }}
                >
                  <CartButtonComponent toggleCart={navProps.toggleCart} />
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <MaterialUISwitch onChange={toggleTheme} sx={{ m: 1 }} defaultChecked />
                      }
                      label='Switch theme'
                    />
                  </FormGroup>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <Box
            mt={10}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {navProps.isLoading && (
              <Grid container spacing={6} justifyContent='center' alignItems='center'>
                <LinearProgress />
              </Grid>
            )}
            <Tabs
              indicatorColor='secondary'
              textColor='inherit'
              variant='scrollable'
              value={navProps.tabValue}
              onChange={navProps.handleChange}
            >
              {!navProps.isLoading && (
                <>
                  <Tab value='all' label='All Products' />
                  <>
                    {navProps.categories.map((element: Category) => (
                      <Tab key={element.id} value={element.slug} label={element.name} />
                    ))}
                  </>
                </>
              )}
            </Tabs>
          </Box>
        </Box>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
};
