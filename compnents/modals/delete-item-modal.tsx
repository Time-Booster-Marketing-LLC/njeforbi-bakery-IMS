
'use client'
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';

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

interface BasicModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export default function BasicModal({ open, onClose, title, description }: BasicModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" >
          <div className='flex justify-center flex-col items-center'><Image src={'/Group 38686.png'} width={50} height={50} alt='del' />
          <p className='text-black'>Are you sure you want to delete this item</p>
          </div>
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2, textDecorationColor:'black' }}>
          <div className='flex gap-7 w-full justify-center'>
          <button onClick={onClose} className=' bg-[#DB3E36] rounded-full p-5'>cancel</button>
          <button onClick={onClose} className=' text-black border rounded-full border-black p-5'>yes, Delete</button>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
}
