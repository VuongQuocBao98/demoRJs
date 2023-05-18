// @mui
import { InputAdornment } from '@mui/material';
// @/components
import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';
// types
import { FilterOptionComProps, FilterOptionMetaData, FilterOptionType } from './types';

type FilterOptionInputProps = {
  compProps?: FilterOptionComProps[FilterOptionType.Input];
  metadata: FilterOptionMetaData[FilterOptionType.Input];
};

export function FilterOptionInput({ compProps, metadata }: FilterOptionInputProps) {
  return (
    <RHFTextField
      {...compProps}
      key={metadata.id}
      name={metadata.id!}
      label={metadata.label}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify
              icon={'eva:search-fill'}
              sx={{ color: 'text.disabled', width: 20, height: 20 }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
}
