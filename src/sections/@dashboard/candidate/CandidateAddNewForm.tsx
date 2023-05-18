import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { omit } from 'lodash';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { LabelRequired } from 'src/components/@orbit/Form';
import FormProvider, {
  RHFDatePicker,
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { CustomFile } from 'src/components/upload';
import { ICandidateForm } from 'src/core/candidate/domain';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { CandidateService } from 'src/services';
import FileService from 'src/services/File';
import { fTimestampSecond } from 'src/utils/formatTime';
import { phoneRegExp } from 'src/utils/validation';
import * as Yup from 'yup';

interface FormValuesProps extends Omit<ICandidateForm, 'photoOfCandidate'> {
  photoOfCandidate: CustomFile | string | null;
}

type IProps = {
  isView?: boolean;
  isEdit?: boolean;
  currentCandidate?: any;
};

const GENDER_OPTION = [
  { label: 'Men', value: '1' },
  { label: 'Women', value: '0' },
];

const CandidateAddNew = ({ isView = false, isEdit = false, currentCandidate }: IProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  const navigate = useNavigate();

  const NewCandidateSchema = Yup.object({
    fullName: Yup.string().required('FullName is required'),
    identificationNumber: Yup.string().required('Identify Number is required'),
    phoneNumber: Yup.string().when({
      is: (exists: any) => !!exists,
      then: (schema) =>
        schema
          .min(8, 'phone number min 8.')
          .max(12, 'phone number max 12.')
          .matches(phoneRegExp, { message: 'Phone number is invalid!' }),
      otherwise: (schema) => schema.notRequired(),
    }),
    phoneBackupNumber: Yup.string().when({
      is: (exists: any) => !!exists,
      then: (schema) =>
        schema
          .min(8, 'phone number min 8.')
          .max(12, 'phone number max 12.')
          .matches(phoneRegExp, { message: 'Phone number is invalid!' }),
      otherwise: (schema) => schema.notRequired(),
    }),
    email: Yup.string().email('Email is invalid!'),
  });

  const defaultValues = useMemo(
    () => ({
      fullName: currentCandidate?.fullName || '',
      dob: currentCandidate?.dob || '',
      gender: currentCandidate?.gender || '1',
      identificationNumber: currentCandidate?.identificationNumber || '',
      phoneNumber: currentCandidate?.phoneNumber || '',
      phoneBackupNumber: currentCandidate?.phoneBackupNumber || '',
      email: currentCandidate?.email || '',
      specificAddress: currentCandidate?.specificAddress || '',
      placeOfWork: currentCandidate?.company || '',
      needsHardCopyCertification: currentCandidate?.needsHardCopyCertification || '',
      className: currentCandidate?.className || '',
      prepCenter: currentCandidate?.prepCenter || '',
      purposeOfTakingExam: currentCandidate?.purposeOfTakingExam || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEdit, currentCandidate]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewCandidateSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentCandidate) {
      reset();
    }
    if (!isEdit) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCandidate]);

  const onSubmit = async (data: FormValuesProps) => {
    const dataPicker = omit(data, ['dob']);
    try {
      if (!isEdit) {
        if (data.photoOfCandidate) {
          const formData = new FormData();
          formData.append('file', data.photoOfCandidate!);
          const { data: dataFile } = await FileService.uploadSingleFile(formData);
          dataPicker.photoOfCandidate = dataFile.fileUrl;
        }

        await CandidateService.createCandidateProfile({
          ...dataPicker,
          dob: fTimestampSecond(data.dob),
          profileGroupID: id,
        });
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(`${PATH_DASHBOARD.candidate.root}/${id}`);
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
        setValue('photoOfCandidate', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row">
        <Box sx={{ width: '70%', maxWidth: '712px' }}>
          <Box sx={{ mb: 2 }}>
            <Box>CHỌN CẤP ĐỘ BẠN MUỐN DỰ THI</Box>
            <RHFRadioGroup
              row
              name="purposeOfTakingExam"
              label=""
              spacing={4}
              sx={{ ml: 1 }}
              options={[
                { value: 'A1', label: 'A1' },
                { value: 'A2', label: 'A2' },
                { value: 'B1', label: 'B1' },
                { value: 'B2', label: 'B2' },
                { value: 'C1', label: 'C1' },
                { value: 'C2', label: 'C2' },
              ]}
            />
          </Box>
          <Stack direction="row">
            <Grid container>
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
                    <RHFTextField
                      name="fullName"
                      label={<LabelRequired label="Họ tên" />}
                      disabled={isView}
                    />
                    <RHFDatePicker name="dob" label="Ngày sinh" />
                    <RHFSelect
                      name="gender"
                      label="Giới tính"
                      SelectProps={{
                        native: false,
                      }}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {GENDER_OPTION.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          sx={{
                            mx: 1,
                            borderRadius: 0.75,
                            textTransform: 'capitalize',
                          }}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                    <RHFTextField
                      name="identificationNumber"
                      label={<LabelRequired label="CMND/ HỘ CHIẾU/ GPLX" />}
                      disabled={isView}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end">
                              <Iconify icon="ion:attach" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <RHFTextField name="phoneNumber" type="number" label="SĐT" disabled={isView} />
                    <RHFTextField
                      name="phoneBackupNumber"
                      type="number"
                      label="SĐT 2"
                      disabled={isView}
                    />
                    <RHFTextField name="email" label="Email" disabled={isView} />
                    <RHFTextField name="specificAddress" label="Địa chỉ" disabled={isView} />
                    <RHFTextField
                      name="placeOfWork"
                      label="Tên trường/ Công ty"
                      disabled={isView}
                    />
                    <RHFTextField
                      name="className"
                      label="Lớp/ Khóa/ Phòng/ Ban"
                      disabled={isView}
                    />
                  </Box>
                  <Box sx={{ py: 3 }}>
                    <RHFTextField
                      name="prepCenter"
                      label="Prep Center"
                      multiline
                      rows={3}
                      disabled={isView}
                      sx={{ width: 'full' }}
                    />
                  </Box>

                  <Box sx={{ width: 'full', display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <RHFSwitch
                        name="needsHardCopyCertification"
                        labelPlacement="end"
                        label="Nhận chứng chỉ bản cứng"
                      />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Link component={RouterLink} to={PATH_DASHBOARD.candidate.table}>
                        <LoadingButton
                          sx={{ color: '#173664', borderColor: '#173664', marginRight: 1 }}
                          type="submit"
                          variant="outlined"
                        >
                          {!isEdit ? 'Cancel' : ''}
                        </LoadingButton>
                      </Link>
                      <LoadingButton
                        sx={{}}
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                      >
                        Save Changes
                      </LoadingButton>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Box>
        <Box sx={{ mx: 'auto', pt: 3 }}>
          <RHFUploadAvatar
            name="photoOfCandidate"
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
                <br /> Max size of 3.1 MB
              </Typography>
            }
          />
        </Box>
      </Stack>
    </FormProvider>
  );
};

export default CandidateAddNew;
export const skill = [{ title: 'Man' }, { title: 'Women' }];
