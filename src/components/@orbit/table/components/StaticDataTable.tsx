import { useMemo } from 'react';
import { MainDataTable } from './MainDataTable';
import type { MainDataTableProps } from '../types';
// table-provider
import { withTableProvider } from '../contexts';
// contexts
import { useTableParamState } from '../contexts/TableParamsCtx';
// types
import { ColumnType } from '../types';
import { Anonymous } from 'src/@types/common';
import { TablePaginationProps } from './TablePagination';

type FilterOption = { query: any; id: string; filterFunc: <T>(datum: T, value: any) => boolean };
type ColumnSortType<T> = Pick<ColumnType<T>, 'id' | 'comparator'> & { order: 'asc' | 'desc' };

function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
    : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
}

// handle filter
// function handleFilterData<T extends Anonymous>(data: T[], filters: FilterOption[]) {
//   return filters.reduce(
//     (stabilizedData, filter) =>
//       stabilizedData.filter((datum) => filter.filterFunc(datum, filter.query)),
//     data
//   );
// }
// handle pagination
// function handlePagination<T>(data: T[], page: number, rowsPerPage: number) {
//   const startIdx = (page - 1) * rowsPerPage;
//   return data.slice(startIdx, startIdx + rowsPerPage);
// }
// handle sort
function handleSortData<T extends Anonymous>(data: T[], sortCfg: ColumnSortType<T>) {
  const comparator = sortCfg.comparator || getComparator(sortCfg.order, sortCfg.id);
  return data.sort(comparator);
}

type StaticDataTableProps<T> = {
  tablePaginationProps?: Omit<TablePaginationProps, 'totalPages'> & {
    totalPages?: TablePaginationProps['totalPages'];
  };
} & Omit<MainDataTableProps<T>, 'tablePaginationProps'>;

function StaticDataTableCard<T extends Anonymous>({ ...mainTableProps }: StaticDataTableProps<T>) {
  const { data, filters: filterOptsCfg, columns } = mainTableProps;
  const { filters, pagination, sort } = useTableParamState();
  const shouldPagination = mainTableProps.shouldPaginate && pagination;

  const tableData = useMemo(() => {
    let stabilizedData = data;
    const shouldFilter = filterOptsCfg && filters;
    const shouldSort = !!sort;

    if (shouldFilter) {
      const filterOpts = filterOptsCfg.map(
        ({ metadata, filterFunc }) =>
          ({
            id: metadata.id,
            filterFunc: filterFunc!,
            query: filters[metadata.id],
          } as FilterOption)
      );

      // stabilizedData = handleFilterData(stabilizedData, filterOpts);
    }

    if (shouldSort) {
      const colCfg = columns.find((col) => col.id === sort.orderBy);
      stabilizedData = handleSortData(stabilizedData, {
        id: sort.orderBy,
        comparator: colCfg?.comparator,
        order: sort.order,
      } as ColumnSortType<T>);
    }

    return stabilizedData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filters, sort]);

  const pageData = useMemo(() => {
    if (shouldPagination) {
      // return handlePagination(tableData, pagination.page, pagination.limit);
    }

    return tableData;
  }, [tableData, shouldPagination, pagination]);

  const totalPages = useMemo(() => {
    if (shouldPagination) {
      // return Math.ceil(tableData.length / pagination.PageSize);
    }

    return 1;
  }, [tableData, shouldPagination, pagination]);

  return (
    <MainDataTable
      {...mainTableProps}
      data={pageData}
      tablePaginationProps={{
        ...mainTableProps.tablePaginationProps,
        totalPages: totalPages,
      }}
    />
  );
}

const StaticDataTable = withTableProvider(StaticDataTableCard);

export { StaticDataTable };

//
