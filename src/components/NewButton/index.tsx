import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { WrapperButton } from './style';

interface ButtonProps {
  toggleModalCreate: () => void;
}

export const NewButtonComponent = ({ toggleModalCreate }: ButtonProps) => {
  return (
    <>
      <WrapperButton>
        <Fab color='primary' aria-label='add' onClick={toggleModalCreate}>
          <AddIcon />
        </Fab>
      </WrapperButton>
    </>
  );
};
