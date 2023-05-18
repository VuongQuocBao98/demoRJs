import { IExamAPI } from '../ports/IExamAPI';

type ExamAPIType = Pick<IExamAPI, 'getExamById'>;

const getExamUsecase = (examAPI: ExamAPIType) => async (id: string) => {
  try {
    const { data } = await examAPI.getExamById(id);
    return data;
  } catch (error) {
    throw error;
  }
};

export { getExamUsecase };
