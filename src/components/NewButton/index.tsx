import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { WrapperButton } from './style';
import { useState } from 'react';
import { CreateModalComponent } from './Modal';
import { Category } from '~/types/Category';
import { Product } from '~/types/Product';

interface ButtonProps {
  categories: Category[];
  addItem: (item: Product) => void;
}

export const NewButtonComponent = ({ categories, addItem }: ButtonProps) => {
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
        addItem={addItem}
        toggleModal={toggleModal}
      />
    </>
  );
};
