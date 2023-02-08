import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {

  // Placeholder for something prettier

  return (
    <Box sx={{ textAlign:'center' }}>
      <h3>Loading Games...</h3>
      <br />
      <CircularProgress size={75} />
    </Box>
  )
}