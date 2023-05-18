import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Link, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { CustomFile } from 'src/components/upload';
import { fData } from 'src/utils/formatNumber';
import { phoneRegExp } from 'src/utils/validation';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { IResult } from 'src/core/result/domain';
import { redPreset } from '../../../components/settings/presets';

interface FormValuesProps extends Omit<IResult, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type IProps = {
  isView?: boolean;
  isEdit?: boolean;
  currentResult?: any;
};

const GENDER_OPTION = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
];

const ResultNewForm = ({ isView = false, isEdit = false, currentResult }: IProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const NewResultSchema = Yup.object({
    fullName: Yup.string().required('FullName is required'),
    phoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(phoneRegExp, { message: 'Phone number is invalid!' }),
    dateOfBirth: Yup.string().required('Date Of Birth is required'),
    idNumber: Yup.string().required('Id Number is required'),
    email: Yup.string().required('Email is required').email('Email is invalid!'),
    avatarUrl: Yup.mixed().required('Avatar is required'),
    degree: Yup.string().required('Degree is required'),
    workplace: Yup.string().required('Workplace is required'),
    address: Yup.string().required('Address is required'),
  });

  const defaultValues = useMemo(
    () => ({
      fullName: currentResult?.fullName || '',
      phoneNumber: currentResult?.phoneNumber || '',
      dateOfBirth: currentResult?.dateOfBirth || '',
      idNumber: currentResult?.idNumber || '',
      email: currentResult?.email || '',
      avatarUrl: currentResult?.avatarUrl || null,
      gender: currentResult?.gender || GENDER_OPTION[0].value,
      degree: currentResult?.degree || '',
      workplace: currentResult?.workplace || '',
      address: currentResult?.address || '',
    }),
    [currentResult]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewResultSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentResult) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentResult]);

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

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
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
              <RHFTextField name="dateOfBirth" label="Date Of Birth" disabled={isView} />
              <RHFSelect native name="gender" label="Gender">
                {GENDER_OPTION.map((gender) => (
                  <option key={gender.value} value={gender.value}>
                    {gender.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="idNumber" label="Id Number" disabled={isView} />
              <RHFTextField name="phoneNumber" label="Phone Number" disabled={isView} />
              <RHFTextField name="email" label="Email" disabled={isView} />
              <RHFTextField name="degree" label="Degree" disabled={isView} />
              <RHFTextField name="workplace" label="Workplace" disabled={isView} />
            </Box>
            <Box
              sx={{
                mt: 3,
              }}
            >
              <RHFTextField name="address" label="Address" disabled={isView} />
            </Box>

            {!isView && (
              <Stack direction="row" justifyContent="flex-end" spacing={3} sx={{ mt: 20 }}>
                <Link component={RouterLink} to={PATH_DASHBOARD.results.root}>
                  <Button variant="outlined">Cancel</Button>
                </Link>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Stack>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 5 }}>
            <RHFUploadAvatar
              name="avatarUrl"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default ResultNewForm;
