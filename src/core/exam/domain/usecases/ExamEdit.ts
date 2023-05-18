import { IExamEdit } from '../ExamEntity';
import { IExamAPI } from '../ports/IExamAPI';

type ExamAPIType = Pick<IExamAPI, 'editExam'>;

const editExamUsecase = (examAPI: ExamAPIType) => async (exam: IExamEdit) => {
  try {
    const { data } = (await examAPI.editExam(exam))!;
    return data;
  } catch (error) {
    throw error;
  }
};

export { editExamUsecase };

