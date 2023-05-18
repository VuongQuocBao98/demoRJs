import { IExamAPI } from '../ports/IExamAPI';

type ExamAPIType = Pick<IExamAPI, 'deleteExam'>;

const deleteExamUsecase = (examAPI: ExamAPIType) => async (id: number) => {
  try {
    await examAPI.deleteExam(id);
  } catch (error) {
    throw error;
  }
};

export { deleteExamUsecase };
