import { ICandidateAPI } from '../ports/ICandidateAPI';

type CandidateAPIType = Pick<ICandidateAPI, 'deleteCandidate'>;

const deleteCandidateUsecase =
  (candidateAPI: CandidateAPIType) => async (id: string | number) => {
    try {
      await candidateAPI.deleteCandidate(id);
    } catch (error) {
      throw error;
    }
  };

export { deleteCandidateUsecase };
