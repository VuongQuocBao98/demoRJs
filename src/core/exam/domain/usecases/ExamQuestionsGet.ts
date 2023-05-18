import { IExamSection } from '../ExamEntity';
import { IExamAPI } from '../ports/IExamAPI';

type ExamAPIType = Pick<IExamAPI, 'getExamQuestions'>;

type IResponse = {
  data: IExamSection;
};

const getExamQuestionsUsecase = (examAPI: ExamAPIType) => async (id: string) => {
  try {
    const { data }: IResponse = await examAPI.getExamQuestions(id);

    return data;
  } catch (error) {
    throw error;
  }
};

export { getExamQuestionsUsecase };
