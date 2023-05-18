import { ICandidatePaper } from '../CandidatePaperEntity';
import { ICandidatePaperAPI } from '../ports/ICandidatePaperAPI';

type CandidatePaperAPIType = Pick<ICandidatePaperAPI, 'createCandidatePaper'>;

const createCandidatePaperUsecase =
  (candidatePaperAPI: CandidatePaperAPIType) => async (CandidatePaper: ICandidatePaper) => {
    try {
      const { data } = (await candidatePaperAPI.createCandidatePaper(CandidatePaper))!;
      return data;
    } catch (error) {
      throw error;
    }
  };

export { createCandidatePaperUsecase };
