import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { ModalComponent } from '~/components/Modal';
import { Category } from '~/types/Category';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Product } from '~/types/Product';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';

interface ModalProps {
  isOpen: boolean;
  categories: Category[];
  products: Product[];
  toggleModal: () => void;
}

export const CreateModalComponent = ({ isOpen, categories, products, toggleModal }: ModalProps) => {
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

  useEffect(() => {
    const makeid = () => {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return setData({ ...data, id: result });
    };
    makeid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearData = () => {
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
    products.unshift(data);
    toggleModal();
    clearData();
  };

  return (
    <ModalComponent open={isOpen} toggleModal={toggleModal} title='New item'>
      <Container component='main' maxWidth='xl' sx={{ mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box>
            <TextField
              required
              id='title'
              name='title'
              label='Name'
              type='text'
              variant='standard'
              value={data.title}
              error={data.title ? true : false}
              onChange={(e) => handle(e)}
              sx={{ m: 2 }}
            />
            <TextField
              required
              id='description'
              name='description'
              label='Description'
              type='text'
              variant='standard'
              error={!!data.description}
              value={data.description}
              onChange={(e) => handle(e)}
              sx={{ m: 2 }}
            />
          </Box>
          <Box>
            <TextField
              required
              id='slug'
              name='slug'
              label='Slug'
              type='text'
              variant='standard'
              value={data.slug}
              error={!!data.slug}
              onChange={(e) => handle(e)}
              sx={{ m: 2 }}
            />
            <TextField
              required
              id='price'
              name='price'
              label='Price'
              type='number'
              onChange={(e) => handle(e)}
              value={data.price}
              error={!!data.price}
              variant='standard'
              sx={{ m: 2 }}
            />
          </Box>
          <Box>
            <TextField
              required
              id='image'
              name='image'
              label='Image url'
              type='url'
              fullWidth
              variant='standard'
              error={!!data.image}
              value={data.image}
              onChange={(e) => handle(e)}
              sx={{ m: 2 }}
            />
          </Box>
          <Box>
            <FormControl fullWidth id='category' sx={{ m: 2 }}>
              <InputLabel id='category'>Category</InputLabel>
              <Select
                required
                labelId='category'
                id='category'
                value={data.category.id}
                error={!!data.category.id}
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
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button sx={{ m: 2 }} type='submit' variant='contained' color='success'>
              Confirm
            </Button>
            <Button
              sx={{ m: 2 }}
              variant='contained'
              color='error'
              onClick={() => {
                toggleModal();
                clearData();
              }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Container>
    </ModalComponent>
  );
};
