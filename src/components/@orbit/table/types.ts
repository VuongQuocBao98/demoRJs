import type { CardProps, TableCellProps, TableContainerProps, TableProps } from '@mui/material';
import type { ReactNode } from 'react';
import type { TableFilterOptionProps } from './components/filter/options/types';
import type { TablePaginationProps } from './components/TablePagination';
import { TabsType } from './components/TableTabs';
import type { TableToolBarProps } from './components/TableToolBar';
import type { SortParamType, TableParams } from './contexts/TableParamsCtx';

export type ColumnType<T> = {
  id: string;
  label: string;
  sortable?: boolean;
  TableHeadCellProps?: TableCellProps;
  comparator?: (a: T, b: T) => number; // run on client-side
  width?: number;
  minWidth?: number;

  rowCell?: {
    render?: (datum: T, colKey?: string, colValue?: any) => ReactNode;
    TableCellProps?: TableCellProps;
  };
};

export type TableBodyNotFoundProps = {
  searchQuery?: string;
  desc?: string;
  children?: ReactNode;
};

export type MainDataTableProps<T> = {
  data: T[];
  totalItem?: number;
  columns: ColumnType<T>[];
  isLoading?: boolean;
  selectable?: boolean;
  rowIdKey?: string;
  defaultSort?: SortParamType;
  filters?: TableFilterOptionProps[];
  shouldPaginate?: boolean;
  isAlwaysShowToolbar?: boolean;
  isShowExport?: boolean;
  isHideOption?: boolean;
  tabs?: TabsType[];
  size?: string;

  tableToolBarProps?: Pick<TableToolBarProps, 'primaryAction'>;
  tableContainerProps?: TableContainerProps;
  tableProps?: TableProps;
  tableCardProps?: CardProps;
  tablePaginationProps?: TablePaginationProps;

  onChangeTab?: (tab: string | number) => void;
  onMounted?: (shouldSetDefaultParams: boolean) => void;
  handleDeleteMany?: (selectedRows: string[]) => void;
};

export interface IPagination {
  total?: number;
  page?: number;
  perPage?: number;
  currentPage?: number;
  lastPage?: number;
  from?: number;
  to?: number;
  firstPageUrl?: string;
  lastPageUrl?: string;
  nextPageUrl?: string | null;
  prevPageUrl?: string | null;
  path?: string;
  data?: Array<any>;
  pageIndex?: number;
  pageSize?: number;
  totalPage?: number;
  totalItem?: number;
  items?: Array<any>;
}

export type TablePagination<T> = Omit<IPagination, 'data'> & {
  data: T[];
};

export type { TableParams, SortParamType };
