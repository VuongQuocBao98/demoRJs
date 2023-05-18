import { MobileTimePickerProps } from '@mui/lab';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ReactNode } from 'react';
// form
import { Controller, useFormContext } from 'react-hook-form';

export type RHFDateTimePickerProps = {
  name: string;
  label: string | ReactNode;
  mobileTimePickerProps?: MobileTimePickerProps<Date>;
};

export default function RHFDateTimePicker({
  name,
  label,
  mobileTimePickerProps,
}: RHFDateTimePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileTimePicker
            label={'Select Time'}
            views={['hours', 'minutes']}
            {...mobileTimePickerProps}
            onChange={(value: Date | null) => {
              field.onChange(value);
            }}
            value={field.value}
            renderInput={({ inputProps }: any) => (
              <TextField
                fullWidth
                label={label}
                {...inputProps}
                sx={{
                  ...inputProps.sx,
                  input: {
                    textTransform: 'uppercase',
                  },
                }}
                helperText={error?.message}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}
