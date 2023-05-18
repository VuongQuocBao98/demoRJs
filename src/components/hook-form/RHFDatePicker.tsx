import TextField, { TextFieldProps } from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ReactNode } from 'react';
// form
import { Controller, useFormContext } from 'react-hook-form';
// config
import { DATE_FORMAT } from 'src/config-global';

export type RHFDatePickerProps = {
  name: string;
  label: string | ReactNode;
  datePickerProps?: any;
  inputProps?: TextFieldProps;
  onSubmit?: (selectedDates?: any) => void;
};

export default function RHFDatePicker({
  name,
  onSubmit,
  label,
  datePickerProps,
  inputProps,
}: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            {...field}
            inputFormat={DATE_FORMAT}
            {...datePickerProps}
            onClose={() => {
              const selectedDate = field.value;
              if (!!onSubmit) {
                onSubmit(selectedDate);
              }
            }}
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
              <TextField
                {...params}
                {...inputProps}
                fullWidth
                label={label}
                helperText={error?.message}
                error={!!error?.message}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}
