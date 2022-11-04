import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useApi } from '~/hooks/useApi';
import { useState } from 'react';
import { Product } from '~/types/Product';
import { CardComponent } from './Card';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Category } from '~/types/Category';

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
  const [products, setProducts] = useState<Product[] | null>([]);
  const [categories, setCategories] = useState<Category | null>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>();

  React.useEffect(() => {
    const setData = async () => {
      const data = await api.getData();
      setProducts(data);
    };
    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    createCategories(products!);
  }, [products]);

  React.useEffect(() => {
    // filterCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const createCategories = (item: Product[]) => {
    const categoriesArr = item.map((product) => product.category);

    const uniqueIds: any[] = [];

    const uniqueCategories = categoriesArr.filter((element) => {
      const isDuplicate = uniqueIds.includes(element._id);
      if (!isDuplicate) {
        uniqueIds.push(element._id);

        return true;
      }

      return false;
    });
    setCategories(uniqueCategories);
  };

  const filterCategories = () => {
    const newCategories = products?.filter((item) => item.category._id === selectedCategory._id);
    setProducts(newCategories);
  };

  const handleChange = (event: SelectChangeEvent<Category>) => {
    const {
      target: { value },
    } = event;
    const category = categories?.find((item) => item._id === value);
    setSelectedCategory(category);
    console.log(category);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant='h6' color='inherit' noWrap>
            ArcH-Store
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth='sm'>
            <Stack sx={{ pt: 4 }} direction='row' spacing={2} justifyContent='center'>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id='demo-multiple-name-label'>Categories</InputLabel>
                <Select
                  labelId='demo-multiple-name-label'
                  id='demo-multiple-name'
                  onChange={handleChange}
                  input={<OutlinedInput label='Name' />}
                >
                  {categories?.map((element) => (
                    <MenuItem key={element._id} value={element._id}>
                      {element.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          <Grid container spacing={4}>
            {products?.map((product) => (
              <CardComponent
                key={product._id}
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
              />
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
};
