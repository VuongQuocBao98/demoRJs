// @mui
import { ListItemText } from '@mui/material';
import Iconify from 'src/components/iconify';
import { StyledSectionItem } from '../styles';

// ----------------------------------------------------------------------

export type ExamNavItemProps = {
  title: string;
  open?: boolean;
  active?: boolean;
  isExternalLink?: boolean;
  onClick?: VoidFunction;
};

const ExamNavSectionItem = ({ title, open, active, ...other }: ExamNavItemProps) => {
  return (
    <StyledSectionItem open={open} active={active} {...other}>
      <ListItemText
        primary={title.replace('-', ' ')}
        primaryTypographyProps={{
          noWrap: true,
          sx: {
            fontSize: 11,
            fontWeight: 700,
          },
        }}
      />

      <Iconify
        width={24}
        icon="eva:chevron-right-fill"
        sx={{
          top: 11,
          right: 6,
          position: 'absolute',
          transform: open ? 'rotate(90deg)' : '',
        }}
      />
    </StyledSectionItem>
  );
};

export default ExamNavSectionItem;
