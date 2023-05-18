import { useRef } from 'react';
// @mui
import { Box, Button, LinearProgress } from '@mui/material';
// @types
import { IFile } from '../../../@types/file';
// components
import Iconify from '../../iconify';
import { TablePaginationCustom, TableProps } from '../../table';
//
import FileFolderCard from './item/FileFolderCard';
import FileActionSelected from './portal/FileActionSelected';
//hooks
import useResponsive from 'src/hooks/useResponsive';
import { useRect } from 'src/hooks/useRect';
import { If, Then } from 'react-if';

// ----------------------------------------------------------------------

type Props = {
  table: TableProps;
  dataFiltered: IFile[];
  total: number;
  onOpenConfirm: VoidFunction;
  onDeleteItem: (id: string) => void;
  onClickItem: (id: string | number) => void;
  isLoading?: boolean;
};

export default function FileGridView({
  table,
  dataFiltered,
  total,
  onDeleteItem,
  onOpenConfirm,
  onClickItem,
  isLoading = false,
}: Props) {
  const {
    page,
    rowsPerPage,
    selected,
    onSelectRow: onSelectItem,
    onSelectAllRows: onSelectAllItems,
    onChangePage,
    onChangeRowsPerPage,
  } = table;

  const lgUp = useResponsive('up', 'lg');

  const containerRef = useRef(null);
  const { width } = useRect(containerRef);

  return (
    <Box>
      <Box ref={containerRef}>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            xl: 'repeat(5, 1fr)',
          }}
        >
          {dataFiltered?.map((folder) => (
            <FileFolderCard
              key={folder.id}
              onClickItem={onClickItem}
              folder={folder}
              selected={selected.includes(folder.id)}
              onSelect={() => onSelectItem(folder.id)}
              onDelete={() => onDeleteItem(folder.id)}
              sx={{ maxWidth: 'auto' }}
            />
          ))}
        </Box>

        {!!selected?.length && (
          <FileActionSelected
            numSelected={selected.length}
            rowCount={dataFiltered.length}
            selected={selected}
            onSelectAllItems={(checked) =>
              onSelectAllItems(
                checked,
                dataFiltered.map((row) => row.id)
              )
            }
            action={
              <>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  startIcon={<Iconify icon="eva:trash-2-outline" />}
                  onClick={onOpenConfirm}
                  sx={{ mr: 1 }}
                >
                  Delete
                </Button>
              </>
            }
          />
        )}
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          right: lgUp ? 40 : 24,
          borderTop: '1px solid rgba(145, 158, 171, 0.24)',
          width: width,
          background: '#ffffff',
        }}
      >
        <If condition={isLoading}>
          <Then>
            <LinearProgress color="primary" sx={{ position: 'absolute', inset: 0 }} />
          </Then>
        </If>
        <TablePaginationCustom
          count={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
          sx={{
            '& .MuiTablePagination-root': { borderTop: 'none' },
            '& .MuiFormControlLabel-root': { px: 0 },
          }}
        />
      </Box>
    </Box>
  );
}
