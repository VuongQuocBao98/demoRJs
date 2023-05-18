import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker from '@mui/lab/DateRangePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Stack, { StackProps } from '@mui/material/Stack';
import TextField, { TextFieldProps } from '@mui/material/TextField';
// form
import { Controller, useFormContext } from 'react-hook-form';
// configs
import { DATE_FORMAT } from 'src/config-global';
//

export type RHFDateRangePickerProps = {
  name: string;
  onSubmit?: (selectedDates?: Array<any>) => void;
  dateRangePickerProps?: any;
  startTextFieldSX?: TextFieldProps['sx'];
  endTextFieldSX?: TextFieldProps['sx'];
  stackWrapperProps?: StackProps;
  conjunctionText?: string;
};

export default function RHFDateRangePicker({
  name,
  onSubmit,
  dateRangePickerProps,
  startTextFieldSX,
  stackWrapperProps,
  endTextFieldSX,
  conjunctionText = 'to',
}: RHFDateRangePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            inputFormat={DATE_FORMAT}
            {...field}
            {...dateRangePickerProps}
            value={field.value}
            onClose={() => {
              const selectedDates = field.value as Array<any>;
              if (selectedDates.every(Boolean) && !!onSubmit) {
                onSubmit(selectedDates);
              }
            }}
            renderInput={(startProps: JSX.IntrinsicAttributes & TextFieldProps, endProps: JSX.IntrinsicAttributes & TextFieldProps) => (
              <Stack {...stackWrapperProps}>
                <TextField {...startProps} sx={startTextFieldSX || startProps.sx} />
                <Box sx={{ mx: 2, mt: 4 }}> {conjunctionText} </Box>
                <TextField {...endProps} sx={endTextFieldSX || endProps.sx} />
              </Stack>
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}
