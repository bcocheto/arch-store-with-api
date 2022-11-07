import { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { ModalComponent } from '~/components/Modal';
import { Category } from '~/types/Category';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Product } from '~/types/Product';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  categories: Category[];
  products: Product[];
}

export const CreateModalComponent = ({ isOpen, toggleModal, categories, products }: ModalProps) => {
  const [data, setData] = useState<Product>({
    id: '',
    category: {
      id: '',
      name: '',
      slug: '',
    },
    description: '',
    image: '',
    price: 0,
    slug: '',
    title: '',
  });

  const makeid = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return setData({ ...data, id: result });
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    const category = categories.filter((element) => element.id === event.target.value);
    const newData = { ...data };
    newData['category'] = category[0];
    setData(newData);
  };

  const handle = (e: any) => {
    const newData: any = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
    console.log(newData);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    makeid();
    products.unshift(data);
    console.log(data);
    toggleModal();
    setData({
      id: '',
      category: {
        id: '',
        name: '',
        slug: '',
      },
      description: '',
      image: '',
      price: 0,
      slug: '',
      title: '',
    });
  };

  return (
    <ModalComponent open={isOpen} toggleModal={toggleModal} title='New item'>
      <Container onSubmit={handleSubmit} component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='title'
                name='title'
                label='Name'
                type='text'
                fullWidth
                variant='standard'
                value={data.title}
                onChange={(e) => handle(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='description'
                name='description'
                label='Description'
                fullWidth
                type='text'
                variant='standard'
                value={data.description}
                onChange={(e) => handle(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='slug'
                name='slug'
                label='Slug'
                type='text'
                fullWidth
                variant='standard'
                value={data.slug}
                onChange={(e) => handle(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='price'
                name='price'
                label='Price'
                type='number'
                fullWidth
                onChange={(e) => handle(e)}
                value={data.price}
                variant='standard'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id='image'
                name='image'
                label='Image url'
                type='url'
                fullWidth
                variant='standard'
                value={data.image}
                onChange={(e) => handle(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth id='category'>
                <InputLabel id='category'>Category</InputLabel>
                <Select
                  required
                  labelId='category'
                  id='category'
                  value={data.category.id}
                  label='Category'
                  onChange={handleChangeCategory}
                >
                  {categories?.map((category: Category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{ m: 2 }} variant='contained' color='success' onClick={handleSubmit}>
          Confirm
        </Button>
        <Button
          sx={{ m: 2 }}
          variant='contained'
          color='error'
          onClick={() => {
            toggleModal();
            setData({
              id: '',
              category: {
                id: '',
                name: '',
                slug: '',
              },
              description: '',
              image: '',
              price: 0,
              slug: '',
              title: '',
            });
          }}
        >
          Cancel
        </Button>
      </Box>
    </ModalComponent>
  );
};
