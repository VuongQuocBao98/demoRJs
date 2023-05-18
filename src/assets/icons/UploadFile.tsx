import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

function UpLoadFileIcon({ ...other }: BoxProps) {
  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box {...other}>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 11.5V12.5C16.5 13.9001 16.5 14.6002 16.2275 15.135C15.9878 15.6054 15.6054 15.9878 15.135 16.2275C14.6002 16.5 13.9001 16.5 12.5 16.5H5.5C4.09987 16.5 3.3998 16.5 2.86502 16.2275C2.39462 15.9878 2.01217 15.6054 1.77248 15.135C1.5 14.6002 1.5 13.9001 1.5 12.5V11.5M13.1667 5.66667L9 1.5M9 1.5L4.83333 5.66667M9 1.5V11.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    </Box>
  );
}

export default memo(UpLoadFileIcon);
