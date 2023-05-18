import { ForwardedRef, forwardRef, useEffect, useImperativeHandle } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// @mui
import { List, Drawer, Button, Divider, Stack } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// config
import { NAV } from '../../../../config-global';
// @types
import { IExamLabel } from 'src/core/exam/domain';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import { SkeletonMailNavItem } from '../../../../components/skeleton';
//
import { navExamConfig } from '../constant';
import ExamNavItem from './ExamNavItem';
import { useAxiosSWR } from 'src/hooks/useAxiosSWR';
import { useExam } from 'src/core/exam/presentations';

// ----------------------------------------------------------------------

type Props = {
  items: IExamLabel[];
  openNav: boolean;
  onOpenCompose: VoidFunction;
  onCloseNav: VoidFunction;
};

export type RefDataMethods = {
  refetchData: () => void;
};

export const converExamCode = (code: string) => code.split('--');

function ExamNavInner(
  { items, openNav, onOpenCompose, onCloseNav }: Props,
  forwardRef: ForwardedRef<RefDataMethods>
) {
  const { pathname } = useLocation();

  const { code = '' } = useParams();

  const [_codeExam, id] = converExamCode(code);

  const { getExam } = useExam();
  const { data, mutate, isLoading } = useAxiosSWR(code ? `/nav-exam/${id}` : null, () =>
    getExam(id)
  );
  const dataItems = data?.examInfos;

  useImperativeHandle(
    forwardRef,
    (): RefDataMethods => ({
      refetchData: () => {
        mutate();
      },
    })
  );

  const isDesktop = useResponsive('up', 'md');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenCompose = () => {
    onCloseNav();
    onOpenCompose();
  };

  const renderContent = (
    <>
      <Stack justifyContent="center" flexShrink={0} sx={{ px: 2.5, height: 80 }}>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenCompose}
          sx={{
            bgcolor: 'background.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'background.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Add Section
        </Button>
      </Stack>

      <Divider />

      <Scrollbar>
        <List disablePadding>
          {(isLoading ? [...Array(8)] : dataItems!).map((config, index) =>
            !!config ? (
              <ExamNavItem key={config.id} config={config} />
            ) : (
              <SkeletonMailNavItem key={index} />
            )
          )}
        </List>
      </Scrollbar>
    </>
  );

  return isDesktop ? (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: NAV.W_BASE,
          position: 'relative',
        },
      }}
    >
      {renderContent}
    </Drawer>
  ) : (
    <Drawer
      open={openNav}
      onClose={onCloseNav}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          width: NAV.W_BASE,
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}

export default forwardRef(ExamNavInner);