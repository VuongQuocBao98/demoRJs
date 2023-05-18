//Mui
import { Box } from '@mui/material';
import { createRef, useRef } from 'react';
// components
import { IExamInfo } from 'src/core/exam/domain';
import { EXAMTYPE_ARRAY } from '../constant';
import { useExamAction } from '../contexts/ExamCtx';
import ExamNavSectionList from './ExamNavSectionList';

// ----------------------------------------------------------------------

type Props = {
  config: IExamInfo;
};

export default function ExamNavItem({ config }: Props) {
  const { refs } = useExamAction();

  return (
    <>
      <Box sx={{ textTransform: 'uppercase', p: 2, fontSize: 14 }}>
        {EXAMTYPE_ARRAY[config.type]}
      </Box>
      {config.sections.map((list, index) => {
        refs.current[list.id as string] = createRef();
        return (
          <ExamNavSectionList
            key={list.id}
            examId={config.id!}
            ref={refs.current[list.id as string]}
            name={list.name}
            id={list.id!}
            skill={EXAMTYPE_ARRAY[config.type]}
          />
        );
      })}
    </>
  );
}
