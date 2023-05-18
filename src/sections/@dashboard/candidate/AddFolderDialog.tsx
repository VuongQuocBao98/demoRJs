import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Image from 'src/components/image';
import { addFolder } from 'src/redux/slices/profileGroup';
import { dispatch } from 'src/redux/store';

// ----------------------------------------------------------------------

type IProps = {
  open: boolean;
  onClose: VoidFunction;
  refFolder: any;
};

type FormValuesProps = {
  name: string;
};

const AddFolderDialog = ({ open, onClose, refFolder }: IProps) => {
  const defaultValues = useMemo(
    () => ({
      name: '',
    }),
    []
  );

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const res = await dispatch(addFolder(data));
    refFolder?.current?.refetchTableData();
    console.log('>>>>>>>>>>>', res);

    onClose()
  };

  return (
    <Dialog maxWidth="xs" open={open} onClose={onClose}>
      <Box width={380}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 3, mb: '12px' }}
          >
            <Typography variant="h6">Add Folder</Typography>
          </Stack>

          <Stack alignItems="center">
            <Image
              disabledEffect
              alt="tree view"
              src="/assets/icons/files/ic_folder_gray.svg"
              sx={{ width: 200, height: 200 }}
            />
          </Stack>

          <Stack sx={{ px: 3, py: '12px' }}>
            <RHFTextField size='small' name="name" label="Folder Name" />
          </Stack>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing="12px"
            sx={{ px: 3, pb: '21px' }}
          >
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Create
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </Dialog>
  );
};

export default AddFolderDialog;
