import { cloneDeep } from 'lodash';
import { createContext, useContext, useState } from 'react';
import { useTableParamState } from './TableParamsCtx';

type Selected = any;

const TableSelectCtx = createContext<{
  selected: Selected;
  resetSelected: VoidFunction;
  toggleSelectRow: (selected: string) => void;
  selectedAll: (selected: Selected) => void;
  hasBeenSelected: (id: string) => boolean;
  hasBeenSelectedAll: (size: number) => boolean;
  resetSelectedAll: () => void;
}>({
  selected: {},
  resetSelected: () => {},
  toggleSelectRow: (selected) => {},
  selectedAll: (selected) => {},
  hasBeenSelected: (id) => false,
  hasBeenSelectedAll: (size) => false,
  resetSelectedAll: () => {},
});

type TableSelectProviderProps = {
  children: React.ReactNode;
};

function TableSelectProvider({ children }: TableSelectProviderProps) {
  const [selected, setSelected] = useState<Selected>({});
  const { pagination } = useTableParamState();

  const page = pagination?.PageIndex as number;

  const resetSelected = () =>
    setSelected((oldSelected: any) => ({
      ...oldSelected,
      [page]: [],
    }));
  const resetSelectedAll = () => setSelected({});
  const selectedAll = (newSelected: Selected) =>
    setSelected((oldSelected: any) => ({
      ...oldSelected,
      [page]: newSelected,
    }));
  const hasBeenSelected = (id: string) => !!selected?.[page]?.includes(id);

  const hasBeenSelectedAll = (dataSize: number) => selected?.[page]?.length === dataSize;

  const toggleSelectRow = (selectedValue: string) => {
    setSelected((oldSelected: any) => {
      let oldSelectedClone = cloneDeep(oldSelected);
      const hasSelected = !!oldSelectedClone?.[page]?.includes(selectedValue);
      if (hasSelected) {
        return {
          ...oldSelectedClone,
          [page]: oldSelectedClone?.[page]?.filter((value: string) => value !== selectedValue),
        };
      }
      if (!oldSelectedClone?.[page]) {
        oldSelectedClone = { ...oldSelectedClone, [page]: [] };
      }
      oldSelectedClone?.[page]?.push(selectedValue);
      return oldSelectedClone;
    });
  };

  return (
    <TableSelectCtx.Provider
      value={{
        selected,
        resetSelected,
        resetSelectedAll,
        toggleSelectRow,
        selectedAll,
        hasBeenSelected,
        hasBeenSelectedAll,
      }}
    >
      {children}
    </TableSelectCtx.Provider>
  );
}

function useTableSelect() {
  const context = useContext(TableSelectCtx);

  if (typeof context === 'undefined') {
    throw new Error('useTableSelect must be used with in a TableSelectProvider');
  }

  return context;
}

export { useTableSelect, TableSelectProvider };
