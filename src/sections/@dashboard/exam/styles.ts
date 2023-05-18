import { ListItemButton, styled } from '@mui/material';
import { ExamNavItemProps } from './nav/ExamNavSectionItem';

type StyledItemProps = Omit<ExamNavItemProps, 'title'>;

export const StyledSectionItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'open',
})<StyledItemProps>(({ active, open, theme }) => {
  const activeStyle = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.selected,
    fontWeight: 400,
  };

  return {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    padding: "0 16px",
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    fontSize: 11,
    // Active item
    ...(active && {
      ...activeStyle,
      '&:hover': {
        ...activeStyle,
      },
    }),
    // Open
    // ...(open && !active && activeStyle),
  };
});
