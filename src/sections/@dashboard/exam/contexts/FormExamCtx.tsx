/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { pick } from 'lodash';
import { useSnackbar } from 'notistack';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ConfirmDialog from 'src/components/confirm-dialog';
import FormProvider from 'src/components/hook-form';
import { IExamQuestionAdd } from 'src/core/exam/domain';
import { useExam } from 'src/core/exam/presentations';
import { useAxiosSWR } from 'src/hooks/useAxiosSWR';
import { ExamService } from 'src/services';
import FileService from 'src/services/File';
import * as Yup from 'yup';
import { EXAMTYPE_ARRAY } from '../constant';
import { listeningAndReading, objectUsingWhenPerField } from '../content/validation-object';
import { NEW_QUESTION } from '../header/ExamHeader';
import { useExamAction } from './ExamCtx';

const FormExamCtx = createContext<any>(null);

type FormExamProviderProps = {
  children: React.ReactNode;
};

function FormExamProvider({ children }: FormExamProviderProps) {
  const { section = '', skill: skillParam = '', questionId = '' } = useParams();
  const examId = skillParam.split('--')[1];
  const [openConfirm, setopenConfirm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const NewDataSchema = Yup.object(objectUsingWhenPerField);

  const { createExamQuestion, editExamSection, editExam, getExamQuestions } = useExam();

  const { refetchQuestion } = useExamAction();

  const { data: skillData }: any = useAxiosSWR(
    examId ? `/exam-skill/${examId}` : null,
    () => ExamService.getExamSkillById(examId) as any
  );

  const { data: sectionData }: any = useAxiosSWR(
    section ? `/nav-exam-question/${section}` : null,
    () => getExamQuestions(section)
  );

  const { data: sectionQuestion }: any = useAxiosSWR(
    questionId && questionId !== NEW_QUESTION ? `/nav-exam-question-id/${questionId}` : null,
    () => ExamService.getExamQuestionById(questionId)
  );

  const defaultValues = useMemo(
    () => ({
      skill: skillParam?.split('--')[0],
      title: sectionQuestion?.data?.title || '',
      overview: sectionData?.overView || '',
      content: sectionQuestion?.data?.content || '',
      record: skillData?.data?.listeningFile || null,
      answers: sectionQuestion?.data?.answersOfQuest || [{ index: '', value: '', point: 2.5 }],
      configAnswerCheckBoxs: sectionQuestion?.data?.checkBoxConfig?.configAnswerCheckBoxs || [
        {
          checkBoxs: [
            { value: 'A', label: '' },
            { value: 'B', label: '' },
            { value: 'C', label: '' },
            { value: 'D', label: '' },
          ],
          index: '',
        },
      ],
    }),
    [skillParam, questionId, sectionQuestion]
  );

  const methods = useForm<IExamQuestionAdd>({
    resolver: yupResolver(NewDataSchema),
    defaultValues,
    values: defaultValues,
    resetOptions: {
      keepDirtyValues: false,
      keepErrors: false,
    },
  });

  const {
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitSuccessful, dirtyFields },
    setError,
  } = methods;

  useEffect(() => {
    if (EXAMTYPE_ARRAY.includes(skillParam?.split('--')[0])) {
      setValue('skill', skillParam?.split('--')[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillParam]);

  useEffect(() => {
    if (!!skillData?.data?.listeningFile) {
      setValue('record', skillData?.data?.listeningFile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillData?.data?.listeningFile]);

  useEffect(() => {
    if (!!sectionData?.overView) {
      setValue('overview', sectionData?.overView);
      return;
    }
    setValue('overview', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionData?.overView]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(
        {
          ...defaultValues,
          record: getValues('record') || skillData?.data?.listeningFile || null,
          skill: skillParam?.split('--')[0],
        },
        {
          keepErrors: false,
          keepDirty: false,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful, defaultValues]);

  const onSubmit = async (data: IExamQuestionAdd) => {
    const dataPush = {
      title: data.title,
      concordanceID: section,
      type: listeningAndReading(skillParam?.split('--')[0]) ? 2 : 1,
      answers: data.answers,
      content: data.content,
      checkBoxConfig: {
        configAnswerCheckBoxs: data.configAnswerCheckBoxs,
      },
    };

    let dataPicker = {};
    switch (data.skill) {
      case 'listening':
      case 'reading':
        dataPicker = dataPush;
        break;
      default:
        dataPicker = pick(dataPush, ['concordanceID', 'title', 'content', 'type']);
        dataPicker = { ...dataPicker, answers: [{ index: '1', value: '1', point: 2.5 }] };
        break;
    }
    try {
      if (data.skill === 'reading') {
        if (dirtyFields?.overview) {
          await Promise.all([
            createExamQuestion(dataPicker),
            editExamSection({ id: section, overview: data.overview }),
          ]);
        } else {
          await createExamQuestion(dataPicker);
        }
      } else if (data.skill === 'listening') {
        if (!!data.record && typeof data.record === 'string') {
          await createExamQuestion(dataPicker);
        } else {
          const formData = new FormData();
          formData.append('file', data.record!);
          const { data: dataFile } = await FileService.uploadSingleFile(formData);
          setValue('record', dataFile.fileUrl);
          await Promise.all([
            createExamQuestion(dataPicker),
            editExam({ id: skillParam?.split('--')[1], listeningFile: dataFile.fileUrl }),
          ]);
        }
      } else {
        await createExamQuestion(dataPicker);
      }

      refetchQuestion(section);
      // const examUpdatedInfo = getDirtyValues<FormValuesProps>(dirtyFields, examForm);
      enqueueSnackbar('Create success!');
    } catch (error) {
      setError('root', { message: error.resultMessage });
      enqueueSnackbar(error.resultMessage, {
        variant: 'error',
      });
      console.error(error.resultMessage);
    }
  };

  const onCancel = () => {
    setopenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setopenConfirm(false);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FormExamCtx.Provider value={{ methods, onCancel }}>{children}</FormExamCtx.Provider>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Reset"
        content="Are you sure want to reset?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              reset();
              handleCloseConfirm();
            }}
          >
            Reset
          </Button>
        }
      />
    </FormProvider>
  );
}

function useFormExam() {
  const context = useContext(FormExamCtx);

  if (typeof context === 'undefined') {
    throw new Error('useFormExam must be used with in a FormExamProvider');
  }

  return context;
}

export { useFormExam, FormExamProvider };
