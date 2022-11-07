import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Divider, Typography } from '@mui/material';

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
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  pb: 2,
  pl: 4,
  pr: 4,
};

export const ModalComponent = ({ open, toggleModal, children, title }: ModalProps) => {
  return (
    <Modal
      open={open}
      onClose={toggleModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{
        width: '100%',
      }}
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography variant='h5' component='h2'>
            {title}
          </Typography>
        </Box>
        <Divider variant='fullWidth' />
        {children}
      </Box>
    </Modal>
  );
};
