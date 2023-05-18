import { ICandidatePaperAPI } from '../ports/ICandidatePaperAPI';

type CandidatePaperAPIType = Pick<ICandidatePaperAPI, 'deleteCandidatePaper'>;

const deleteCandidatePaperUsecase =
  (candidatePaperAPI: CandidatePaperAPIType) => async (id: string | number) => {
    try {
      await candidatePaperAPI.deleteCandidatePaper(id);
    } catch (error) {
      throw error;
    }
  };

export { deleteCandidatePaperUsecase };
