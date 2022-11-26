import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { useApi } from '~/hooks/useApi';
import { Product } from '~/types/Product';
import { CardComponent } from '../../components/Card';
import { NavBarComponent } from '~/components/NavBar';
import { CartModalComponent } from '~/components/CartModal';
import { useTheme } from '@emotion/react';
import { NewButtonComponent } from '~/components/NewButton';
import { CopyrightComponent } from '~/components/Copyright';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export const Home = () => {
  const location = useLocation();
  const { data: products, categories, deleteItem, editItem, addItem, isLoading } = useApi();
  const [isOpen, setIsOpen] = useState(false);
  const [tabValue, setTabValue] = useState('all');
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      setTabValue('all');
    } else {
      setTabValue(location.pathname.replace('/', ''));
    }
  }, [location.pathname]);

  const toggleCart = () => setIsOpen((prev) => !prev);

  const handleChange = (_event: React.SyntheticEvent<Element, Event>, value: any) => {
    if (value === 'all') {
      setTabValue('all');
      navigate(`/`);
      return;
    }
    setTabValue(value);
    navigate(`/${value}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBarComponent
        props={{ children: <></> }}
        navProps={{ handleChange, categories, toggleCart, tabValue, isLoading }}
      />
      <main>
        <Container sx={{ py: 6 }} maxWidth='md'>
          {!isLoading && (
            <Grid container spacing={6}>
              {products?.length ? (
                products.map((product: Product) => (
                  <CardComponent
                    key={product.id}
                    product={product}
                    deleteItem={deleteItem}
                    editItem={editItem}
                    categories={categories}
                  />
                ))
              ) : (
                <Container sx={{ py: 10 }} maxWidth='lg'>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography>No Products</Typography>
                  </Box>
                </Container>
              )}
            </Grid>
          )}
          {isLoading && (
            <Grid container spacing={6} justifyContent='center' alignItems='center'>
              <CircularProgress />
            </Grid>
          )}
        </Container>
        <NewButtonComponent categories={categories} addItem={addItem} />
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
        <CartModalComponent isOpen={isOpen} toggleCart={toggleCart} products={products} />
        <CopyrightComponent />
      </Box>
    </ThemeProvider>
  );
};
