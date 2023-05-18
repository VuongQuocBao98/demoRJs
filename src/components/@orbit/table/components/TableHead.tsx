import { ChangeEvent, useState } from 'react';

// @mui
import {
  Box,
  Checkbox, TableCell,
  TableHead as MuiTableHead, TableRow, TableSortLabel
} from '@mui/material';
import { Else, If, Then, When } from 'react-if';

// contexts
import { SortOderBy, SortParamType, useTableParamsUpdate } from '../contexts/TableParamsCtx';
import { useTableSelect } from '../contexts/TableSelectCtx';
// type
import { ColumnType } from '../types';
// utils
import { visuallyHidden } from '../utils';

// ----------------------------------------------------------------------

type Props<T> = {
  defaultSort?: SortParamType;
  columns: Omit<ColumnType<T>, 'rowCell'>[];
  selectable: boolean;
  rowIds: string[];
  totalItem: number;
};

export function TableHead<T>({ selectable, rowIds, columns, defaultSort, totalItem }: Props<T>) {
  const { selected, selectedAll, resetSelected } = useTableSelect();
  const [sort, setSort] = useState<typeof defaultSort>(defaultSort);
  const { order, orderBy } = sort || {};
  const updateTableParam = useTableParamsUpdate();

  const rowCount = rowIds.length;
  const numSelected = selected.length;

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (checked) {
      selectedAll(rowIds);
      return;
    }

    resetSelected();
  };

  const onColSort = (colId: string) => {
    const isAsc = orderBy === colId && order === 'asc';
    const newSort = {
      order: isAsc ? 'desc' : 'asc',
      orderBy: colId,
    } as SortParamType;

    setSort(newSort);

    updateTableParam({
      sort: newSort,
    });
  };
  
  return (
    <MuiTableHead>
      <TableRow>
        <When condition={selectable}>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < totalItem}
              checked={totalItem > 0 && numSelected === totalItem}
              onChange={handleSelectAllClick}
            />
          </TableCell>
        </When>
        {columns.map((col) => (
          <TableCell
            key={col.id}
            sortDirection={orderBy === col.id ? order : false}
            sx={{ width: col.width, minWidth: col.minWidth, py: 1 }}
            {...col.TableHeadCellProps}
          >
            <If condition={col.sortable}>
              <Then>
                <TableSortLabel
                  hideSortIcon
                  active={orderBy === col.id}
                  direction={orderBy === col.id ? order : SortOderBy.Asc}
                  onClick={onColSort.bind(null, col.id)}
                >
                  {col.label}
                  {orderBy === col.id ? (
                    <Box sx={{ ...visuallyHidden }}>
                      {order === SortOderBy.Desc ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </Then>
              <Else>{col.label}</Else>
            </If>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
}
