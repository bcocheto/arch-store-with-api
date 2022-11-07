import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { WrapperButton } from './style';
import { useState } from 'react';
import { CreateModalComponent } from './Modal';
import { Category } from '~/types/Category';
import { Product } from '~/types/Product';

interface ButtonProps {
  categories: Category[];
  products: Product[];
}

export const NewButtonComponent = ({ categories, products }: ButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <>
      <WrapperButton>
        <Fab color='info' aria-label='add' onClick={toggleModal}>
          <AddIcon />
        </Fab>
      </WrapperButton>
      <CreateModalComponent
        isOpen={isOpen}
        categories={categories}
        products={products}
        toggleModal={toggleModal}
      />
    </>
  );
};
