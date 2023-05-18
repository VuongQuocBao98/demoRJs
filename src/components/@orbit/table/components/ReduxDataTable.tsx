import { ForwardedRef, forwardRef, useEffect, useImperativeHandle } from 'react';
import { getTableSearchParamsString, useTableParamState } from '../contexts/TableParamsCtx';
import { MainDataTable } from './MainDataTable';
// hooks
import useIsMountedRef from 'src/hooks/useIsMountedRef';
// table-provider
import { withTableProvider } from '../contexts';
// types
import type { Anonymous } from 'src/@types/common';
import type { MainDataTableProps } from '../types';
import type { TablePaginationProps } from './TablePagination';
// query-string
import { dispatch } from 'src/redux/store';
import { getQueryObjFromString } from 'src/utils/query-string';

type ReduxDataTableProps<T> = {
  reduxApi: any;
  fetchedData: any;
  preFetchedData?: T[];
  tablePaginationProps?: Omit<TablePaginationProps, 'totalPages'> & {
    totalPages?: TablePaginationProps['totalPages'];
  };
} & Omit<MainDataTableProps<T>, 'data' | 'tablePaginationProps'>;

export type RemoteTableMethods = {
  refetchTableData: () => void;
};

function ReduxDataTableCardInner<T extends Anonymous>(
  {
    reduxApi,
    fetchedData,
    shouldPaginate,
    preFetchedData, // useful for server-side pre-fetch
    ...mainTableProps
  }: ReduxDataTableProps<T>,
  forwardRef: ForwardedRef<RemoteTableMethods>
) {
  const params = useTableParamState();

  const searchParamsString = getTableSearchParamsString(params);

  const getData = async () => {
    dispatch(reduxApi(getQueryObjFromString(searchParamsString)));
  };

  useEffect(() => {
    getData();
  }, []);

  const hasPaginated = !!(!Array.isArray(fetchedData) && typeof fetchedData?.total !== 'undefined');
  const tableData = hasPaginated ? fetchedData?.data : (fetchedData as T[]);
  const isMountedRef = useIsMountedRef();
  const totalPages = fetchedData?.totalPages;

  const doFetchOnTableMounted = (shouldSetDefaultParams: boolean) => {
    if (!shouldSetDefaultParams && !preFetchedData) {
      getData();
    }
  };

  useEffect(
    function reFetchTableWhenUpdateParams() {
      if (isMountedRef.current) {
        getData();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParamsString]
  );

  useImperativeHandle(
    forwardRef,
    (): RemoteTableMethods => ({
      refetchTableData: () => {
        getData();
      },
    })
  );

  return (
    <MainDataTable
      {...mainTableProps}
      data={tableData}
      shouldPaginate={shouldPaginate}
      totalItem={fetchedData?.total || 0}
      tablePaginationProps={{
        ...mainTableProps.tablePaginationProps,
        //@ts-ignore
        totalPages,
      }}
      onMounted={doFetchOnTableMounted}
    />
  );
}

const ReduxDataTableCard = forwardRef(ReduxDataTableCardInner);

const ReduxDataTable = withTableProvider(ReduxDataTableCard);

export { ReduxDataTable };
