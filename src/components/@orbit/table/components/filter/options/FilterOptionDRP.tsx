// form
import { RHFDateRangePicker } from 'src/components/hook-form';
// types
import { FilterOptionComProps, FilterOptionMetaData, FilterOptionType } from './types';
// context
import { useTableFilterFormAction } from '../contexts/TableFilterFormContext';

type FilterOptionDRPProps = {
  compProps?: FilterOptionComProps[FilterOptionType.DateRangePicker];
  metadata: FilterOptionMetaData[FilterOptionType.DateRangePicker];
};

export function FilterOptionDRP({ compProps, metadata }: FilterOptionDRPProps) {
  const { triggerSubmit } = useTableFilterFormAction();

  return (
    <RHFDateRangePicker
      onSubmit={() => {
        triggerSubmit();
      }}
      stackWrapperProps={{
        direction: { xs: 'column', sm: 'row' },
        alignItems: { sm: 'center' },
        width: '100%',
      }}
      {...compProps}
      key={metadata.id}
      name={metadata.id!}
    />
  );
}
