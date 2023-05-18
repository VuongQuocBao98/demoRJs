import { useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from 'src/utils/formatNumber';
// components
import Label from 'src/components/label/Label';
import Iconify from 'src/components/iconify/Iconify';
import { IconifyProps } from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import menuPopover from 'src/components/menu-popover';
import { TableHeadCustom } from 'src/components/table';
import MenuPopover from 'src/components/menu-popover';
import { LoadingButton } from '@mui/lab';
// ----------------------------------------------------------------------

type RowProps = {
  id: string;
  name: string | null;
  avatar: string | null;
  email: string;
  message: string;
  category: string;
  status: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;
  action: any;
}

export default function EmailList({
  title,
  subheader,
  tableLabels,
  tableData,

  action,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} action={action}></CardHeader>

      <TableContainer sx={{ maxHeight: 518, overflowX: 'hidden' }}>
        <Table>
          <TableHeadCustom headLabel={tableLabels} />

          <TableBody>
            {tableData.map((row) => (
              <BankingRecentTransitionsRow key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type BankingRecentTransitionsRowProps = {
  row: RowProps;
};

function BankingRecentTransitionsRow({ row }: BankingRecentTransitionsRowProps) {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleDownload = () => {
    handleClosePopover();
    console.log('DOWNLOAD', row.id);
  };

  const handlePrint = () => {
    handleClosePopover();
    console.log('PRINT', row.id);
  };

  const handleShare = () => {
    handleClosePopover();
    console.log('SHARE', row.id);
  };

  const handleDelete = () => {
    handleClosePopover();
    console.log('DELETE', row.id);
  };

  return (
    <>
      <TableRow>
        <TableCell sx={{ width: 'auto', maxWidth: '253px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderAvatar(row.category, row.avatar)}</Box>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {row.email}
              </Typography>
              <Typography variant="subtitle2"> {row.category}</Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell sx={{ width: '91px' }}>
          <Label
            variant={isLight ? 'soft' : 'filled'}
            color={
              (row.status === 'completed' && 'success') ||
              (row.status === 'none' && 'warning') ||
              'error'
            }
          >
            {sentenceCase(row.status)}
          </Label>
        </TableCell>
      </TableRow>
    </>
  );
}

// ----------------------------------------------------------------------

type AvatarIconProps = {
  icon: IconifyProps;
};

function AvatarIcon({ icon }: AvatarIconProps) {
  return (
    <Avatar
      sx={{
        width: 48,
        height: 48,
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Iconify icon={icon} width={24} />
    </Avatar>
  );
}

// ----------------------------------------------------------------------

function renderAvatar(category: string, avatar: string | null) {
  if (category === 'Books') {
    return <AvatarIcon icon="eva:book-fill" />;
  }
  if (category === 'Beauty & Health') {
    return <AvatarIcon icon="eva:heart-fill" />;
  }
  return avatar ? (
    <Avatar
      alt={category}
      src={avatar}
      sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }}
    />
  ) : null;
}
