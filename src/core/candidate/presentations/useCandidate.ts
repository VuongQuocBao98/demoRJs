import { candidateAPI } from '../data/CandidateAPI';
import {
  deleteCandidateUsecase,
  getListCandidateUsecase,
  getListCandidateTableUsecase,
} from '../domain';

export function useCandidate() {
  const getListCandidate = getListCandidateUsecase({
    getAllCandidate: candidateAPI.getAllCandidate,
  });
 
  const deleteCandidate = deleteCandidateUsecase({
    deleteCandidate: candidateAPI.deleteCandidate,
  });

  const getListCandidateTable = getListCandidateTableUsecase({
    getAllCandidateTable: candidateAPI.getAllCandidateTable,
  });

  return {
    getListCandidate,
 
    deleteCandidate,

    getListCandidateTable,
  };
}
