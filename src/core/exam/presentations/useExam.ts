import { examAPI } from '../data/ExamAPI';
import {
  createExamSectionUsecase,
  createExamUsecase,
  deleteExamUsecase,
  editExamUsecase,
  getExamQuestionsUsecase,
  getExamUsecase,
  getListExamUsecase,
  createExamQuestionUsecase,
  editExamSectionUsecase,
} from '../domain';

export function useExam() {
  const getListExam = getListExamUsecase({
    getAllExam: examAPI.getAllExam,
  });
  const getExam = getExamUsecase({
    getExamById: examAPI.getExamById,
  });
  const createExam = createExamUsecase({
    createExam: examAPI.createExam,
  });
  const editExam = editExamUsecase({ editExam: examAPI.editExam });
  const deleteExam = deleteExamUsecase({
    deleteExam: examAPI.deleteExam,
  });

  // ----------------------------------------------------------------------

  const createExamSection = createExamSectionUsecase({
    createExamSection: examAPI.createExamSection,
  });
  const editExamSection = editExamSectionUsecase({ editExamSection: examAPI.editExamSection });
  // ----------------------------------------------------------------------
  const getExamQuestions = getExamQuestionsUsecase({
    getExamQuestions: examAPI.getExamQuestions,
  });
  const createExamQuestion = createExamQuestionUsecase({
    createExamQuestion: examAPI.createExamQuestion,
  });

  return {
    getListExam,
    getExam,
    createExam,
    editExam,
    deleteExam,

    createExamSection,
    editExamSection,

    getExamQuestions,
    createExamQuestion,
  };
}
