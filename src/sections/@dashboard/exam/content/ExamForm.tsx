// @mui
import { Box, Button, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { RHFEditor, RHFTextField, RHFUploadAudio } from 'src/components/hook-form';
// components
import { LoadingButton } from '@mui/lab';
import { useParams } from 'react-router-dom';
import { useFormExam } from '../contexts/FormExamCtx';
import ExamCheckBoxItem from './ExamCheckBoxItem';
import ExamAnswers from './ExamAnswers';
//

export const QUESTION_TYPES = ['input', 'combobox', 'checkbox', 'radio'];

export default function ExamForm() {
  const { methods, onCancel } = useFormExam();

  const {
    setValue,
    formState: { isSubmitting, errors, isDirty },
  } = methods;

  console.log('errors', errors);

  const { skill = '' } = useParams();
  const skillText = skill?.split('--')[0];

  const handleDropSingleFile = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('record', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <Box>
      {skillText === 'reading' && (
        <Stack spacing={1} padding={3} sx={{ backgroundColor: '#F7F7F7' }}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Overview
          </Typography>

          <RHFEditor name="overview" sx={{ backgroundColor: '#FFFFFF' }} />
        </Stack>
      )}
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)' },
          }}
        >
          {skillText === 'listening' && (
            <Stack direction="row" justifyContent="space-between">
              <RHFUploadAudio
                name="record"
                maxSize={100000000}
                onDrop={handleDropSingleFile}
                onDelete={() => setValue('record', null, { shouldValidate: true })}
              />
            </Stack>
          )}

          <RHFTextField name="title" label="Title Question" />
        </Box>

        <Stack spacing={1} sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Text Editor
          </Typography>

          <RHFEditor name="content" />
        </Stack>

        {skillText !== 'speaking' && skillText !== 'writing' && (
          <Box sx={{ mt: 3 }}>
            <ExamCheckBoxItem />
            <Typography variant="subtitle2" sx={{ mt: 2, color: 'text.secondary' }}>
              Answers
            </Typography>
            <ExamAnswers />
          </Box>
        )}

        <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 5 }}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!isDirty}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  );
}
