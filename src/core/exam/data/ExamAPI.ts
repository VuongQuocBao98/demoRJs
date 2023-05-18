import { IExamAPI } from '../domain/ports/IExamAPI';

import { ExamService } from 'src/services';

class ExamAPI implements IExamAPI {
  async getAllExam(params: any) {
    return ExamService.getAllExam(params);
  }

  async getExamById(id: string) {
    return ExamService.getExamById(id);
  }

  async createExam(data: any) {
    return ExamService.createExam(data);
  }

  async editExam(data: any) {
    return ExamService.editExamSkill(data);
  }

  async deleteExam(id: number) {
    return ExamService.deleteExam(id);
  }

  // ----------------------------------------------------------------------

  async createExamSection(data: any) {
    return ExamService.createExamSection(data);
  }
  async editExamSection(data: any) {
    return ExamService.editExamSection(data);
  }

  // ----------------------------------------------------------------------
  async getExamQuestions(id: string) {
    return ExamService.getExamQuestions(id);
  }
  async createExamQuestion(data: any) {
    return ExamService.createExamQuestion(data);
  }
}

const examAPI = new ExamAPI();

export { examAPI };
