import { ICandidatePaperAPI } from '../ports/ICandidatePaperAPI';

type CandidatePaperAPIType = Pick<ICandidatePaperAPI, 'getCandidatePaperById'>;

const getCandidatePaperUsecase =
  (candidatePaperAPI: CandidatePaperAPIType) => async (id: string) => {
    try {
      const data = await candidatePaperAPI.getCandidatePaperById(id);
      return data;
    } catch (error) {
      throw error;
    }
  };

export { getCandidatePaperUsecase };
