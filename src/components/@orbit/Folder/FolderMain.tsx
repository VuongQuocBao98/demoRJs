// assets
import { useState } from 'react';

import { Button, Stack } from '@mui/material';
import { IFile } from 'src/@types/file';
import { FileFilterButton, FileFilterName, FileGridView } from 'src/components/@orbit/Folder';
import ConfirmDialog from 'src/components/confirm-dialog';
import DateRangePicker, { useDateRangePicker } from 'src/components/date-range-picker';
import Iconify from 'src/components/iconify';
import { getComparator, useTable } from 'src/components/table';
import { fTimestamp } from 'src/utils/formatTime';

type IProps = {
  tableDataProp: IFile[];
  onClickItem: (id: string | number) => void;
};

const FolderMain = ({ tableDataProp, onClickItem }: IProps) => {
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

  const [filterName, setFilterName] = useState('');

  const [filterType, setFilterType] = useState<string[]>([]);

  const [openConfirm, setOpenConfirm] = useState(false);

  const dataFiltered = applyFilter({
    inputData: tableDataProp,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
    filterType,
    filterStartDate: startDate,
    filterEndDate: endDate,
    isError: !!isError,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const isFiltered = !!filterName || !!filterType.length || (!!startDate && !!endDate);

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    table.setPage(0);
    setFilterName(event.target.value);
    table.onSelectAllRows(false, []);
  };

  const handleChangeStartDate = (newValue: Date | null) => {
    table.setPage(0);
    onChangeStartDate(newValue);
    table.onSelectAllRows(false, []);
  };

  const handleChangeEndDate = (newValue: Date | null) => {
    table.setPage(0);
    onChangeEndDate(newValue);
    table.onSelectAllRows(false, []);
  };

  const handleDeleteItem = (id: string) => {
    const { page, setPage, setSelected } = table;
    const deleteRow = tableDataProp.filter((row) => row.id !== id);
    setSelected([]);
    // settableDataProp(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteItems = (selected: string[]) => {
    const { page, rowsPerPage, setPage, setSelected } = table;
    const deleteRows = tableDataProp.filter((row) => !selected.includes(row.id));
    setSelected([]);
    // settableDataProp(deleteRows);

    if (page > 0) {
      if (selected.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selected.length === dataFiltered.length) {
        setPage(0);
      } else if (selected.length > dataInPage.length) {
        const newPage = Math.ceil((tableDataProp.length - selected.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleClearAll = () => {
    if (onResetPicker) {
      onResetPicker();
    }
    setFilterName('');
    setFilterType([]);
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
        dataFiltered={dataFiltered.slice(
          table.page * table.rowsPerPage,
          table.page * table.rowsPerPage + table.rowsPerPage
        )}
        total={dataFiltered.length}
        onDeleteItem={handleDeleteItem}
        onOpenConfirm={handleOpenConfirm}
        onClickItem={onClickItem}
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

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterType,
  filterStartDate,
  filterEndDate,
  isError,
}: {
  inputData: IFile[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterType: string[];
  filterStartDate: Date | null;
  filterEndDate: Date | null;
  isError: boolean;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (file) => file.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStartDate && filterEndDate && !isError) {
    inputData = inputData.filter(
      (file) =>
        fTimestamp(file.dateCreated) >= fTimestamp(filterStartDate) &&
        fTimestamp(file.dateCreated) <= fTimestamp(filterEndDate)
    );
  }

  return inputData;
}

export default FolderMain;
