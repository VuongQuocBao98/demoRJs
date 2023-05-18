import { useState, useEffect, forwardRef, ForwardedRef, useImperativeHandle } from 'react';
import { MainDataTable } from './MainDataTable';
import { useTableParamState, getTableSearchParamsString } from '../contexts/TableParamsCtx';
// hooks
import { useAxiosSWR } from 'src/hooks/useAxiosSWR';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
// table-provider
import { withTableProvider } from '../contexts';
// types
import type { Anonymous } from 'src/@types/common';
import type { MainDataTableProps, TablePagination } from '../types';
import type { TablePaginationProps } from './TablePagination';
// query-string
import { getQueryObjFromString } from 'src/utils/query-string';

type RemoteDataTableProps<T> = {
  fetcher: (params: ReturnType<typeof getQueryObjFromString>) => Promise<TablePagination<T> | T[]>;
  fetcherKey?: string;
  preFetchedData?: T[];
  tablePaginationProps?: Omit<TablePaginationProps, 'totalPages'> & {
    totalPages?: TablePaginationProps['totalPages'];
  };
} & Omit<MainDataTableProps<T>, 'data' | 'tablePaginationProps'>;

export type RemoteTableMethods = {
  refetchTableData: () => void;
};

// ? To call functions in RemoteTableMethods
// ? In parent-component - where you use RemoteDataTableCard
// ? 1.Define a ref like:   const tableNameRef = useRef<RemoteTableMethods>(null);
// ? 2.Calling function like: tableNameRef.current && tableNameRef.current.refetchTableData();

function RemoteDataTableCardInner<T extends Anonymous>(
  {
    fetcher,
    fetcherKey = fetcher.name,
    shouldPaginate,
    preFetchedData, // useful for server-side pre-fetch
    ...mainTableProps
  }: RemoteDataTableProps<T>,
  forwardRef: ForwardedRef<RemoteTableMethods>
) {
  const params = useTableParamState();

  const searchParamsString = getTableSearchParamsString(params);
  const [fetchedData, setTableData] = useState<any>(
    preFetchedData
  );

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
  const hasPaginated = !!(!Array.isArray(fetchedData) && typeof fetchedData?.total !== 'undefined');
  const tableData = hasPaginated ? fetchedData?.data : (fetchedData as T[]);
  const isLoading = (!preFetchedData && isFetcherLoading) || isValidating;
  const isMountedRef = useIsMountedRef();
  const totalPages =
    hasPaginated && fetchedData?.total
      ? fetchedData?.perPage
        ? Math.ceil(fetchedData?.total / fetchedData.perPage)
        : fetchedData?.total
      : 0;

  const doFetchOnTableMounted = (shouldSetDefaultParams: boolean) => {
    if (!shouldSetDefaultParams && !preFetchedData) {
      mutate();
    }
  };

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
    (): RemoteTableMethods => ({
      refetchTableData: () => {
        mutate();
      },
    })
  );

  return (
    <MainDataTable
      {...mainTableProps}
      data={tableData}
      isLoading={isLoading}
      shouldPaginate={shouldPaginate}
      totalItem={fetchedData?.totalItem || 0}
      tablePaginationProps={{
        ...mainTableProps.tablePaginationProps,
        //@ts-ignore
        totalPages,
      }}
      onMounted={doFetchOnTableMounted}
    />
  );
}

const RemoteDataTableCard = forwardRef(RemoteDataTableCardInner);

const RemoteDataTable = withTableProvider(RemoteDataTableCard);

export { RemoteDataTable };
