import { ExamRoomService } from 'src/services';
import { IExamRoomAPI } from '../domain/ports/IExamRoomAPI';

class ExamRoomAPI implements IExamRoomAPI {
  async getAllExamRoom(params: any) {
    return ExamRoomService.getAllExamRoom(params);
  }

  async getExamRoomById(id: string) {
    return ExamRoomService.getExamRoomById(id);
  }

  async createExamRoom(data: any) {
    return ExamRoomService.createExamRoom(data);
  }

  async editExamRoom(data: any) {
    return ExamRoomService.editExamRoom(data);
  }

  async deleteExamRoom(id: string | number) {
    return ExamRoomService.deleteExamRoom(id);
  }
}

const examRoomAPI = new ExamRoomAPI();

export { examRoomAPI };
