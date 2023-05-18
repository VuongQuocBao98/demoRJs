import { Button, IconButton, MenuItem, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ConfirmDialog from 'src/components/confirm-dialog';
import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/menu-popover';
import { ICON } from 'src/config-global';
import { IExamQuestion } from 'src/core/exam/domain';
import useActiveLink from 'src/hooks/useActiveLink';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: 48,
  color: '#212B36',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.hover,
    fontWeight: 400,
  },
}));

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  height: '100%',
  textTransform: 'capitalize',
  fontSize: 14,
}));

// ----------------------------------------------------------------------

type ExamNavQuestionItemsProps = {
  data: IExamQuestion;
};

export default function ExamNavQuestionItem({ data }: ExamNavQuestionItemsProps) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const { code = '', skill = '', section = '' } = useParams();

  const navigate = useNavigate();
  const { active } = useActiveLink(linkTo(code, skill, section, data.id));

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
    event.stopPropagation();
    event.preventDefault();
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDelette = () => {
    console.log('deleted');
  };

  const handleClick = () => {
    navigate(linkTo(code, skill, section, data.id));
  };
  return (
    <StyledRoot
      sx={{
        px: 2,
        typography: 'body2',
        ...(active && {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightMedium',
        }),
      }}
    >
      <StyledContainer onClick={handleClick}>
        <Iconify
          icon={'ic:round-label'}
          sx={{
            mr: 2,
            width: ICON.NAV_ITEM,
            height: ICON.NAV_ITEM,
            color: 'text.secondary',
            ...(active && {
              color: 'primary.main',
            }),
          }}
        />
        <Typography
          sx={{
            color: 'text.secondary',
            ...(active && {
              color: 'text.primary',
            }),
          }}
        >
          {data.title}
        </Typography>
        <IconButton
          color={openPopover ? 'inherit' : 'default'}
          onClick={handleOpenPopover}
          sx={{ position: 'absolute', right: -16, zIndex: 10 }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </StyledContainer>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleDelette}>
            Delete
          </Button>
        }
      />
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

const linkTo = (code: string, skill: string, section: string, question: string) => {
  const baseUrl = PATH_DASHBOARD.exam.add;
  return `${baseUrl}/${code}/${skill}/${section}/${question}`;
};
