
'use client'
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import CustomTabPanel from '../tab/product-creation-tab'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface productModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export default function BroductModal({ open, onClose, title, description }: productModalProps) {

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" >
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2, textDecorationColor:'black' }}>
          <CustomTabPanel/>
        </Typography>
      </Box>
    </Modal>
  );
}
