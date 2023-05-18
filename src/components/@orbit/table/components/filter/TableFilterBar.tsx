// configs
import { MIN_PAGE } from 'src/config-global';
// components
import { TableFilterSidebar } from './TableFilterSidebar';
import { TableFilterTags } from './TableFilterTags';
import { TableFilterOption } from './options';
import { Stack } from '@mui/material';
import { When } from 'react-if';
import FormProvider from 'src/components/hook-form';
// form
import { useForm } from 'react-hook-form';
// types
import type { TableFilterOptionProps } from './options/types';
import { Anonymous } from 'src/@types/common';
// contexts
import { useTableParamsUpdate } from '../../contexts/TableParamsCtx';
import { TableFilterFormProvider } from './contexts/TableFilterFormContext';
// utils
import { visuallyHidden } from '../../utils';

type TableFilterBarProps = {
  options: TableFilterOptionProps[];
};

type TableFilterListProps = TableFilterBarProps;

const TableFilterList = ({ options }: TableFilterListProps) => {
  const preferredOption = options.filter((opt) => !opt.showInSideBar);

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ sm: 'center' }}
      spacing={2}
      width={'100%'}
    >
      {preferredOption.map((option) => (
        <TableFilterOption key={option.metadata.id} {...option} />
      ))}
    </Stack>
  );
};
export function TableFilterBar({ options }: TableFilterBarProps) {
  const shouldShowFSB = options.some((opt) => opt.showInSideBar);
  // form
  const defaultValues = options.reduce(
    (dfValues, opt) => ({
      ...dfValues,
      [opt.metadata.id]: opt.metadata.defaultValue,
    }),
    {}
  );
  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit } = methods;
  const setTableParams = useTableParamsUpdate();
  // ----------------

  // actions
  const onSubmit = (data: Anonymous) => {
    setTableParams((oldParams) => ({
      filters: {
        ...data,
      },
      pagination: {
        PageSize: oldParams.pagination!.PageSize,
        PageIndex: MIN_PAGE,
      },
    }));
  };
  const triggerSubmit = handleSubmit(onSubmit);

  return (
    <Stack width={'100%'} my={3}>
      <FormProvider methods={methods} onSubmit={triggerSubmit}>
        <TableFilterFormProvider triggerSubmit={triggerSubmit}>
          <Stack direction="column" spacing={3}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems="center"
              width={'100%'}
            >
              <TableFilterList options={options} />
              <When condition={shouldShowFSB}>
                <TableFilterSidebar options={options} />
              </When>
              <button type="submit" style={{ ...visuallyHidden }} />
            </Stack>
            <TableFilterTags options={options} />
          </Stack>
        </TableFilterFormProvider>
      </FormProvider>
    </Stack>
  );
}
