import { candidatePaperAPI } from '../data/CandidatePaperAPI';
import {
  createCandidatePaperUsecase,
  deleteCandidatePaperUsecase,
  editCandidatePaperUsecase,
  getCandidatePaperUsecase,
  getListCandidatePaperUsecase,
  getListCandidatePaperTableUsecase,
} from '../domain';

export function useCandidatePaper() {
  const getListCandidatePaper = getListCandidatePaperUsecase({
    getAllCandidatePaper: candidatePaperAPI.getAllCandidatePaper,
  });
  const getCandidatePaper = getCandidatePaperUsecase({
    getCandidatePaperById: candidatePaperAPI.getCandidatePaperById,
  });
  const createCandidatePaper = createCandidatePaperUsecase({
    createCandidatePaper: candidatePaperAPI.createCandidatePaper,
  });
  const editCandidatePaper = editCandidatePaperUsecase({
    editCandidatePaper: candidatePaperAPI.editCandidatePaper,
  });
  const deleteCandidatePaper = deleteCandidatePaperUsecase({
    deleteCandidatePaper: candidatePaperAPI.deleteCandidatePaper,
  });

  const getListCandidatePaperTable = getListCandidatePaperTableUsecase({
    getAllCandidatePaperTable: candidatePaperAPI.getAllCandidatePaperTable,
  });

  return {
    getListCandidatePaper,
    getCandidatePaper,
    createCandidatePaper,
    editCandidatePaper,
    deleteCandidatePaper,

    getListCandidatePaperTable,
  };
}
