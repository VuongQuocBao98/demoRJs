// table-types
import { ColumnType } from '../types';
// components
import { Else, If, Then, When } from 'react-if';
// mui
import {
  Checkbox,
  LinearProgress,
  Skeleton,
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
} from '@mui/material';
// configs
import { DEFAULT_ROW_PER_PAGE, TABLE_ROW_HEIGHT } from 'src/config-global';
// contexts
import { TableNoData } from 'src/components/table';
import { useTableParamState } from '../contexts/TableParamsCtx';
import { useTableSelect } from '../contexts/TableSelectCtx';

function TableRowsEmpty({ emptyRows, colNum }: { emptyRows: number; colNum: number }) {
  return (
    <TableRow style={{ height: TABLE_ROW_HEIGHT * emptyRows }}>
      <TableCell colSpan={colNum} />
    </TableRow>
  );
}

function TableInitialBody({ colNum }: { colNum: number }) {
  const { pagination } = useTableParamState();
  const rows = Array(pagination?.PageSize || DEFAULT_ROW_PER_PAGE).fill(0);

  return (
    <>
      {rows.map((_row, idx) => (
        <TableRow style={{ height: TABLE_ROW_HEIGHT }} key={idx}>
          <TableCell colSpan={colNum}>
            <Skeleton animation="wave" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

type ItemType<T> = T & { selectable?: boolean };

type TableBodyProps<T> = {
  items: ItemType<T>[];
  emptyRows: number;
  isLoading: boolean;

  tableSelectable: boolean;
  colConfigs: Pick<ColumnType<T>, 'id' | 'rowCell'>[];
  rowIdKey: string;
};

export function TableBody<T extends Record<string, any>>({
  items,
  emptyRows,
  rowIdKey,
  tableSelectable,
  colConfigs,
  isLoading,
}: TableBodyProps<T>) {
  const { hasBeenSelected, toggleSelectRow } = useTableSelect();
  const isNotFound = items && !items.length;
  const isInitial = !items && isLoading;
  const colNum = tableSelectable ? colConfigs.length + 1 : colConfigs.length;

  return (
    <MuiTableBody sx={{ position: 'relative' }}>
      <If condition={isInitial}>
        <Then>
          <TableInitialBody colNum={colNum} />
        </Then>
        <Else>
          <If condition={isNotFound}>
            <Then>
              <TableNoData isNotFound />
            </Then>
            <Else>
              {() => (
                <>
                  <If condition={isLoading}>
                    <Then>
                      <TableRow
                        sx={{
                          position: 'absolute',
                          inset: 0,
                        }}
                      >
                        <TableCell colSpan={colNum}>
                          <LinearProgress color="primary" sx={{ position: 'absolute', inset: 0 }} />
                        </TableCell>
                      </TableRow>
                    </Then>
                  </If>
                  {items &&
                    items.map((row) => {
                      const itemKey = row[rowIdKey] as string;
                      const isItemSelected = hasBeenSelected(itemKey);
                      const isSelectableRow =
                        typeof row.selectable !== 'undefined' ? row.selectable : tableSelectable;

                      return (
                        <TableRow
                          hover={!isLoading}
                          key={itemKey}
                          tabIndex={-1}
                          role={tableSelectable ? 'checkbox' : ''}
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          className={isLoading ? 'loading' : ''}
                        >
                          <When condition={isSelectableRow}>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onClick={toggleSelectRow.bind(null, itemKey)}
                              />
                            </TableCell>
                          </When>
                          {colConfigs.map((colCfg) => {
                            const customizedCellRender = colCfg.rowCell?.render;
                            const colValue = row[colCfg.id];
                            return (
                              <TableCell
                                key={`${itemKey}-${colCfg.id}`}
                                {...colCfg.rowCell?.TableCellProps}
                              >
                                {customizedCellRender
                                  ? customizedCellRender(row, colCfg.id, colValue)
                                  : colValue}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  <When condition={emptyRows}>
                    <TableRowsEmpty emptyRows={emptyRows} colNum={colNum} />
                  </When>
                </>
              )}
            </Else>
          </If>
        </Else>
      </If>
    </MuiTableBody>
  );
}
