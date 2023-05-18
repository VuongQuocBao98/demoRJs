import { ICandidateAPI } from '../ports/ICandidateAPI';
import { ICandidate } from '../CandidateEntity';
import { isEmpty } from 'lodash';

type CandidateAPIType = Pick<ICandidateAPI, 'getAllCandidateTable'>;

type CandidateResponse = {
  items?: ICandidate[] | undefined;
  totalItem?: number | undefined;
  totalPage?: number | undefined;
};

type IResponse = {
  data: CandidateResponse;
};

const defaultParams = {
  PageIndex: 1,
  PageSize: 20,
  OrderBy: 0,
};

const getListCandidateTableUsecase = (candidateAPI: CandidateAPIType) => async (params: any) => {
  try {
    const { data }: IResponse = await candidateAPI.getAllCandidateTable(
      isEmpty(params) ? defaultParams : params
    );
    const { items, totalItem, totalPage } = data;

    if (items && items.length) {
      const dataConvert = items.map((value: any, idx: number) => ({
        ...value,
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
      totalItem,
    };
  } catch (error) {
    throw error;
  }
};

export { getListCandidateTableUsecase };
