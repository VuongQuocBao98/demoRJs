import { styled, Typography } from '@mui/material';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  backgroundColor: theme.palette.background.neutral,
  borderRight: `solid 1px ${theme.palette.divider}`,
}));

export default LabelStyle;
