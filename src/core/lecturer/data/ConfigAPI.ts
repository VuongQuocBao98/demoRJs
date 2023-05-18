import { IConfigAPI } from '../domain/ports/IConfigAPI';

import { LecturerService } from 'src/services';

class ConfigAPI implements IConfigAPI {
  async getAllLecturer(params: any) {
    return LecturerService.getAllLecturer(params);
  }

  async getLecturerById(id: string) {
    return LecturerService.getLecturerById(id);
  }

  async createLecturer(data: any) {
    return LecturerService.createLecturer(data);
  }

  async editLecturer(data: any) {
    return LecturerService.editLecturer(data);
  }

  async deleteLecturer(id: number) {
    return LecturerService.deleteLecturer(id);
  }
}

const configAPI = new ConfigAPI();

export { configAPI };

