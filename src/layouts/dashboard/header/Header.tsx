// @mui
import { AppBar, Breadcrumbs, IconButton, Stack, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// config
import { HEADER, NAV } from '../../../config-global';
// components
import Iconify from '../../../components/iconify';
import { Logo } from '../../../components/logo';
import { useSettingsContext } from '../../../components/settings';
//
import LinkItem from 'src/components/custom-breadcrumbs/LinkItem';
import { routes } from 'src/routes';
import { PATH_DASHBOARD } from 'src/routes/paths';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import AccountPopover from './AccountPopover';
import ContactsPopover from './ContactsPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import { HomeIcon } from 'src/assets/icons';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const breadcrumbs = useBreadcrumbs(routes);
  const theme = useTheme();

  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const isDesktop = useResponsive('up', 'lg');

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

  const checkIsRoot = (path: string) => {
    return path === '/';
  };

  const renderContent = (
    <>
      {isDesktop && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      {/* <Searchbar /> */}

      {isDesktop && (
        <Breadcrumbs separator={<Separator />}>
          {breadcrumbs.map(({ match, breadcrumb }, index) => (
            <LinkItem
              key={match.pathname || ''}
              link={{
                name: breadcrumb,
                href: match.pathname,
                icon: checkIsRoot(match.pathname) ? <HomeIcon /> : undefined,
              }}
              disabled={index === breadcrumbs.length - 1}
              isHideName={checkIsRoot(match.pathname)}
            />
          ))}
        </Breadcrumbs>
      )}

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        <LanguagePopover />

        <NotificationsPopover />

        <ContactsPopover />

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

// ----------------------------------------------------------------------

function Separator() {
  return <Iconify icon={'carbon:chevron-right'} width={16} height={16} />;
}
