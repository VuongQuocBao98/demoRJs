import { Box, Button, Stack } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';

const ExamAnswers = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers',
  });

  const handleAdd = () => {
    append({ index: '', value: '', point: '2.5' });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <>
      {fields.map((item, index) => (
        <Box
          key={item.id}
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 0,
            gridTemplateColumns: { xs: 'repeat(2, 1fr)' },
            mt: 2,
          }}
        >
          <Stack direction="row" alignItems="center">
            <RHFTextField
              helperText=" "
              name={`answers[${index}].index`}
              label=""
              sx={{ width: 67, mr: 1 }}
            />
            <RHFTextField
              helperText=" "
              name={`answers[${index}].value`}
              label="Answer"
            />
          </Stack>
          <Stack direction="row">
            <RHFTextField
              helperText=" "
              type="number"
              name={`answers[${index}].point`}
              label="Point"
              sx={{ width: 67 }}
            />
            <Box sx={{ height: 56, display: 'flex', alignItems: 'center', ml: 1 }}>
              <Button
                size="small"
                color="error"
                startIcon={<Iconify icon="eva:trash-2-outline" />}
                sx={{ width: 'fit-content' }}
                disabled={fields.length <= 1}
                onClick={() => handleRemove(index)}
              >
                Remove
              </Button>
            </Box>
          </Stack>

          {index === fields.length - 1 && (
            <Button
              size="small"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleAdd}
              sx={{ flexShrink: 0, width: 'fit-content', my: 'auto' }}
            >
              Add Item
            </Button>
          )}
        </Box>
      ))}
    </>
  );
};

export default ExamAnswers;
