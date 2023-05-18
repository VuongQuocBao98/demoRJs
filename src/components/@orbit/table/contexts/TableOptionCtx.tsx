import { createContext, useContext, useState } from 'react';

const TableOptionCtx = createContext<{
  openFilter: boolean;
  toggleFilter: VoidFunction;
}>({
  openFilter: false,
  toggleFilter: () => {},
});

type TableOptionProviderProps = {
  children: React.ReactNode;
};

function TableOptionProvider({ children }: TableOptionProviderProps) {
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const toggleFilter = () => {
    setOpenFilter(prev => !prev)
  }

  return (
    <TableOptionCtx.Provider
      value={{ openFilter, toggleFilter }}
    >
      {children}
    </TableOptionCtx.Provider>
  );
}

function useTableOption() {
  const context = useContext(TableOptionCtx);

  if (typeof context === 'undefined') {
    throw new Error('useTableOption must be used with in a TableOptionProvider');
  }

  return context;
}

export { useTableOption, TableOptionProvider };

