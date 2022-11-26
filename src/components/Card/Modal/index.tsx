import { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { ModalComponent } from '~/components/Modal';
import { Category } from '~/types/Category';
import { FormControl, Grid, InputLabel, NativeSelect } from '@mui/material';
import { Product } from '~/types/Product';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

interface ModalProps {
  isOpen: boolean;
  product: Product;
  categories: Category[];
  editItem: (newItem: Product) => void;
  toggleModal: () => void;
}

export const EditModalComponent = ({
  isOpen,
  toggleModal,
  product,
  editItem,
  categories,
}: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();
  const [data, setData] = useState<Product>(product);

  const handleChangeCategory = (event: any) => {
    const category = categories.filter((element) => element.id === event.target.value);
    const newData = { ...data };
    newData['category'] = category[0];
    setData(newData);
  };

  const onSubmit = (data: any) => {
    const newItem: Product = {
      ...product,
      ...data,
    };
    editItem(newItem);
    toggleModal();
  };

  return (
    <ModalComponent open={isOpen} toggleModal={toggleModal} title='New item'>
      <Container component='main' maxWidth='xl' sx={{ mb: 4, mt: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label='Title'
                fullWidth
                id='title'
                {...register('title', { required: 'Title field is required' })}
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : null}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='description'
                label='Description'
                {...register('description', { required: 'Description field is required' })}
                error={!!errors.description}
                helperText={errors.description ? errors.description.message : null}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='slug'
                label='Slug'
                {...register('slug', { required: 'Slug field is required' })}
                error={!!errors.slug}
                helperText={errors.slug ? errors.slug.message : null}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                label='Price'
                type='number'
                id='price'
                {...register('price', { required: 'Price field is required' })}
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : null}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel variant='standard' htmlFor='uncontrolled-native'>
                  Category
                </InputLabel>
                <NativeSelect defaultValue={product.category} onChange={handleChangeCategory}>
                  {categories.map((category: Category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                label='Image url'
                type='url'
                id='image'
                {...register('image', { required: 'Image field is required' })}
                error={!!errors.image}
                helperText={errors.image ? errors.image.message : null}
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Save
          </Button>
        </form>
      </Container>
    </ModalComponent>
  );
};
