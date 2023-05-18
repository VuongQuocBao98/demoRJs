import { ICandidatePaper } from '../CandidatePaperEntity';
import { ICandidatePaperAPI } from '../ports/ICandidatePaperAPI';

type CandidatePaperAPIType = Pick<ICandidatePaperAPI, 'editCandidatePaper'>;

const editCandidatePaperUsecase = (candidatePaperAPI: CandidatePaperAPIType) => async (CandidatePaper: ICandidatePaper) => {
  try {
    const { data } = (await candidatePaperAPI.editCandidatePaper(CandidatePaper))!;
    return data;
  } catch (error) {
    throw error;
  }
};

export { editCandidatePaperUsecase };

