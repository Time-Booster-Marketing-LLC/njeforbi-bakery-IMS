import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearColor() {
  return (
    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="secondary" value={20} />
      <LinearProgress color="success" value={50}/>
      <LinearProgress color="inherit" value={100} />
    </Stack>
  );
}
