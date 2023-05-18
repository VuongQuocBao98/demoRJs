import { useState, useMemo } from 'react';
// @mui
import { Box, Stack, Button, Drawer, Divider, IconButton, Typography } from '@mui/material';
// config
import { NAV, MIN_PAGE } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
// filter-options
import { TableFilterOption } from './options';
import { FilterOptionType, TableFilterOptionProps } from './options/types';
// form
import { useFormContext } from 'react-hook-form';
// table-contexts
import { useTableParamsUpdate } from '../../contexts/TableParamsCtx';

// ----------------------------------------------------------------------

type Props = {
  onOpen?: VoidFunction;
  onResetAll?: VoidFunction;
  onClose?: VoidFunction;
  options: TableFilterOptionProps[];
};

const setShouldRenderWithChip = (options: TableFilterOptionProps[]) =>
  options.map((option) => {
    if (option.compType !== FilterOptionType.Select) return option;

    return {
      ...option,
      shouldRenderValueWithChip: true,
    };
  });

export function TableFilterSidebar({ onResetAll, onOpen, onClose, options }: Props) {
  const [isOpen, setOpen] = useState(false);
  const { reset } = useFormContext();
  const setTableParams = useTableParamsUpdate();
  const formattedOptions = useMemo(() => setShouldRenderWithChip(options), [options]);

  const handleOpenFilter = () => {
    setOpen(true);
    onOpen && onOpen();
  };

  const handleCloseFilter = () => {
    setOpen(false);
    onClose && onClose();
  };

  const handleResetFilter = () => {
    reset();
    setTableParams((oldParams) => ({
      filters: null,
      pagination: { PageSize: oldParams.pagination!.PageSize, PageIndex: MIN_PAGE },
    }));
    onResetAll && onResetAll();
    handleCloseFilter();
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon={'ic:round-filter-list'} />}
        onClick={handleOpenFilter}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={handleCloseFilter}
        PaperProps={{
          sx: { width: NAV.W_BASE },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={handleCloseFilter}>
            <Iconify icon={'eva:close-fill'} width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {formattedOptions.map((option) => (
              <TableFilterOption key={option.metadata.id} {...option} />
            ))}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={handleResetFilter}
            startIcon={<Iconify icon={'ic:round-clear-all'} />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
