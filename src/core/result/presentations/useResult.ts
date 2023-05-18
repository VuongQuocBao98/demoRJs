import { resultAPI } from '../data/ResultAPI';
import {
  createResultUsecase,
  deleteResultUsecase,
  editResultUsecase,
  getResultUsecase,
  getListResultUsecase,
  getListResultTableUsecase,
} from '../domain';

export function useResult() {
  const getListResult = getListResultUsecase({
    getAllResult: resultAPI.getAllResult,
  });
  const getResult = getResultUsecase({
    getResultById: resultAPI.getResultById,
  });
  const createResult = createResultUsecase({
    createResult: resultAPI.createResult,
  });
  const editResult = editResultUsecase({
    editResult: resultAPI.editResult,
  });
  const deleteResult = deleteResultUsecase({
    deleteResult: resultAPI.deleteResult,
  });

  const getListResultTable = getListResultTableUsecase({
    getAllResultTable: resultAPI.getAllResultTable,
  });

  return {
    getListResult,
    getResult,
    createResult,
    editResult,
    deleteResult,

    getListResultTable,
  };
}
