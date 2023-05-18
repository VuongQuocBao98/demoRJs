import { ICandidateAPI } from '../domain/ports/ICandidateAPI';

import { CandidateService } from 'src/services';

class CandidateAPI implements ICandidateAPI {
  async getAllCandidate(params: any) {
    return CandidateService.getAllCandidate(params);
  }

  async getCandidateById(id: string) {
    return CandidateService.getCandidateById(id);
  }

  async createCandidate(data: any) {
    return CandidateService.createCandidate(data);
  }

  async editCandidate(data: any) {
    return CandidateService.editCandidate(data);
  }

  async deleteCandidate(id: string | number) {
    return CandidateService.deleteCandidate(id);
  }
  // ----------------------------------------------------------------------
  async getAllCandidateTable(params: any) {
    return CandidateService.getAllCandidateTable(params);
  }
}

const candidateAPI = new CandidateAPI();

export { candidateAPI };
