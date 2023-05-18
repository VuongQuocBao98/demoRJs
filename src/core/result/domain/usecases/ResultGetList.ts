import { IResultAPI } from '../ports/IResultAPI';
import { IResult } from '../ResultEntity';
import { isEmpty } from 'lodash';

type ResultAPIType = Pick<IResultAPI, 'getAllResult'>;

type ResultResponse = {
  items?: IResult[] | undefined;
  totalItem?: number | undefined;
};

type IResponse = {
  data: ResultResponse;
};

const defaultParams = {
  PageIndex: 1,
  PageSize: 20,
  OrderBy: 0,
};

const getListResultUsecase =
  (resultAPI: ResultAPIType) => async (params: any) => {
    try {
      const { data }: IResponse = await resultAPI.getAllResult(
        isEmpty(params) ? defaultParams : params
      );
      const { items, totalItem } = data;

      if (items && items.length) {
        const dataConvert = items.map((value: any, idx: number) => ({
          ...value,
          totalItems: value.amountProfile,
          dateCreated: value.created,
          dateModified: value.updated || value.created,
        }));
        return {
          data: dataConvert,
          total: totalItem,
        };
      }
      return {
        data: [],
        total: 0,
      };
    } catch (error) {
      throw error;
    }
  };

export { getListResultUsecase };
