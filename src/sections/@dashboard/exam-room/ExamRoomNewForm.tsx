import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { SyntheticEvent, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { IExamRoomAdd } from 'src/@types/exam-room';
import FormProvider, {
  RHFAutocomplete,
  RHFDatePicker,
  RHFDateTimePicker,
  RHFTextField,
} from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { _bankingRecentTransitions } from 'src/_mock/arrays';
import * as Yup from 'yup';
import EmailList from './EmailList';

import { isEmpty } from 'lodash';
import { useAuthContext } from 'src/auth/useAuthContext';
import { LabelRequired } from 'src/components/@orbit/Form';
import useAutocomplete from 'src/components/@orbit/Form/AutoComplete/useAutocomplete';
import { ExamRoomService, ExamService, LecturerService } from 'src/services';
import { combineDateWithTime, fTimestampSecond } from 'src/utils/formatTime';

type FormValuesProps = IExamRoomAdd;

type IProps = {
  isView?: boolean;
  isEdit?: boolean;
  currentRoom?: any;
};

export const EXAM_OPTIONS = [
  { label: 'Listening', value: 0 },
  { label: 'Reading', value: 1 },
  { label: 'Writing', value: 2 },
  { label: 'Speaking', value: 3 },
];

const NewRoomSchema = Yup.object({
  examRoomCode: Yup.string().required('Mã phòng thi là bắt buộc'),
  testExamSetID: Yup.object().required('Đề thi là bắt buộc'),
  date: Yup.string().required('Ngày thi là bắt buộc'),
  start: Yup.string().required('Giờ bắt đầu là bắt buộc'),
  finish: Yup.string().required('Giờ kết thúc là bắt buộc'),
  supervisorIDs: Yup.array()
    .min(1, 'Giám thị thi ít nhất 1 người')
    .required('Giám thị thi là bắt buộc'),
});

const ExamRoomNewForm = ({ isView = false, isEdit = false, currentRoom }: IProps) => {
  const { rolePage } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const defaultValues = useMemo(
    () => ({
      examRoomCode: currentRoom?.examRoomCode || '',
      testExamSetID: currentRoom?.testExamSetID || null,
      date: currentRoom?.date || null,
      start: currentRoom?.start || '',
      finish: currentRoom?.finish || '',
      supervisorIDs: currentRoom?.supervisorIDs || [],
      linkZoom: currentRoom?.linkZoom || '',
    }),
    [currentRoom]
  );

  const {
    isLoading: isLoadingSupervisor,
    options: supervisorOptions,
    debounceFn,
  } = useAutocomplete({
    fn: LecturerService.getAllLecturer,
    addParams: { Role: rolePage.giangvien?._id },
  });
  const {
    isLoading: isLoadingExam,
    options: examOptions,
    debounceFn: debounceExamFn,
  } = useAutocomplete({
    fn: ExamService.getAllExam,
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewRoomSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (!isEdit || (isEdit && currentRoom)) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentRoom]);

  const dataConvert = (data: IExamRoomAdd) => {
    return {
      date: fTimestampSecond(data.date as string),
      start: fTimestampSecond(combineDateWithTime(data.date as string, data.start as string)),
      finish: fTimestampSecond(combineDateWithTime(data.date as string, data.finish as string)),
      supervisorIDs: data.supervisorIDs.map((item: { id: any }) => item.id),
      testExamSetID: data.testExamSetID?.id,
    };
  };

  const onSubmit = async (data: FormValuesProps) => {
    const dataPicker = { ...data, ...dataConvert(data) };
    console.log('dataPicker', dataPicker);

    try {
      if (isEdit) {
      } else {
        await ExamRoomService.createExamRoom(dataPicker);
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.room.root);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRenewLink = async () => {
    const { examRoomCode, date, start, finish, supervisorIDs, testExamSetID } = getValues();

    if (
      !examRoomCode ||
      !date ||
      !start ||
      !finish ||
      isEmpty(supervisorIDs) ||
      isEmpty(testExamSetID)
    ) {
      enqueueSnackbar('Vui lòng điền mã phòng thi, mã đề, ngày thi và giờ thi!', {
        variant: 'error',
      });
      return;
    }
    const { data } = await ExamRoomService.createLinkZoom({
      examRoomCode,
      ...dataConvert(getValues()),
    });
    if (data) {
      setValue('linkZoom', data.linkZoom);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box sx={{ width: '70%', maxWidth: '712px' }}>
          <Box
            sx={{
              display: 'flex',
            }}
          >
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
                      name="examRoomCode"
                      label={<LabelRequired label="Exam room code" />}
                      disabled={isView}
                    />

                    <RHFDatePicker name="date" label={<LabelRequired label="Ngày thi" />} />
                    <RHFDateTimePicker name="start" label={<LabelRequired label="Bắt đầu" />} />
                    <RHFDateTimePicker name="finish" label={<LabelRequired label="Kết thúc" />} />
                    <RHFTextField
                      name="linkZoom"
                      label={<LabelRequired label="Link phòng thi" />}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleRenewLink} edge="end">
                              <Iconify icon="ic:baseline-autorenew" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      disabled
                    />
                    <RHFAutocomplete
                      name="testExamSetID"
                      label={<LabelRequired label="Đề thi" />}
                      loading={isLoadingExam}
                      onInputChange={(_event: SyntheticEvent, value: string) =>
                        debounceExamFn(value)
                      }
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      getOptionLabel={(option) =>
                        typeof option !== 'string' ? option.code : option
                      }
                      options={examOptions}
                    />
                  </Box>
                  <Box sx={{ py: 3 }}>
                    <RHFAutocomplete
                      name="supervisorIDs"
                      label={<LabelRequired label="Giám thị thi" />}
                      multiple
                      limitTags={2}
                      loading={isLoadingSupervisor}
                      onInputChange={(_event: SyntheticEvent, value: string) => debounceFn(value)}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      getOptionLabel={(option) =>
                        typeof option !== 'string' ? option.fullName : option
                      }
                      options={supervisorOptions}
                    />
                  </Box>
                  {!isView && (
                    <Stack direction="row-reverse" sx={{ mt: '250px' }}>
                      <LoadingButton
                        sx={{ bgcolor: '#173664' }}
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                      >
                        {!isEdit ? 'Save & Send' : ''}
                      </LoadingButton>
                      <LoadingButton
                        sx={{ color: '#173664', borderColor: '#173664', marginRight: 1 }}
                        type="submit"
                        variant="outlined"
                        loading={isSubmitting}
                      >
                        {!isEdit ? 'Save' : ''}
                      </LoadingButton>
                      <Link component={RouterLink} to={PATH_DASHBOARD.room.root}>
                        <LoadingButton
                          sx={{ color: '#173664', borderColor: '#173664', marginRight: 1 }}
                          type="submit"
                          variant="outlined"
                        >
                          {!isEdit ? 'Cancel' : ''}
                        </LoadingButton>
                      </Link>
                    </Stack>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={{ mx: 'auto', pt: 0 }}>
          <EmailList
            sx={{ width: 'full', minWidth: '334px', maxWidth: '500px' }}
            title="Email"
            tableData={_bankingRecentTransitions}
            tableLabels={[
              { id: 'description', label: 'Email' },
              { id: 'status', label: 'Status' },
            ]}
            action={
              <Button
                sx={{ borderColor: '#173664', color: '#173664' }}
                variant="outlined"
                startIcon={<Iconify icon={'eva:plus-fill'} />}
              >
                Add Email
              </Button>
            }
          />
        </Box>
      </Box>
    </FormProvider>
  );
};

export default ExamRoomNewForm;
