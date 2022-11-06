import { Typography } from '@mui/material';
import { ModalComponent } from '~/components/Modal';

interface ModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
}

export const CardModalComponent = ({ isModalOpen, toggleModal }: ModalProps) => {
  return (
    <ModalComponent open={isModalOpen} toggleModal={toggleModal} title={'aaaaa'}>
      <Typography>AAAA</Typography>
    </ModalComponent>
  );
};
