import { forwardRef, ReactNode } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';
import { TITLE_DEFAULT } from 'src/config-global';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Helmet>
      <title>{title || TITLE_DEFAULT}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
