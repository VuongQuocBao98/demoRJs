import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const LogoMini = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {

    // OR using local (public folder)
    // -------------------------------------------------------
    const logo = (
      <Box
        component="img"
        src="/logo/logo_mini.svg"
        sx={{ width: 'auto', height: 40, cursor: 'pointer', ...sx }}
      />
    );
    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} to="/" sx={{ display: 'inline-block' }}>
        {logo}
      </Link>
    );
  }
);

export default LogoMini;
