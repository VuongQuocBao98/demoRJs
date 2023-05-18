import { Stack, Typography } from '@mui/material';
import React from 'react';

const LabelRequired = ({ label }: { label: string }) => {
  return (
    <Stack direction="row">
      {label}{' '}
      <Typography color="#EB5757" sx={{ ml: '2px' }}>
        *
      </Typography>
    </Stack>
  );
};

export default LabelRequired;
