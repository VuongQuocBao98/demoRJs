import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledEditor = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
  '& .cke_chrome': {
    border: 0,
  },
  '& .cke_top': {
    background: theme.palette.background.paper,
  },
  '& .cke_bottom': {
    background: theme.palette.background.paper,
  },
}));
