
import { ResultService } from 'src/services';
import { IResultAPI } from '../domain/ports/IResultAPI';

class ResultAPI implements IResultAPI {
  async getAllResult(params: any) {
    return ResultService.getAllResult(params);
  }

  async getResultById(id: string) {
    return ResultService.getResultById(id);
  }

  async createResult(data: any) {
    return ResultService.createResult(data);
  }

  async editResult(data: any) {
    return ResultService.editResult(data);
  }

  async deleteResult(id: string | number) {
    return ResultService.deleteResult(id);
  }
  // ----------------------------------------------------------------------
  async getAllResultTable(params: any) {
    return ResultService.getAllResultTable(params);
  }
}

const resultAPI = new ResultAPI();

export { resultAPI };
