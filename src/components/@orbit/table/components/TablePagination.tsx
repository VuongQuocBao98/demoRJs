import { useCallback, ChangeEventHandler } from 'react';
// mui
import {
  TablePagination as MuiTablePagination,
  Pagination,
  LabelDisplayedRowsArgs,
} from '@mui/material';
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';
import { styled } from '@mui/material/styles';
// table-contexts
import { useTableParamsUpdate, useTableParamState } from '../contexts/TableParamsCtx';
// config
import { MIN_PAGE, DEFAULT_ROWS_PER_PAGE_OPTS, DEFAULT_ROW_PER_PAGE } from 'src/config-global';
import { useTableSelect } from '../contexts/TableSelectCtx';

export type TablePaginationProps = {
  totalPages: number;
  totalRows?: number;
  defaultRowsPerPage?: number;
  defaultPage?: number;
  rowsPerPageOptions?: number[];
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  onPageChange?: (page: number) => void;
};

const StyledPagination = styled(Pagination)(({ theme }) => ({
  flexShrink: 0,
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(2),
}));

function TablePaginationActions(props: TablePaginationActionsProps & { totalPages: number }) {
  const { totalPages, page, onPageChange } = props;

  return (
    <StyledPagination
      count={totalPages}
      page={page}
      onChange={(_, page) => onPageChange(null, page)}
      variant="outlined"
      shape="rounded"
    />
  );
}

export function TablePagination({
  totalPages,
  totalRows = -1,
  defaultRowsPerPage = DEFAULT_ROW_PER_PAGE,
  defaultPage = MIN_PAGE,
  rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTS,
  onRowsPerPageChange,
  onPageChange,
}: TablePaginationProps) {
  const { pagination } = useTableParamState();
  const PageIndex = pagination?.PageIndex || defaultPage;
  const PageSize = pagination?.PageSize || defaultRowsPerPage;
  const setTableParams = useTableParamsUpdate();
  const { resetSelectedAll } = useTableSelect();

  const renderTotalPaginationActionsComp = useCallback(
    (props: TablePaginationActionsProps) => (
      <TablePaginationActions {...props} totalPages={totalPages} />
    ),
    [totalPages]
  );

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setTableParams({
      pagination: {
        PageIndex: MIN_PAGE,
        PageSize: newRowsPerPage,
      },
    });
    onRowsPerPageChange && onRowsPerPageChange(newRowsPerPage);
    onPageChange && onPageChange(MIN_PAGE);
    resetSelectedAll();
  };

  const handleChangePage = (_: any, newPage: number) => {
    setTableParams((oldParams) => ({
      pagination: {
        PageIndex: newPage,
        PageSize: oldParams.pagination?.PageSize as number,
      },
    }));
    onPageChange && onPageChange(newPage);
  };

  const renderLabelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) => {
    const orgFrom = from - PageSize;
    const orgTo = to - PageSize;
    return `${orgFrom}–${orgTo} of ${count !== -1 ? count : `more than ${orgTo}`}`;
  };

  return (
    <MuiTablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      count={totalRows}
      rowsPerPage={PageSize}
      page={PageIndex}
      component={'div'}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={renderTotalPaginationActionsComp}
      labelDisplayedRows={renderLabelDisplayedRows}
    />
  );
}
