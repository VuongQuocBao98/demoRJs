// @mui
import { Box, Button, IconButton, Stack } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// components
import { useNavigate, useParams } from 'react-router-dom';
import { RHFTextField } from 'src/components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import Iconify from '../../../../components/iconify';
import { Else, If, Then } from 'react-if';
import { SKILL_OPTIONS } from '../constant';
import ConfirmDialog from 'src/components/confirm-dialog';
import { useState } from 'react';
import { ExamService } from 'src/services';
import { useSnackbar } from 'notistack';
import { useExamAction } from '../contexts/ExamCtx';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav: VoidFunction;
};

export const NEW_QUESTION = 'new-question';

export default function ExamHeader({ onOpenNav, ...other }: Props) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { refetchQuestion } = useExamAction();

  const mdUp = useResponsive('up', 'md');

  const { skill = '', code = '', section = '', questionId = '' } = useParams();

  const isEnableAction = !!questionId && questionId !== NEW_QUESTION;

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await ExamService.deleteExamQuestion(questionId);
      enqueueSnackbar('Deleted');
      refetchQuestion(section!);
      handleCloseConfirm();
      navigate(linkTo(code, skill, section));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{
        px: mdUp ? 3 : 2,
        height: 80,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        boxSizing: 'content-box',
      }}
      {...other}
    >
      <Stack direction="row" alignItems="center" flexGrow={1}>
        {!mdUp && (
          <IconButton onClick={onOpenNav}>
            <Iconify icon="eva:menu-fill" />
          </IconButton>
        )}

        <Box width="100%">
          <Box
            sx={{
              display: 'grid',
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <If condition={!!code}>
              <Then>
                <RHFTextField
                  fullWidth
                  size="small"
                  name="code"
                  label="Exam Code"
                  disabled
                  value={code?.split('--')[0]}
                  sx={{
                    input: {
                      WebkitTextFillColor: '#212B36 !important',
                      textTransform: 'capitalize',
                    },
                    '.MuiInputBase-root.MuiInputBase-root': {
                      background: '#D7D7D7',
                    },
                  }}
                />
              </Then>

              <Else>
                <Box />
              </Else>
            </If>

            <Stack direction="row" justifyContent="space-between">
              <If condition={!!skill && SKILL_OPTIONS.includes(skill?.split('--')[0])}>
                <Then>
                  <RHFTextField
                    size="small"
                    name="skill"
                    label="Skill"
                    disabled
                    value={skill?.split('--')[0]}
                    sx={{
                      maxWidth: 123,
                      input: {
                        WebkitTextFillColor: '#212B36 !important',
                        textTransform: 'capitalize',
                      },
                      '.MuiInputBase-root.MuiInputBase-root': {
                        background: '#D7D7D7',
                      },
                    }}
                  />
                </Then>
                <Else>
                  <Box />
                </Else>
              </If>
              <Stack direction="row">
                <IconButton disabled={!isEnableAction} onClick={handleOpenConfirm}>
                  <Iconify
                    icon={'ic:baseline-delete'}
                    color={isEnableAction ? '173664' : '#C4C6D0'}
                  />
                </IconButton>
                <IconButton disabled={!isEnableAction}>
                  <Iconify
                    icon={'ph:pencil-simple-fill'}
                    color={isEnableAction ? '173664' : '#C4C6D0'}
                  />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        }
      />
    </Stack>
  );
}

// ----------------------------------------------------------------------

const linkTo = (code: string, skill: string, seciton: string) => {
  const baseUrl = PATH_DASHBOARD.exam.add;
  return `${baseUrl}/${code}/${skill}/${seciton}`;
};
