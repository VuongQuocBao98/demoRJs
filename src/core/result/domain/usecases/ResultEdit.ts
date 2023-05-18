import { IResult } from '../ResultEntity';
import { IResultAPI } from '../ports/IResultAPI';

type ResultAPIType = Pick<IResultAPI, 'editResult'>;

const editResultUsecase = (resultAPI: ResultAPIType) => async (result: IResult) => {
  try {
    const { data } = (await resultAPI.editResult(result))!;
    return data;
  } catch (error) {
    throw error;
  }
};

export { editResultUsecase };

