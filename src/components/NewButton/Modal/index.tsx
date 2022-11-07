import { useState } from 'react';
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
    clearData();
  };

  return (
    <ModalComponent open={isOpen} toggleModal={toggleModal} title='New item'>
      <Container onSubmit={handleSubmit} component='main' maxWidth='xl' sx={{ mb: 4 }}>
        <Box>
          <Box>
            <TextField
              required
              id='title'
              name='title'
              label='Name'
              type='text'
              variant='standard'
              value={data.title}
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
        </Box>
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
            clearData();
          }}
        >
          Cancel
        </Button>
      </Box>
    </ModalComponent>
  );
};
