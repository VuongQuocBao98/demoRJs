import { IResultAPI } from '../ports/IResultAPI';

type ResultAPIType = Pick<IResultAPI, 'deleteResult'>;

const deleteResultUsecase =
  (resultAPI: ResultAPIType) => async (id: string | number) => {
    try {
      await resultAPI.deleteResult(id);
    } catch (error) {
      throw error;
    }
  };

export { deleteResultUsecase };
