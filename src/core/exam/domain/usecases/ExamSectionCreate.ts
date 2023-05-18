import { IExam } from '../ExamEntity';
import { IExamAPI } from '../ports/IExamAPI';

type ExamAPIType = Pick<IExamAPI, 'createExamSection'>;

const createExamSectionUsecase = (examAPI: ExamAPIType) => async (section: any) => {
  try {
    const { data } = (await examAPI.createExamSection(section))!;
    return data;
  } catch (error) {
    throw error;
  }
};

export { createExamSectionUsecase };
