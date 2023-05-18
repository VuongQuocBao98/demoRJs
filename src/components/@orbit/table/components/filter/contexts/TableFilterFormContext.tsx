import { createContext, useContext } from 'react';

type TableFilterFormActionType = {
  triggerSubmit: () => void;
};

const TableFilterFormCtx = createContext<TableFilterFormActionType>({
  triggerSubmit: () => {},
});

function TableFilterFormProvider(props: any) {
  return (
    <TableFilterFormCtx.Provider value={{ triggerSubmit: props.triggerSubmit }}>
      {props.children}
    </TableFilterFormCtx.Provider>
  );
}

// hooks

function useTableFilterFormAction() {
  const tableFilterFormAction = useContext(TableFilterFormCtx);

  if (typeof tableFilterFormAction === 'undefined') {
    throw new Error('useTableFilterFormAction must be used within a TableFilterFormProvider');
  }

  return tableFilterFormAction;
}

export { useTableFilterFormAction, TableFilterFormProvider };

