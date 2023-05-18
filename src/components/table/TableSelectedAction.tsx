// @mui
import { Checkbox, Typography, Stack, StackProps } from '@mui/material';
import { useTableSelect } from '../@orbit/table/contexts/TableSelectCtx';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  dense?: boolean;
  action?: React.ReactNode;
  totalItem: number;
  numSelected: number;
  totalItemPerpage: number;
  onSelectAllRows: (checked: boolean) => void;
}

export default function TableSelectedAction({
  dense,
  action,
  totalItem = 0,
  numSelected,
  totalItemPerpage,
  onSelectAllRows,
  sx,
  ...other
}: Props) {
  const { hasBeenSelectedAll } = useTableSelect();

  if (!numSelected) {
    return null;
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        pl: 1,
        pr: 2,
        top: 0,
        left: 0,
        width: 1,
        zIndex: 9,
        height: 41,
        position: 'absolute',
        bgcolor: 'primary.lighter',

        ...(dense && {
          height: 38,
        }),
        ...sx,
      }}
      {...other}
    >
      <Checkbox
        // indeterminate={numSelected > 0 && numSelected < totalItem}
        checked={totalItem > 0 && hasBeenSelectedAll(totalItemPerpage)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onSelectAllRows(event.target.checked)
        }
      />

      <Typography
        variant="subtitle1"
        sx={{
          ml: 2,
          flexGrow: 1,
          color: 'primary.main',
          ...(dense && {
            ml: 3,
          }),
        }}
      >
        {numSelected} selected
      </Typography>

      {action && action}
    </Stack>
  );
}
