import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { IApplication } from 'src/@types/application';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { phoneRegExp } from 'src/utils/validation';
import * as Yup from 'yup';

type FormValuesProps = IApplication;

type IProps = {
  isView?: boolean;
  isEdit?: boolean;
  currentApplication?: any;
};

const ApplicationNewForm = ({ isView = false, isEdit = false, currentApplication }: IProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const NewApplicationSchema = Yup.object({
    fullName: Yup.string().required('FullName is required'),
    phoneNumber: Yup.string().required('phoneNumber is required').matches(phoneRegExp, {message: 'Phone number is invalid!'}),
    dateOfBirth: Yup.string().required('dateOfBirth is required'),
    address: Yup.string().required('address is required'),
    email: Yup.string().required('email is required').email('Email is invalid!'),
  });

  const defaultValues = useMemo(
    () => ({
      fullName: currentApplication?.fullName || '',
      phoneNumber: currentApplication?.phoneNumber || '',
      dateOfBirth: currentApplication?.dateOfBirth || '',
      address: currentApplication?.address || '',
      email: currentApplication?.email || '',
    }),
    [currentApplication]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewApplicationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentApplication) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentApplication]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      if (isEdit) {
        // await industryApi.editIndustry({ ...data, id: currentCluster.id });
      } else {
        // await industryApi.createIndustry(data);
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      // push(PATH_DASHBOARD.configuration.cluster);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="fullName" label="Full Name" disabled={isView} />
              <RHFTextField
                name="phoneNumber"
                label="Phone Number"
                disabled={isView}
              />
              <RHFTextField name="dateOfBirth" label="dateOfBirth" disabled={isView} />
              <RHFTextField name="address" label="Address" disabled={isView} />
              <RHFTextField name="email" label="Address" disabled={isView} />
            </Box>
            {!isView && (
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? 'Create Application' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default ApplicationNewForm;
