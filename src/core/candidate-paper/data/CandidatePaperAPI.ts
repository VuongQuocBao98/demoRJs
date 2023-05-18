import { ICandidatePaperAPI } from '../domain/ports/ICandidatePaperAPI';

import { CandidatePaperService } from 'src/services';

class CandidatePaperAPI implements ICandidatePaperAPI {
  async getAllCandidatePaper(params: any) {
    return CandidatePaperService.getAllCandidatePaper(params);
  }

  async getCandidatePaperById(id: string) {
    return CandidatePaperService.getCandidatePaperById(id);
  }

  async createCandidatePaper(data: any) {
    return CandidatePaperService.createCandidatePaper(data);
  }

  async editCandidatePaper(data: any) {
    return CandidatePaperService.editCandidatePaper(data);
  }

  async deleteCandidatePaper(id: string | number) {
    return CandidatePaperService.deleteCandidatePaper(id);
  }
  // ----------------------------------------------------------------------
  async getAllCandidatePaperTable(params: any) {
    return CandidatePaperService.getAllCandidatePaperTable(params);
  }
}

const candidatePaperAPI = new CandidatePaperAPI();

export { candidatePaperAPI };
