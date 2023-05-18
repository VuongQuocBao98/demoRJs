import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Stack
        spacing={2}
        sx={{
          mb: 5,
          position: 'relative',
          alignItems: { xl: 'normal', lg: 'center', sm: 'center' },
        }}
      >
        <Box sx={{ width: 360 }}>
          <Typography sx={{ fontSize: { xs: '24px', md: '30px' }, fontWeight: 600, color: '#101828' }}>
            Log in to your account
          </Typography>
          <Typography color="#475467">Welcome back! Please enter your details.</Typography>
        </Box>
        <AuthLoginForm />
      </Stack>
    </LoginLayout>
  );
}
