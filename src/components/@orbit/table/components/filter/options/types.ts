import type { RHFTextFieldProps } from 'src/components/hook-form/RHFTextField';
import type { RHFDateRangePickerProps } from 'src/components/hook-form/RHFDateRangePicker';
import { RHFDatePickerProps } from 'src/components/hook-form/RHFDatePicker';
import type { Anonymous } from 'src/@types/common';
import type { TextFieldProps } from '@mui/material';

export enum FilterOptionType {
  Input = 'input',
  DateRangePicker = 'date-range-picker',
  DatePicker = 'date-picker',
  Select = 'select',
}

export interface FilterOptionBaseProps {
  id: string;
  label: string;
  defaultValue: any;
}

export type FilterOptionMetaData = {
  [FilterOptionType.Input]: {
    placeholder?: string;
  } & FilterOptionBaseProps;
  [FilterOptionType.DateRangePicker]: {
    inputFormat: string;
  } & FilterOptionBaseProps;
  [FilterOptionType.DatePicker]: {
    inputFormat: string;
  } & FilterOptionBaseProps;
  [FilterOptionType.Select]: {
    multiple?: boolean;
    options: (string | Anonymous)[];
    displayKey?: string;
    valueKey?: string;
    shouldRenderValueWithChip?: boolean;
  } & FilterOptionBaseProps;
};

export type FilterOptionComProps = {
  [FilterOptionType.Input]: RHFTextFieldProps;
  [FilterOptionType.Select]: TextFieldProps;
  [FilterOptionType.DateRangePicker]: RHFDateRangePickerProps;
  [FilterOptionType.DatePicker]: RHFDatePickerProps;
};

type TableFilterBaseOptionProps = {
  filterFunc?: <T>(datum: T, value: any) => boolean;
  showInSideBar?: boolean;
};

type TableFilterSelectOptionProps = {
  compType: FilterOptionType.Select;
  metadata: FilterOptionMetaData[FilterOptionType.Select];
  compProps?: FilterOptionComProps[FilterOptionType.Select];
} & TableFilterBaseOptionProps;

type TableFilterInputOptionProps = {
  compType: FilterOptionType.Input;
  metadata: FilterOptionMetaData[FilterOptionType.Input];
  compProps?: FilterOptionComProps[FilterOptionType.Input];
} & TableFilterBaseOptionProps;

type TableFilterDRPOptionProps = {
  compType: FilterOptionType.DateRangePicker;
  metadata: FilterOptionMetaData[FilterOptionType.DateRangePicker];
  compProps?: FilterOptionComProps[FilterOptionType.DateRangePicker];
} & TableFilterBaseOptionProps;

type TableFilterDPOptionProps = {
  compType: FilterOptionType.DatePicker;
  metadata: FilterOptionMetaData[FilterOptionType.DatePicker];
  compProps?: FilterOptionComProps[FilterOptionType.DatePicker];
} & TableFilterBaseOptionProps;

export type TableFilterOptionProps =
  | TableFilterSelectOptionProps
  | TableFilterInputOptionProps
  | TableFilterDRPOptionProps
  | TableFilterDPOptionProps;
