import { IResultAPI } from '../ports/IResultAPI';

type ResultAPIType = Pick<IResultAPI, 'getResultById'>;

const getResultUsecase =
  (resultAPI: ResultAPIType) => async (id: string) => {
    try {
      const data = await resultAPI.getResultById(id);
      return data;
    } catch (error) {
      throw error;
    }
  };

export { getResultUsecase };
