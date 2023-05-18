import { IResultAPI } from '../ports/IResultAPI';
import { IResult } from '../ResultEntity';
import { isEmpty } from 'lodash';

type ResultAPIType = Pick<IResultAPI, 'getAllResultTable'>;

type ResultResponse = {
  items?: IResult[] | undefined;
  totalItem?: number | undefined;
  totalPage?: number | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
};

type IResponse = {
  data: ResultResponse;
};

const defaultParams = {
  PageIndex: 1,
  PageSize: 20,
  OrderBy: 0,
};

const getListResultTableUsecase = (resultAPI: ResultAPIType) => async (params: any) => {
  try {
    const { data }: IResponse = await resultAPI.getAllResultTable(
      isEmpty(params) ? defaultParams : params
    );
    const { items, totalPage, pageIndex, pageSize, totalItem } = data;
    const startIdx = (pageIndex! - 1) * pageSize! + 1;
    if (items && items.length) {
      const dataConvert = items.map((value: any, idx: number) => ({
        ...value,
        stt: startIdx + idx,
        totalItems: value.amountProfile,
        dateCreated: value.created,
        dateModified: value.updated || value.created,
      }));
      return {
        data: dataConvert,
        total: totalPage,
        totalItem,
      };
    }
    return {
      data: [],
      total: 0,
      totalItem: 0,
    };
  } catch (error) {
    throw error;
  }
};

export { getListResultTableUsecase };
