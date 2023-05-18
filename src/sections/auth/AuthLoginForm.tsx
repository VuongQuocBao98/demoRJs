import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../redux/store';

// routes
import { PATH_AUTH } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField, RHFCheckbox } from '../../components/hook-form';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

type FormValuesProps = {
  Username: string;
  Password: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const { login } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    Username: Yup.string().email('Email must be a valid email').required('Email is required'),
    Password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    Username: '',
    Password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const formData: any = new FormData();
      formData.append('Username', data.Username);
      formData.append('Password', data.Password);

      await login(formData);
    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.resultMessage || '',
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={'20px'}
        sx={{
          width: { xl: '360px', lg: '360px', md: '360px', sm: '360px' },
        }}
      >
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <Box>
          <Typography variant="subtitle2" sx={{ color: 'text.primary', mb: '6px' }}>
            Email
          </Typography>
          <RHFTextField
            name="Username"
            label=""
            placeholder="Enter your email"
            inputProps={{
              style: {
                height: '11px',
              },
            }}
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ color: 'text.primary', mb: '6px' }}>
            Password
          </Typography>
          <RHFTextField
            name="Password"
            size="small"
            label=""
            type={showPassword ? 'text' : 'password'}
            title="password"
            placeholder="Enter your password"
            inputProps={{
              style: {
                height: '27px',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Stack>

      <Stack
        sx={{
          my: 2,
          flexDirection: 'initial',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: { xl: '360px', lg: '360px', md: '360px', sm: '360px' },
        }}
      >
        <RHFCheckbox name="remember" label="Remember for 30 days" />
        <Link
          alignItems="flex-end"
          component={RouterLink}
          to={PATH_AUTH.resetPassword}
          variant="body2"
          color="#173664"
          sx={{ fontWeight: '600' }}
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          bgcolor: 'primary.main',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'primary.main',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
          width: { sm: '360px' },
          height: 44,
        }}
      >
        Sign in
      </LoadingButton>
    </FormProvider>
  );
}
