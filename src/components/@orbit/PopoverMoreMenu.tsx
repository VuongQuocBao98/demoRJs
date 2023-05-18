// react
import { ReactNode, useState } from 'react';
// @mui
import { IconButton } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
import MenuPopover from '../menu-popover';

// ----------------------------------------------------------------------

// ? Recommend: using with list icon-item: icon has size 20-24px, margin-right 16px to text.

type IProps = {
  children: ReactNode;
};

export default function PopoverMoreMenu({ children }: IProps) {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        {children}
      </MenuPopover>
    </>
  );
}
