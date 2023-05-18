import { Stack } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';

type IProps = {
  index: number;
  width: number;
};

const ExamCheckboxNestedTitle = ({ index, width }: IProps) => {
  const { control } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name: `configAnswerCheckBoxs.${index}.checkBoxs`,
  });

  return (
    <Stack>
      {fields.map((title: any, titleIdx: number) => (
        <Stack key={title.id} direction="column">
          <Stack direction="row">
            <Stack direction="row" alignItems="center" sx={{ width: width / 2 - 84 }}>
              <RHFTextField
                helperText=" "
                name={`configAnswerCheckBoxs[${index}].checkBoxs[${titleIdx}].value`}
                label=""
                disabled
                sx={{
                  width: 67,
                  mr: 1,
                  input: {
                    textAlign: 'center',
                  },
                }}
              />
              <RHFTextField
                helperText=" "
                name={`configAnswerCheckBoxs[${index}].checkBoxs[${titleIdx}].label`}
                label=""
              />
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default ExamCheckboxNestedTitle;
