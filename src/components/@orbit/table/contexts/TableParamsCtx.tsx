import { createContext, useCallback, useContext, useState } from 'react';
import { getQueryStringFromObj } from 'src/utils/query-string';
import { useTableSelect } from './TableSelectCtx';

// type
type TableParamType = Record<string, any> | null | undefined;

export enum SortOderBy {
  Asc = 'asc',
  Desc = 'desc',
}

export type SortParamType =
  | {
      order: 'asc' | 'desc';
      orderBy: string;
    }
  | null
  | undefined;

export type PaginationType =
  | {
      PageIndex: number;
      PageSize: number;
    }
  | null
  | undefined;
export interface TableParams {
  sort: SortParamType;
  filters: TableParamType;
  pagination: PaginationType;
}

// contexts
const TableParamStateCtx = createContext<TableParams>({
  sort: null,
  filters: null,
  pagination: null,
});

const TableParamsUpdateCtx = createContext<
  (params: Partial<TableParams> | ((oldParams: TableParams) => Partial<TableParams>)) => void
>(() => {});

type TableSelectProviderProps = {
  children: React.ReactNode;
};

// provider
function TableParamsProvider(props: TableSelectProviderProps) {
  const [params, setParams] = useState<TableParams>({
    sort: null,
    filters: null,
    pagination: null,
  });

  // const { resetSelected } = useTableSelect();

  const handleUpdateParams = useCallback(
    (params: Partial<TableParams> | ((oldParams: TableParams) => Partial<TableParams>)) => {
      const paramsIsFunction = typeof params === 'function';

      setParams((oldParams) => {
        if (paramsIsFunction) {
          return {
            ...oldParams,
            ...params(oldParams),
          };
        }

        return {
          ...oldParams,
          ...params,
        };
      });

      // resetSelected();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setParams]
  );

  return (
    <TableParamStateCtx.Provider value={params}>
      <TableParamsUpdateCtx.Provider value={handleUpdateParams}>
        {props.children}
      </TableParamsUpdateCtx.Provider>
    </TableParamStateCtx.Provider>
  );
}

// hooks

function useTableParamState() {
  const tableParams = useContext(TableParamStateCtx);

  if (typeof tableParams === 'undefined') {
    throw new Error('useTableParamState must be used within a TableParamsProvider');
  }

  return tableParams;
}

function useTableParamsUpdate() {
  const updateParams = useContext(TableParamsUpdateCtx);

  if (typeof updateParams === 'undefined') {
    throw new Error('useTableParamsUpdate must be used within a TableParamsProvider');
  }

  return updateParams;
}

function getTableSearchParamsString(tableParams: TableParams) {
  const paramsObj = Object.values(tableParams).reduce(
    (params, iParams) => ({ ...params, ...iParams }),
    {}
  );

  return getQueryStringFromObj(paramsObj);
}

export {
  TableParamsProvider,
  useTableParamState,
  useTableParamsUpdate,
  getTableSearchParamsString,
};
