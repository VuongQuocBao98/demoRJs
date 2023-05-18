import { createContext, useContext, useRef } from 'react';

type TableFilterFormActionType = {
  refs: any;
  refetchQuestion: (id: string) => void;
};

const ExamCtx = createContext<TableFilterFormActionType>({
  refs: [],
  refetchQuestion: () => {},
});

function ExamProvider(props: any) {
  const refs: any = useRef([]);
  const handleRefetchQuestion = (id: string) => {
    if (refs?.current?.[id]?.current) {
      refs?.current?.[id]?.current?.refetchData();
    }
  };
  return (
    <ExamCtx.Provider value={{ refs, refetchQuestion: handleRefetchQuestion }}>
      {props.children}
    </ExamCtx.Provider>
  );
}

// hooks

function useExamAction() {
  const examAction = useContext(ExamCtx);

  if (typeof examAction === 'undefined') {
    throw new Error('ExamAction must be used within a ExamProvider');
  }

  return examAction;
}

export { useExamAction, ExamProvider };

