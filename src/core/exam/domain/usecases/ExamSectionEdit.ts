import { IExamSectionEdit } from '../ExamEntity';
import { IExamAPI } from '../ports/IExamAPI';

type ExamAPIType = Pick<IExamAPI, 'editExamSection'>;

const editExamSectionUsecase = (examAPI: ExamAPIType) => async (exam: IExamSectionEdit) => {
  try {
    const { data } = (await examAPI.editExamSection(exam))!;
    return data;
  } catch (error) {
    throw error;
  }
};

export { editExamSectionUsecase };
