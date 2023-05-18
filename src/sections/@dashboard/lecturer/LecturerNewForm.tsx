import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFDatePicker, RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';

// redux
import { useSelector } from 'react-redux';
import { RootState, useDispatch } from '../../../redux/store';
import { getRole } from '../../../redux/slices/role';

import { CustomFile } from 'src/components/upload';
import { ILecturer } from 'src/core/lecturer/domain';
import { fData } from 'src/utils/formatNumber';
import { phoneRegExp } from 'src/utils/validation';
import * as Yup from 'yup';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/useAuthContext';
import { addLecturer, EditLecturer } from 'src/redux/slices/lecturer';
import Iconify from 'src/components/iconify';
import IconFileAttached from 'src/assets/icons/fileAttached';
import { omit } from 'lodash';
import { upLoadSingleFile } from 'src/redux/slices/uploadFile';
import { LabelRequired } from 'src/components/@orbit/Form';
import { LecturerService } from 'src/services';
import { fTimestampSecond } from 'src/utils/formatTime';

interface FormValuesProps extends Omit<ILecturer, 'thumbnail'> {
  thumbnail: CustomFile | string | null;
}

type IProps = {
  isView?: boolean;
  isEdit?: boolean;
  currentLecturer?: any;
};

const GENDER_OPTION = [
  { label: 'Men', value: '1' },
  { label: 'Women', value: '0' },
];


const LecturerNewForm = ({ isView = false, isEdit = false, currentLecturer }: IProps) => {
  const [isData, setIsData]: any = useState([]);
  const { rolePage } = useAuthContext();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const NewLecturerSchema = Yup.object({
    ...{
      fullName: Yup.string().required('FullName is required'),
      phone: Yup.string()
        .min(8, 'phone number min 8.')
        .max(12, 'phone number max 12.')
        .matches(phoneRegExp, { message: 'Phone number is invalid!' }),
      birthday: Yup.string().required('Date Of Birth is required'),
      identityCard: Yup.string().required('Id Number is required'),
      thumbnail: Yup.mixed().required('Avatar is required'),
      degree: Yup.string().required('Degree is required'),
      workAdress: Yup.string().required('Workplace is required'),
      address: Yup.string().required('Address is required'),
    },
    ...(!isEdit ? {
      email: Yup.string().required('Email is required').email('Email is invalid!'),
      password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    } : {})
  });

  const defaultValues = useMemo(
    () => ({
      ...{
        email: currentLecturer?.email || '',
        fullName: currentLecturer?.fullName || '',
        phone: currentLecturer?.phone || '',
        birthday: currentLecturer?.birthday || '',
        identityCard: currentLecturer?.identityCard || '',
        thumbnail: currentLecturer?.thumbnail || null,
        gender: currentLecturer?.gender || GENDER_OPTION[0].value,
        degree: currentLecturer?.degree || '',
        workAdress: currentLecturer?.workAdress || '',
        address: currentLecturer?.address || '',
        roleId: rolePage.giangvien?._id,
        id: currentLecturer?.id,
      },
      ...(!isEdit ? {
        password: '' || '',
      } : {})
    }),
    [isEdit, currentLecturer]
  );
  const [showPassword, setShowPassword] = useState(false);
  // const [value, setValueDate] = useState<Date | null>(new Date());


  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewLecturerSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentLecturer) {
      reset();
    }

    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentLecturer]);

  const onSubmit = async (data: FormValuesProps) => {

    try {
      //const time = await fTimestampSecond(data.birthday);
      const time = (new Date(data.birthday)).getTime();
      let res;

      if (isEdit) {
        const dataPicker = omit(data, ['email']);
        res = await dispatch(EditLecturer({ ...dataPicker, birthday: time }));
      } else {
        const dataConvert = { ...data, username: data.email, birthday: time };
        res = await dispatch(addLecturer(dataConvert));
      }

      const payload = res.payload;
      enqueueSnackbar(payload.resultMessage ? payload.resultMessage : '', { variant: payload.success ? 'success' : 'error' });

      navigate(PATH_DASHBOARD.lecturer.root);
      //reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('file', file);
      const fileData: any = await dispatch(upLoadSingleFile(formData));
      const urlData = await fileData.payload;

      if (file) {
        setValue('thumbnail', urlData, { shouldValidate: true });
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
              <RHFTextField
                name="id"
                label={
                  <Box sx={{ display: 'flex' }}>
                    Id <Box sx={{ color: 'red', ml: '2px' }}>*</Box>{' '}
                  </Box>
                }
                disabled={isView}
                style={{ display: "none" }}
              />
              <RHFTextField
                name="roleId"
                label={
                  <Box sx={{ display: 'flex' }}>
                    roleId <Box sx={{ color: 'red', ml: '2px' }}>*</Box>{' '}
                  </Box>
                }
                disabled={isView}
                style={{ display: "none" }}
              />
              <RHFTextField
                name="fullName"
                label={
                  <Box sx={{ display: 'flex' }}>
                    Full name <Box sx={{ color: 'red', ml: '2px' }}>*</Box>{' '}
                  </Box>
                }
                disabled={isView}
              />
              <DatePicker />

              <RHFDatePicker name="birthday" label={<LabelRequired label="Ngày sinh" />} />
              <RHFSelect
                native
                name="gender"
                label={
                  <Box sx={{ display: 'flex' }}>
                    Gender <Box sx={{ color: 'red', ml: '2px' }}>*</Box>{' '}
                  </Box>
                }
              >
                {GENDER_OPTION.map((gender) => (
                  <option key={gender.value} value={gender.value}>
                    {gender.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField
                name="identityCard"
                label={
                  <Box sx={{ display: 'flex' }}>
                    Identity Card <Box sx={{ color: 'red', ml: '2px' }}>*</Box>{' '}
                  </Box>
                }
                disabled={isView}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <IconFileAttached />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <RHFTextField
                name="phone"
                label={
                  <Box sx={{ display: 'flex' }}>
                    Phone Number <Box sx={{ color: 'red', ml: '2px' }}>*</Box>{' '}
                  </Box>
                }
                disabled={isView}
              />
              <RHFTextField
                name="email"
                label={
                  <Box sx={{ display: 'flex' }}>
                    Email <Box sx={{ color: 'red', ml: '2px' }}>*</Box>{' '}
                  </Box>
                }
                disabled={isEdit ? true : false}
              />
              <RHFTextField
                name="address"
                label={
                  <Box sx={{ display: 'flex' }}>
                    Address <Box sx={{ color: 'red', ml: '2px' }}>*</Box>{' '}
                  </Box>
                }
                disabled={isView}
              />
              {!isEdit ?
                <RHFTextField
                  name="password"
                  label={
                    <Box sx={{ display: 'flex' }}>
                      Password<Box sx={{ color: 'red', ml: '2px' }}>*</Box>{' '}
                    </Box>
                  }
                  type={showPassword ? 'text' : 'password'}
                  title="password"
                  placeholder="Enter your password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                /> : ''}
              <RHFTextField
                name="degree"
                label={
                  <Box sx={{ display: 'flex' }}>
                    Degree <Box sx={{ color: 'red', ml: '2px' }}>*</Box>{' '}
                  </Box>
                }
                disabled={isView}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {/* <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <IconFileAttached />
                      </IconButton> */}
                      <IconButton edge="end">
                        <IconFileAttached />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <RHFTextField
                name="workAdress"
                label={
                  <Box sx={{ display: 'flex' }}>
                    Workplace <Box sx={{ color: 'red', ml: '2px' }}>*</Box>{' '}
                  </Box>
                }
                disabled={isView}
              />
            </Box>

            {!isView && (
              <Stack direction="row" justifyContent="flex-end" spacing={3} sx={{ mt: 20 }}>
                <Link component={RouterLink} to={PATH_DASHBOARD.lecturer.root}>
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
              name="thumbnail"
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

export default LecturerNewForm;
