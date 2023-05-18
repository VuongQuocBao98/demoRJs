import { IResult } from '../ResultEntity';
import { IResultAPI } from '../ports/IResultAPI';

type ResultAPIType = Pick<IResultAPI, 'createResult'>;

const createResultUsecase =
  (resultAPI: ResultAPIType) => async (result: IResult) => {
    try {
      const { data } = (await resultAPI.createResult(result))!;
      return data;
    } catch (error) {
      throw error;
    }
  };

export { createResultUsecase };
