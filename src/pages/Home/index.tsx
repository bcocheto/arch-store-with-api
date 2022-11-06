import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useApi } from '~/hooks/useApi';
import { Product } from '~/types/Product';
import { CardComponent } from '../../components/Card';
import { Category } from '~/types/Category';
import { NavBarComponent } from '~/components/NavBar';
import { CartModalComponent } from '~/components/CartModal';
import { Tab, Tabs } from '@mui/material';

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/bcocheto'>
        Breno Cocheto
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createTheme();

export const Home = () => {
  const api = useApi();
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tabValue, setTabValue] = useState('61ab1ca64a0fef3f27dc663all');

  useEffect(() => {
    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    createCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setData = async () => {
    const data = await api.getProducts();
    setProducts(data as unknown as Product[]);
    setFilteredProducts(data as unknown as Product[]);
  };

  const toggleCart = () => setIsOpen((prev) => !prev);

  const createCategories = async () => {
    const categoriesArr = await api.getCategories();

    const uniqueIds: any[] = [];

    const uniqueCategories = categoriesArr.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.id);
      if (!isDuplicate) {
        uniqueIds.push(element.id);
        return true;
      }
      return false;
    });
    setCategories(uniqueCategories as unknown as Category[]);
  };

  const handleChange = (_event: React.SyntheticEvent<Element, Event>, value: any) => {
    setTabValue(value);
    if (value !== '61ab1ca64a0fef3f27dc663all') {
      const category = categories.find((item) => item.id === value);
      const newProducts = products?.filter((item) => item.category.id === category?.id);
      console.table(newProducts);
      setFilteredProducts(newProducts);
      return;
    }
    setFilteredProducts(products);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBarComponent toggleCart={toggleCart} />
      <Tabs
        indicatorColor='secondary'
        textColor='inherit'
        variant='scrollable'
        value={tabValue}
        onChange={handleChange}
      >
        <Tab value='61ab1ca64a0fef3f27dc663all' label='All Products' />
        {categories.map((element: Category) => (
          <Tab key={element.id} value={element.id} label={element.name} />
        ))}
      </Tabs>
      <main>
        <Container sx={{ py: 8 }} maxWidth='md'>
          <Grid container spacing={4}>
            {filteredProducts ? (
              filteredProducts.map((product: Product) => (
                <CardComponent key={product.id} product={product} />
              ))
            ) : (
              <Typography>Sem Produtos</Typography>
            )}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
        <Copyright />
      </Box>
      <CartModalComponent isOpen={isOpen} toggleCart={toggleCart} products={products} />
    </ThemeProvider>
  );
};
