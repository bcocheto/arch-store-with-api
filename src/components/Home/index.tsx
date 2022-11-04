import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useApi } from '~/hooks/useApi';
import { Product } from '~/types/Product';
import { CardComponent } from '../Card';
import { Category } from '~/types/Category';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tabValue, setTabValue] = useState('61ab1ca64a0fef3f27dc663all');

  React.useEffect(() => {
    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    createCategories();
    console.log(categories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setData = async () => {
    const data = await api.getProducts();
    setProducts(data);
    setFilteredProducts(data);
  };

  const createCategories = async () => {
    const categoriesArr = await api.getCategories();

    const uniqueIds: any[] = [];

    const uniqueCategories = categoriesArr.filter((element: Category) => {
      const isDuplicate = uniqueIds.includes(element._id);
      if (!isDuplicate) {
        uniqueIds.push(element._id);

        return true;
      }

      return false;
    });
    setCategories(uniqueCategories);
  };

  const handleChange = (_event: React.SyntheticEvent<Element, Event>, value: any) => {
    setTabValue(value);
    if (value !== '61ab1ca64a0fef3f27dc663all') {
      const category = categories.find((item) => item._id === value);
      const newProducts = products?.filter((item) => item.category._id === category?._id);
      console.table(newProducts);
      setFilteredProducts(newProducts);
      return;
    }
    setFilteredProducts(products);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap>
            ArcH-Store
          </Typography>
          <Tabs
            indicatorColor='secondary'
            textColor='inherit'
            variant='scrollable'
            value={tabValue}
            onChange={handleChange}
          >
            <Tab value='61ab1ca64a0fef3f27dc663all' label='All Products' />
            {categories?.map((element) => (
              <Tab key={element._id} value={element._id} label={element.name} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth='md'>
          <Grid container spacing={4}>
            {filteredProducts ? (
              filteredProducts?.map((product) => (
                <CardComponent
                  key={product._id}
                  image={product.image}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                />
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
    </ThemeProvider>
  );
};
