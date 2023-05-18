import { Button, Stack } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useTableOption } from '../contexts/TableOptionCtx';
import { useTableSelect } from '../contexts/TableSelectCtx';
import { TableFilterOptionProps } from './filter/options/types';

type TableOptionProps = {
  filters?: TableFilterOptionProps[];
  isShowExport: boolean;
};

const TableOption = ({ filters, isShowExport }: TableOptionProps) => {
  const { selected } = useTableSelect();
  const { toggleFilter } = useTableOption();

  const exportPdf = (ids: string[] | number[]) => {
    console.log(ids);
  };

  return (
    <Stack
      direction="row"
      sx={{
        p: 2.5,
        bgcolor: 'background.neutral',
      }}
    >
      {!!filters && (
        <Button
          disableRipple
          color="inherit"
          startIcon={<Iconify icon="ic:round-filter-list" />}
          sx={{
            mr: 1,
          }}
          onClick={toggleFilter}
        >
          Filters
        </Button>
      )}
      {isShowExport && (
        <Button
          disableRipple
          color="inherit"
          startIcon={<Iconify icon="eva:download-fill" />}
          sx={{
            mr: 1,
          }}
          onClick={() => exportPdf(selected)}
        >
          Export PDF
        </Button>
      )}
    </Stack>
  );
};

export default TableOption;
