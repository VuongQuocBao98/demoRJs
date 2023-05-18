import { useState } from 'react';
// @mui
import { Box, Card, CardProps, Checkbox, Stack } from '@mui/material';
// hooks
// @types
import { IFolderManager } from 'src/@types/file';
// components
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  folder: IFolderManager;
  selected?: boolean;
  onSelect?: VoidFunction;
  onDelete: VoidFunction;
  onClickItem: (id: string | number) => void;
}

export default function FileFolderCard({
  folder,
  selected,
  onSelect,
  onDelete,
  onClickItem,
  sx,
  ...other
}: Props) {
  const [showCheckbox, setShowCheckbox] = useState(false);

  const handleShowCheckbox = () => {
    setShowCheckbox(true);
  };

  const handleHideCheckbox = () => {
    setShowCheckbox(false);
  };

  const handleSelect = (event: any) => {
    !!onSelect && onSelect();
    event.stopPropagation();
  };

  return (
    <>
      <Card
        onMouseEnter={handleShowCheckbox}
        onMouseLeave={handleHideCheckbox}
        sx={{
          p: 2.5,
          width: 1,
          maxWidth: 222,
          boxShadow: 0,
          bgcolor: 'background.default',
          cursor: 'pointer',
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          ...((showCheckbox || selected) && {
            borderColor: 'transparent',
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          }),
          ...sx,
        }}
        onClick={() => {
          onClickItem(folder.id);
        }}
        {...other}
      >
        {(showCheckbox || selected) && onSelect ? (
          <Checkbox
            checked={selected}
            onClick={handleSelect}
            icon={<Iconify icon="eva:radio-button-off-fill" />}
            checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
          />
        ) : (
          <Box
            component="img"
            src="/assets/icons/files/ic_folder_blue.svg"
            sx={{ width: 40, height: 40 }}
          />
        )}

        <TextMaxLine variant="h6" sx={{ mt: 1, mb: 0.5 }}>
          {folder.name}
        </TextMaxLine>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{ typography: 'caption', color: 'text.disabled' }}
        >
          <Box> {folder.totalItems} items </Box>
        </Stack>
      </Card>
    </>
  );
}
