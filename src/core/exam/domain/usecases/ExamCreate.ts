import { IExam } from '../ExamEntity';
import { IExamAPI } from '../ports/IExamAPI';

type ExamAPIType = Pick<IExamAPI, 'createExam'>;

const createExamUsecase = (examAPI: ExamAPIType) => async (exam: IExam) => {
  try {
    const { data } = (await examAPI.createExam(exam))!;
    return data;
  } catch (error) {
    throw error;
  }
};

export { createExamUsecase };
