
// @mui
import { Stack, Typography } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
// routes

//
import AuthRegisterForm from './AuthRegisterForm';

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <LoginLayout title="Manage the job more effectively with Minimal">
      <Stack spacing={2} sx={{ mb: 5, position: 'relative',
              ml:{xl:'355px',lg:'84px', md:'17px',sm:'16px'}
      }}>
        <Typography variant="h4">Sign up</Typography>
      </Stack>
      <AuthRegisterForm />
    </LoginLayout>
  );
}
