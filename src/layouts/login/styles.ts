// @mui
import { styled, alpha } from '@mui/material/styles';
import { maxWidth } from '@mui/system';
// utils
import { bgGradient } from '../../utils/cssStyles';

// ----------------------------------------------------------------------

export const StyledRoot = styled('main')(() => ({
  height: '100%',
  display: 'flex',
  position: 'relative',
  margin: 'auto',
}));

export const StyledSection = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    display: 'flex',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50%',
    height: '100%',
  },
}));

export const StyledSectionBg = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? -1 : 0.94),
    imgUrl: '/assets/background/Login.png',
  }),
  top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
  position: 'relative',
  transform: 'scaleX(1)',
}));

export const StyledContent = styled('div')(({ theme }) => ({
  // width: '100%',
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  justifyContent: 'center',
  padding: theme.spacing(18, 2, 2, 2),
  [theme.breakpoints.up('sm')]: {
    flexShrink: 0,
    padding: theme.spacing(42, 8, 0, 8),
    width: '50%',
  },
  [theme.breakpoints.up('md')]: {
    flexShrink: 0,
    padding: theme.spacing(12, 8, 0, 8),
    width: '50%',
    margin: '0',
  },
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    padding: theme.spacing(20, 8, 2, 8),
    width: '50%',
  },

  [theme.breakpoints.up('xl')]: {
    flexShrink: 0,
    padding: theme.spacing(30, 8, 0, 4),
    width: '50%',
  },
}));
