// assets
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { Button, Stack } from '@mui/material';
import { IFile } from 'src/@types/file';
import { FileFilterButton, FileFilterName, FileGridView } from 'src/components/@orbit/Folder';
import ConfirmDialog from 'src/components/confirm-dialog';
import DateRangePicker, { useDateRangePicker } from 'src/components/date-range-picker';
import Iconify from 'src/components/iconify';
import { useTable } from 'src/components/table';
import { useAxiosSWR } from 'src/hooks/useAxiosSWR';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { fTimestampSecond } from 'src/utils/formatTime';
import { getQueryObjFromString, getQueryStringFromObj } from 'src/utils/query-string';

type IProps = {
  tableDataProp?: IFile[];
  fetcher: (params: ReturnType<typeof getQueryObjFromString>) => Promise<any>;
  fetcherKey?: string;
  onClickItem: (id: string | number) => void;
  onDeleteItems?: (ids: string[]) => void;
};

export type RemoteFolderMethods = {
  refetchTableData: () => void;
};

const RemoteFolderMainInner = (
  { tableDataProp, fetcher, fetcherKey = fetcher?.name, onClickItem, onDeleteItems }: IProps,
  forwardRef: ForwardedRef<RemoteFolderMethods>
) => {
  const table = useTable({ defaultRowsPerPage: 10 });
  const {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    open: openPicker,
    onOpen: onOpenPicker,
    onClose: onClosePicker,
    onReset: onResetPicker,
    isSelected: isSelectedValuePicker,
    isError,
    shortLabel,
  } = useDateRangePicker(null, null);

  const [tableData, setTableData] = useState<any>(tableDataProp);

  const [filterName, setFilterName] = useState('');

  const [openConfirm, setOpenConfirm] = useState(false);

  const params = {
    SearchContent: filterName,
    FromDateCreate: fTimestampSecond(startDate),
    ToDateCreate: fTimestampSecond(endDate),
    PageIndex: table.page + 1,
    PageSize: table.rowsPerPage,
    OrderBy: 0,
  };

  const searchParamsString = getQueryStringFromObj(params);
  const {
    isLoading: isFetcherLoading,
    isValidating,
    mutate,
  } = useAxiosSWR(
    [fetcherKey, searchParamsString],
    ([_, queryParamString]) => {
      return fetcher(getQueryObjFromString(queryParamString));
    },
    {
      onSuccess: (data) => {
        setTableData(data);
      },
    }
  );

  const isLoading = (!tableDataProp && isFetcherLoading) || isValidating;
  const isMountedRef = useIsMountedRef();
  const total = tableData?.total || 0;

  useEffect(
    function reFetchTableWhenUpdateParams() {
      if (isMountedRef.current) {
        mutate();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParamsString]
  );

  useImperativeHandle(
    forwardRef,
    (): RemoteFolderMethods => ({
      refetchTableData: () => {
        mutate();
      },
    })
  );

  const isFiltered = !!filterName || (!!startDate && !!endDate);

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    table.setPage(0);
    setFilterName(event.target.value);
    table.onSelectAllRows(false, []);
  };

  const handleChangeStartDate = (newValue: Date | null) => {
    table.setPage(0);
    table.onSelectAllRows(false, []);
    onChangeStartDate(newValue);
  };

  const handleChangeEndDate = (newValue: Date | null) => {
    table.setPage(0);
    table.onSelectAllRows(false, []);
    onChangeEndDate(newValue);
  };

  const handleDeleteItem = (id: string) => {
    table.setSelected([]);
    !!onDeleteItems && onDeleteItems([id]);
  };

  const handleDeleteItems = (selected: string[]) => {
    table.setSelected([]);
    !!onDeleteItems && onDeleteItems(selected);
  };

  const handleClearAll = () => {
    if (onResetPicker) {
      onResetPicker();
    }
    setFilterName('');
    table.onSelectAllRows(false, []);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <Stack
        spacing={2.5}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        justifyContent="space-between"
        sx={{ mb: 5 }}
      >
        <Stack
          spacing={1}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ md: 'center' }}
          sx={{ width: 1 }}
        >
          <FileFilterName filterName={filterName} onFilterName={handleFilterName} />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <>
              <FileFilterButton
                isSelected={!!isSelectedValuePicker}
                startIcon={<Iconify icon="eva:calendar-fill" />}
                onClick={onOpenPicker}
              >
                {isSelectedValuePicker ? shortLabel : 'Select Date'}
              </FileFilterButton>

              <DateRangePicker
                variant="calendar"
                startDate={startDate}
                endDate={endDate}
                onChangeStartDate={handleChangeStartDate}
                onChangeEndDate={handleChangeEndDate}
                open={openPicker}
                onClose={onClosePicker}
                isSelected={isSelectedValuePicker}
                isError={isError}
              />
            </>

            {isFiltered && (
              <Button
                variant="soft"
                color="error"
                onClick={handleClearAll}
                startIcon={<Iconify icon="eva:trash-2-outline" />}
              >
                Clear
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
      <FileGridView
        table={table}
        dataFiltered={tableData?.data || []}
        total={total}
        onDeleteItem={handleDeleteItem}
        onOpenConfirm={handleOpenConfirm}
        onClickItem={onClickItem}
        isLoading={isLoading}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteItems(table.selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
};

const RemoteFolderMain = forwardRef(RemoteFolderMainInner);
export { RemoteFolderMain };
