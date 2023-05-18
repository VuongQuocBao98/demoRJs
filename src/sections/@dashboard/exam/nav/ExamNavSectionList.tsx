import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Button, Collapse } from '@mui/material';
import useActiveLink from 'src/hooks/useActiveLink';
import ExamNavQuestionItem from './ExamNavQuestionItem';
import ExamNavSectionItem from './ExamNavSectionItem';
import { PATH_DASHBOARD } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useAxiosSWR } from 'src/hooks/useAxiosSWR';
import { useExam } from 'src/core/exam/presentations';
// ----------------------------------------------------------------------

type NavListRootProps = {
  name: string;
  id: string;
  skill: string;
  examId: string;
};

export type RefDataMethods = {
  refetchData: () => void;
};

function ExamNavSectionListInner(
  { id, name, skill, examId }: NavListRootProps,
  forwardRef: ForwardedRef<RefDataMethods>
) {
  const { pathname } = useLocation();
  const { code = '', questionId = '' } = useParams();

  const { active } = useActiveLink(linkTo(code, skill, examId, id));

  const [open, setOpen] = useState(active);

  const [shouldFetch, setShouldFetch] = useState(false);

  const navigate = useNavigate();

  const { getExamQuestions } = useExam();
  const { data, mutate } = useAxiosSWR(shouldFetch ? `/nav-exam-question/${id}` : null, () =>
    getExamQuestions(id)
  );

  useImperativeHandle(
    forwardRef,
    (): RefDataMethods => ({
      refetchData: () => {
        mutate();
      },
    })
  );

  useEffect(() => {
    if (!active) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleToggle = () => {
    if (!open) {
      navigate(linkTo(code, skill, examId, id));
    }
    setOpen(!open);
  };

  const handleAddQuestion = () => {
    navigate(linkToNewQuestion(code, skill, examId, id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!!open && !!id) {
      setShouldFetch(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, id]);

  useEffect(() => {
    if (!!shouldFetch) {
      mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetch]);

  return (
    <>
      <ExamNavSectionItem title={name} open={open} active={active} onClick={handleToggle} />

      <Collapse in={open} unmountOnExit>
        {data?.questions?.map((list, index: number) => (
          <ExamNavQuestionItem key={list.id} data={list!} />
        ))}
        {questionId === 'new-question' && (
          <ExamNavQuestionItem data={{ id: 'new-question', title: 'New Question' }} />
        )}
        <Button
          size="small"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAddQuestion}
          sx={{ ml: 2, flexShrink: 0, width: 'fit-content' }}
        >
          Add New
        </Button>
      </Collapse>
    </>
  );
}

const ExamNavSectionList = forwardRef(ExamNavSectionListInner);

export default ExamNavSectionList;
// ----------------------------------------------------------------------

const linkTo = (code: string, skill: string, examId: string, section: string) => {
  const baseUrl = PATH_DASHBOARD.exam.add;
  return `${baseUrl}/${code}/${skill}--${examId}/${section}`;
};

const linkToNewQuestion = (code: string, skill: string, examId: string, section: string) => {
  const baseUrl = PATH_DASHBOARD.exam.add;
  return `${baseUrl}/${code}/${skill}--${examId}/${section}/new-question`;
};
