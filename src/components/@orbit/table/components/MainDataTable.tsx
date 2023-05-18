import { useMemo, useEffect } from 'react';
// components
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';
import { TableToolBar } from './TableToolBar';
import { TablePagination } from './TablePagination';
// mui
import { Card, TableContainer, Table, Stack } from '@mui/material';
//types
import { MainDataTableProps, SortParamType } from '../types';
import { PaginationType, useTableParamsUpdate } from '../contexts/TableParamsCtx';
// config
import { MIN_PAGE, DEFAULT_ROW_PER_PAGE } from 'src/config-global';
import TableOption from './TableOption';
import { useTableOption } from '../contexts/TableOptionCtx';
import TableSelection from './TableSelection';
import TableTabs from './TableTabs';

export function MainDataTable<T extends Record<string, any>>({
  data,
  totalItem = 0,
  selectable = false,
  shouldPaginate = false,
  isLoading = false,
  isAlwaysShowToolbar = false,
  isShowExport = false,
  isHideOption = false,
  tabs,

  rowIdKey = 'id',
  columns = [],
  defaultSort,
  filters,

  tableCardProps,
  tableContainerProps,
  tableProps,
  tableToolBarProps,
  tablePaginationProps,
  onChangeTab,
  onMounted,
  handleDeleteMany,
}: MainDataTableProps<T>) {
  const colCfgs = columns.map((colCfg) => ({
    id: colCfg.id,
    rowCell: colCfg.rowCell,
  }));
  const rowIds = data?.map((item) => item[rowIdKey]) || [];
  const dfSortSetting = useMemo(() => {
    if (defaultSort) return defaultSort;

    if (columns.length > 0) {
      const firstCol = columns.find((col) => col.sortable);

      if (!firstCol) return null;

      return {
        order: 'asc',
        orderBy: firstCol.id,
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) as SortParamType;
  const showPagination = shouldPaginate && !!tablePaginationProps;
  const setTableParams = useTableParamsUpdate();
  const { openFilter } = useTableOption();

  const getDefaultPagination = () => {
    if (!showPagination) return null;

    return {
      PageIndex: tablePaginationProps?.defaultPage || MIN_PAGE,
      PageSize: tablePaginationProps?.defaultRowsPerPage || DEFAULT_ROW_PER_PAGE,
    } as PaginationType;
  };

  const getDefaultFilters = () => {
    if (!filters) return null;

    return filters.reduce(
      (dfValues, opt) => ({
        ...dfValues,
        [opt.metadata.id]: opt.metadata.defaultValue,
      }),
      {}
    );
  };

  const initializeTableParams = () => {
    if (!showPagination && !filters && !dfSortSetting) return;

    const dfPagination = getDefaultPagination();
    const dfFilters = getDefaultFilters();
    const dfSort = dfSortSetting;

    setTableParams({
      pagination: dfPagination,
      filters: dfFilters,
      sort: dfSort,
    });
  };

  useEffect(() => {
    initializeTableParams();
    onMounted && onMounted(!!(showPagination || filters || dfSortSetting));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      <TableToolBar {...tableToolBarProps} selectable={selectable} filters={filters} />
      <Card {...tableCardProps}>
        {!!tabs && <TableTabs tabs={tabs} onChangeTab={onChangeTab} />}
        {/* {!isHideOption && <TableOption filters={filters} isShowExport={isShowExport} />} */}
        {/* {(isAlwaysShowToolbar || openFilter) && (
          <TableToolBar {...tableToolBarProps} selectable={selectable} filters={filters} />
        )} */}
        <TableContainer sx={{ minWidth: 800, maxHeight: 600 }} {...tableContainerProps}>
          <TableSelection
            totalItem={totalItem}
            data={data}
            selectable={selectable}
            handleDeleteMany={handleDeleteMany}
          />
          <Table stickyHeader {...tableProps}>
            <TableHead
              totalItem={totalItem}
              selectable={selectable}
              rowIds={rowIds}
              columns={columns.map(({ rowCell, ...col }) => col)}
              defaultSort={dfSortSetting}
            />
            <TableBody
              items={data}
              tableSelectable={selectable}
              rowIdKey={rowIdKey}
              emptyRows={0}
              colConfigs={colCfgs}
              isLoading={isLoading}
            />
          </Table>
        </TableContainer>
        {showPagination && <TablePagination {...tablePaginationProps} />}
      </Card>
    </Stack>
  );
}
