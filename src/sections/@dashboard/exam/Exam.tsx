import { useEffect, useRef, useState } from 'react';
//Mui
import { Card, Stack } from '@mui/material';
import ExamNav from './nav/ExamNav';
import { labels } from './constant';
import ExamHeader from './header/ExamHeader';
import ExamContent from './content/ExamContent';
import { useParams } from 'react-router-dom';
import { FormExamProvider } from './contexts/FormExamCtx';
import ExamDialogCompose from './nav/ExamDialogCompose';
import { ExamProvider } from './contexts/ExamCtx';

const ExamNewForm = () => {
  const [openNav, setOpenNav] = useState(false);
  const [openCompose, setOpenCompose] = useState(false);

  const navRef = useRef(null);
  const params = useParams();

  const { questionId = '' } = params;

  const handleOpenCompose = () => {
    setOpenCompose(true);
  };

  const handleCloseCompose = () => {
    setOpenCompose(false);
  };

  const handleOpenNav = () => {
    setOpenNav(true);
  };

  const handleCloseNav = () => {
    setOpenNav(false);
  };

  useEffect(() => {
    if (questionId) {
      // getQuestion
    }
  }, [questionId]);

  return (
    <Card
      sx={{
        height: { md: '72vh' },
        display: { md: 'flex' },
      }}
    >
      <ExamProvider>
        <ExamNav
          ref={navRef}
          items={labels}
          openNav={openNav}
          onCloseNav={handleCloseNav}
          onOpenCompose={handleOpenCompose}
        />
        <Stack flexGrow={1} sx={{ overflow: 'hidden' }}>
          <FormExamProvider>
            <ExamHeader onOpenNav={handleOpenNav} />
            <ExamContent />
          </FormExamProvider>
        </Stack>
        <ExamDialogCompose navRef={navRef} open={openCompose} onClose={handleCloseCompose} />
      </ExamProvider>
    </Card>
  );
};

export default ExamNewForm;
