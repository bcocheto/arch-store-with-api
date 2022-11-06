import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';

interface ModalProps {
  open: boolean;
  toggleModal: () => void;
  title: string;
  children: ReactNode;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalComponent = ({ open, toggleModal, children, title }: ModalProps) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography>{title}</Typography>
          {children}
        </Box>
      </Modal>
    </div>
  );
};
