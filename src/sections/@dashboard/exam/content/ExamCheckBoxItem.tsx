import { Box, Button, Stack, Typography } from '@mui/material';
import { useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { useRect } from 'src/hooks/useRect';
import ExamCheckboxNestedTitle from './ExamCheckboxNestedTitle';

const ExamCheckBoxItem = () => {
  const ref = useRef(null);

  const { width } = useRect(ref);

  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'configAnswerCheckBoxs',
  });

  const handleAdd = () => {
    append({
      checkBoxs: [
        { label: 'A', value: '' },
        { label: 'B', value: '' },
        { label: 'C', value: '' },
        { label: 'D', value: '' },
      ],
      index: '',
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <Box ref={ref}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Settings
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Iconify icon={'eva:plus-fill'} />}
          sx={{ ml: '18px', borderRadius: '50px' }}
          onClick={handleAdd}
        >
          Question
        </Button>
      </Stack>
      {fields.map((item: any, index) => (
        <Stack
          key={item.id}
          direction="row"
          sx={{
            mt: 2,
            position: 'relative',
            borderRadius: 1,
            border: '1px solid rgba(145, 158, 171, 0.32)',
            padding: '12px',
            width: 'fit-content',
          }}
        >
          {fields.length > 1 && (
            <Iconify
              icon={'eva:close-circle-fill'}
              sx={{
                color: 'error.main',
                mr: 2,
                width: 16,
                height: 16,
                cursor: 'pointer',
                position: 'absolute',
                right: -12,
                top: 4,
                zIndex: 10,
              }}
              onClick={() => handleRemove(index)}
            />
          )}

          <Stack>
            <Stack direction="row" sx={{ mb: 2 }}>
              <Typography sx={{ color: '#919EAB', width: 126 }}>
                No
              </Typography>
              <Typography sx={{ color: '#919EAB' }}>
                Answer Title
              </Typography>
            </Stack>
            <Stack direction="row">
              <RHFTextField
                helperText=" "
                name={`configAnswerCheckBoxs[${index}].index`}
                label=""
                sx={{ width: 56, mr: 1 }}
              />
              <ExamCheckboxNestedTitle index={index} width={width} />
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Box>
  );
};

export default ExamCheckBoxItem;
