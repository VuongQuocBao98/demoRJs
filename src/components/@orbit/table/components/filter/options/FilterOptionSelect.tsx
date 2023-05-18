import { useCallback } from 'react';
// @mui
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
// @/components
import { RHFSelect } from 'src/components/hook-form';
// types
import { FilterOptionComProps, FilterOptionMetaData, FilterOptionType } from './types';
import { SelectChangeEvent } from '@mui/material/Select';
// hooks
import { useFormContext } from 'react-hook-form';
// context
import { useTableFilterFormAction } from '../contexts/TableFilterFormContext';
// utils
import { getSelectDisplayText } from '../utils';

type FilterOptionSelectProps = {
  compProps?: FilterOptionComProps[FilterOptionType.Select];
  metadata: FilterOptionMetaData[FilterOptionType.Select];
};

const selectItem = (options: any[], item: any) => {
  const itemIdx = options.indexOf(item);

  if (itemIdx > -1) {
    const newOptions = [...options];
    newOptions.splice(itemIdx, 1);
    return newOptions;
  }

  return [...options, item];
};

export function FilterOptionSelect({ metadata, compProps }: FilterOptionSelectProps) {
  const {
    id,
    label,
    multiple,
    options,
    displayKey = 'name',
    valueKey = 'value',
    shouldRenderValueWithChip = false,
    defaultValue,
  } = metadata;

  const { watch, setValue } = useFormContext();
  const { triggerSubmit } = useTableFilterFormAction();

  const selection = watch(id);

  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const {
        target: { value },
      } = event;

      const newValue = multiple ? selectItem(selection, value) : value;

      setValue(id, newValue);
      triggerSubmit();
    },
    [multiple, id, setValue, selection, triggerSubmit]
  );

  const defaultRenderSelectedValue = useCallback(
    (selected: typeof selection) => {
      const hasMultipleSelections = selected instanceof Array && multiple;
      if (shouldRenderValueWithChip && hasMultipleSelections) {
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value: string) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        );
      }

      if (typeof options === 'undefined') return <span>Loading...</span>;

      return (
        <span>
          {hasMultipleSelections
            ? selected
                .map((value) => getSelectDisplayText(value, options, valueKey, displayKey))
                .join(', ')
            : getSelectDisplayText(selected, options, valueKey, displayKey)}
        </span>
      );
    },
    [shouldRenderValueWithChip, multiple, options, valueKey, displayKey]
  );

  return (
    <RHFSelect
      {...compProps}
      id={id}
      name={id}
      label={label}
      SelectProps={{
        native: false,
        renderValue: (selected) => defaultRenderSelectedValue(selected),
        input: <OutlinedInput label={label} />,
        defaultValue,
        displayEmpty: true,
        onChange: handleChange,
      }}
    >
      {options &&
        options.map((option) => {
          const isObjectItem = typeof option === 'object';
          const displayText = isObjectItem ? option[displayKey] : option;
          const value = isObjectItem ? option[valueKey] : option;

          if (multiple) {
            return (
              <MenuItem key={value} value={value}>
                <Checkbox checked={selection.includes(value)} />
                <ListItemText primary={displayText} />
              </MenuItem>
            );
          }

          return (
            <MenuItem key={value} value={value}>
              {displayText}
            </MenuItem>
          );
        })}
    </RHFSelect>
  );
}
