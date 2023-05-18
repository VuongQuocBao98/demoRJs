import { Ref, useMemo } from 'react';
// @mui
import { Box, Button, Dialog, MenuItem, Stack, Typography } from '@mui/material';
// components
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { RHFSelect } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Image from 'src/components/image';
import { EXAMTYPE, SKILL_OPTIONS } from '../constant';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useExam } from 'src/core/exam/presentations';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  navRef: any;
};

type FormValuesProps = {
  skill: string;
};

export default function ExamDialogCompose({ navRef, open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const { code = undefined } = params;

  const { createExamSection } = useExam();
  const navigate = useNavigate();

  const defaultValues = useMemo(
    () => ({
      skill: 'listening',
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

  const onSubmit = async (formData: FormValuesProps) => {
    try {
      const dataPicker = {
        examType: EXAMTYPE[formData.skill as keyof typeof EXAMTYPE],
        testExamSetID: !code ? code : code.split('--')[1],
      };
      const data = await createExamSection(dataPicker);
      const { id, code: examCode } = data.testExamSet;
      const { id: sectionId } = data.section;
      navigate(linkTo(`${examCode}--${id}`, `${formData.skill}--${data.exam.id}`, sectionId));
      enqueueSnackbar('Create section success!');
      onClose();
      navRef.current.refetchData();
    } catch (error) {
      console.error(error);
    }
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
            <Typography variant="h6">Add Section</Typography>
          </Stack>

          <Stack alignItems="center">
            <Image
              disabledEffect
              alt="tree view"
              src="/assets/icons/components/ic_tree_view.png"
              sx={{ width: 200, height: 200 }}
            />
          </Stack>

          <Stack sx={{ px: 3, py: '12px' }}>
            <RHFSelect
              name="skill"
              label="Skill"
              size="small"
              SelectProps={{
                native: false,
              }}
              sx={{ textTransform: 'capitalize' }}
            >
              {SKILL_OPTIONS.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </RHFSelect>
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
}

// ----------------------------------------------------------------------

const linkTo = (code: string, skill: string, seciton: string) => {
  const baseUrl = PATH_DASHBOARD.exam.add;
  return `${baseUrl}/${code}/${skill}/${seciton}`;
};
