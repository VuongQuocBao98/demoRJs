// form
import { RHFDatePicker } from 'src/components/hook-form';
// types
import { FilterOptionComProps, FilterOptionMetaData, FilterOptionType } from './types';
// context
import { useTableFilterFormAction } from '../contexts/TableFilterFormContext';

type FilterOptionDPProps = {
  compProps?: FilterOptionComProps[FilterOptionType.DateRangePicker];
  metadata: FilterOptionMetaData[FilterOptionType.DateRangePicker];
};

export function FilterOptionDP({ compProps, metadata }: FilterOptionDPProps) {
  const { triggerSubmit } = useTableFilterFormAction();

  return (
    <RHFDatePicker
      label={metadata.label}
      onSubmit={() => {
        triggerSubmit();
      }}
      {...compProps}
      key={metadata.id}
      name={metadata.id!}
    />
  );
}
