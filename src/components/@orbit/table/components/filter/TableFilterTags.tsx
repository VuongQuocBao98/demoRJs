import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
// @mui
import { Button, Chip, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { Else, If, Then, When } from 'react-if';
import Iconify from 'src/components/iconify';
// types
import { FilterOptionType, TableFilterOptionProps } from './options/types';
// table-contexts
import { useTableParamState, useTableParamsUpdate } from '../../contexts/TableParamsCtx';
// config
import { MIN_PAGE } from 'src/config-global';
// utils
import { getSelectDisplayText } from './utils';
//
import { format } from 'date-fns';
import LabelStyle from 'src/components/@orbit/Form/LabelStyle';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  minHeight: 54,
});

const WrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'stretch',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`,
}));

// ----------------------------------------------------------------------
type Props = {
  options: TableFilterOptionProps[];
};

const getSelectedLabel = (option: TableFilterOptionProps, selectedValue: any) => {
  if (option.compType === FilterOptionType.Input) return selectedValue;

  if (option.compType === FilterOptionType.Select) {
    const { options, displayKey, valueKey } = option.metadata;
    return getSelectDisplayText(selectedValue, options, valueKey!, displayKey!);
  }

  return selectedValue;
};

const SingleTag = ({
  selectedValue,
  onDelete,
  option,
}: {
  selectedValue: any;
  onDelete: VoidFunction;
  option: TableFilterOptionProps;
}) => {
  const label = getSelectedLabel(option, selectedValue);

  if (option.compType === FilterOptionType.DateRangePicker) {
    return (
      <Chip
        key={selectedValue}
        label={format(selectedValue as Date, option.metadata.inputFormat)}
        size="small"
        onDelete={onDelete}
        sx={{ m: 0.5 }}
      />
    );
  }

  if (option.compType === FilterOptionType.DatePicker) {
    return (
      <Chip
        key={selectedValue}
        label={format(selectedValue as Date, option.metadata.inputFormat)}
        size="small"
        onDelete={onDelete}
        sx={{ m: 0.5 }}
      />
    );
  }

  return (
    <Chip key={selectedValue} label={label} size="small" onDelete={onDelete} sx={{ m: 0.5 }} />
  );
};

const MultipleTags = ({
  selectedValues,
  onDelete,
  option,
}: {
  selectedValues: string[];
  onDelete: (value: string) => void;
  option: TableFilterOptionProps;
}) => (
  <>
    {selectedValues.map(
      (value) =>
        value && (
          <SingleTag
            key={value}
            selectedValue={value}
            onDelete={() => onDelete(value)}
            option={option}
          />
        )
    )}
  </>
);

export function TableFilterTags({ options }: Props) {
  const { setValue, reset, resetField } = useFormContext();

  const { filters } = useTableParamState();
  const setTableParams = useTableParamsUpdate();

  const updateFilterParams = (fieldId: string, newValue: any) =>
    setTableParams((oldParams) => ({
      filters: {
        ...oldParams.filters,
        [fieldId]: newValue,
      },
      pagination: {
        PageSize: oldParams.pagination!.PageSize,
        PageIndex: MIN_PAGE,
      },
    }));

  const handleDeleteOnMultipleTags = useCallback(
    (fieldId: string, deletedValue: string, compTye: FilterOptionType) => {
      const isDateRangePicker = compTye === FilterOptionType.DateRangePicker;

      const newSelections = isDateRangePicker
        ? [null, null]
        : (filters![fieldId] as string[]).filter((value) => value !== deletedValue);

      setValue(fieldId, newSelections);
      updateFilterParams(fieldId, newSelections);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters, setValue]
  );

  const handleDeleteOnTag = (fieldId: string, defaultValue: any) => {
    resetField(fieldId);
    updateFilterParams(fieldId, defaultValue);
  };

  const handleResetAll = () => {
    reset();
    setTableParams({
      filters: null,
    });
  };

  const hasChangedFilterValue =
    !!filters &&
    options.some((opt) => {
      const optDefaultValue = opt.metadata.defaultValue;
      const formValue = filters[opt.metadata.id];

      if (typeof optDefaultValue !== typeof formValue) return false;

      if (formValue instanceof Array && optDefaultValue instanceof Array) {
        if (formValue.length !== optDefaultValue.length) return true;
        if (!formValue.length && !optDefaultValue.length) return false;
        return optDefaultValue.every((value) => !formValue.includes(value));
      }

      return optDefaultValue !== formValue;
    });

  return (
    <>
      {hasChangedFilterValue && (
        <RootStyle>
          {options.map((option) => {
            const label = option.metadata.label;
            const fieldId = option.metadata.id;
            const selectedValue = filters[fieldId];
            const isMultipleValues = selectedValue instanceof Array;
            const defaultValue = option.metadata.defaultValue;

            return (
              <When
                key={fieldId}
                condition={
                  (isMultipleValues && selectedValue.length && selectedValue.some(Boolean)) ||
                  (!isMultipleValues && selectedValue)
                }
              >
                <WrapperStyle key={fieldId}>
                  <LabelStyle>{label}:</LabelStyle>
                  <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
                    <If condition={isMultipleValues}>
                      <Then>
                        <MultipleTags
                          selectedValues={selectedValue as string[]}
                          onDelete={(deletedValue) =>
                            handleDeleteOnMultipleTags(fieldId, deletedValue, option.compType)
                          }
                          option={option}
                        />
                      </Then>
                      <Else>
                        <SingleTag
                          selectedValue={selectedValue}
                          onDelete={() => handleDeleteOnTag(fieldId, defaultValue)}
                          option={option}
                        />
                      </Else>
                    </If>
                  </Stack>
                </WrapperStyle>
              </When>
            );
          })}

          <When condition={hasChangedFilterValue}>
            <Button
              color="error"
              size="small"
              onClick={handleResetAll}
              startIcon={<Iconify icon={'ic:round-clear-all'} />}
            >
              Clear All
            </Button>
          </When>
        </RootStyle>
      )}
    </>
  );
}
