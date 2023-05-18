import { MenuItem, Button, Link } from '@mui/material';
import { id } from 'date-fns/locale';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PopoverMoreMenu from 'src/components/@orbit/PopoverMoreMenu';
import ConfirmDialog from 'src/components/confirm-dialog';
import Iconify from 'src/components/iconify';

interface IPropsActions {
  idx?: string | number;
  path: string;
  onDelete?: (idx: any) => void;
  OnEdit?: (idx: any) => void;
}

const Actions = ({ idx, path, onDelete, OnEdit }: IPropsActions) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDelete = async () => {
    if (!onDelete) {
      handleCloseConfirm();
      return;
    }
    try {
      await onDelete(idx);
      enqueueSnackbar('Deleted!');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Delete error');
    } finally {
      handleCloseConfirm();
    }
  };

  return (
    <>
      <PopoverMoreMenu>
        <Link
          component={RouterLink}
          to={`${path}/${idx}/edit/`}
          sx={{ display: 'contents' }}
          onClick={() => {
            return !!OnEdit && OnEdit(idx);
          }}
        >
          <MenuItem>
            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2, width: 24, height: 24 }} />
            Edit
          </MenuItem>
        </Link>
        <MenuItem onClick={handleOpenConfirm} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2, width: 24, height: 24 }} />
          Delete
        </MenuItem>
      </PopoverMoreMenu>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        }
      />
    </>
  );
};

export default Actions;
