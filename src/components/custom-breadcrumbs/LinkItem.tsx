import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link } from '@mui/material';
//
import { BreadcrumbsLinkProps } from './types';

// ----------------------------------------------------------------------

type Props = {
  link: BreadcrumbsLinkProps;
  activeLast?: boolean;
  disabled: boolean;
  isHideName?: boolean;
};

export default function BreadcrumbsLink({ link, activeLast, disabled, isHideName }: Props) {
  const { name, href, icon } = link;

  const styles = {
    typography: 'body2',
    alignItems: 'center',
    color: '#475467',
    display: 'inline-flex',
    ...(disabled &&
      !activeLast && {
        cursor: 'default',
        pointerEvents: 'none',
        color: 'text.disabled',
      }),
  };

  const renderContent = (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: 'inherit',
            '& svg': { width: 20, height: 20 },
          }}
        >
          {icon}
        </Box>
      )}

      {!isHideName &&name}
    </>
  );

  if (href) {
    return (
      <Link component={RouterLink} to={href} sx={styles}>
        {renderContent}
      </Link>
    );
  }

  return <Box sx={styles}> {renderContent} </Box>;
}
