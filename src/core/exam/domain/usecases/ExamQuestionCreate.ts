import { IExamQuestionAdd } from '../ExamEntity';
import { IExamAPI } from '../ports/IExamAPI';

type ExamAPIType = Pick<IExamAPI, 'createExamQuestion'>;

const createExamQuestionUsecase = (examAPI: ExamAPIType) => async (question: IExamQuestionAdd) => {
  try {
    const { data } = (await examAPI.createExamQuestion(question))!;
    return data;
  } catch (error) {
    throw error;
  }
};

export { createExamQuestionUsecase };

