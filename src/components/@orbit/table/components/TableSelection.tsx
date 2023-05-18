import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import { useState } from 'react';
import ConfirmDialog from 'src/components/confirm-dialog';
import Iconify from 'src/components/iconify';
import { TableSelectedAction } from 'src/components/table';
import { flattenSelected } from 'src/utils/flattenArray';
import { useTableSelect } from '../contexts/TableSelectCtx';

// ----------------------------------------------------------------------

export type TableSelectionProps = {
  selectable: boolean;
  data: any;
  totalItem: number;
  handleDeleteMany?: (selectedRows: string[]) => void;
};

const TableSelection = ({ selectable, data, totalItem, handleDeleteMany }: TableSelectionProps) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const { selected, resetSelected, selectedAll } = useTableSelect();

  const numSelected = flattenSelected(selected).length;
  const shouldShowSelectedToolBar = selectable && numSelected > 0;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    handleDeleteMany && handleDeleteMany(selectedRows);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      selectedAll(data.map((row: { id: any }) => row.id));
      return;
    }

    resetSelected();
  };

  return (
    <>
      {shouldShowSelectedToolBar && (
        <TableSelectedAction
          numSelected={numSelected}
          totalItem={totalItem}
          totalItemPerpage={data.length}
          onSelectAllRows={handleSelectAllClick}
          action={
            <Stack direction="row">
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={handleOpenConfirm}>
                  <Iconify icon="eva:trash-2-outline" />
                </IconButton>
              </Tooltip>
            </Stack>
          }
        />
      )}
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
};

export default TableSelection;
