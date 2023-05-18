import { ICandidatePaperAPI } from '../ports/ICandidatePaperAPI';
import { ICandidatePaper } from '../CandidatePaperEntity';
import { isEmpty } from 'lodash';

type CandidatePaperAPIType = Pick<ICandidatePaperAPI, 'getAllCandidatePaperTable'>;

type CandidatePaperResponse = {
  items?: ICandidatePaper[] | undefined;
  totalItem?: number | undefined;
  totalPage?: number | undefined;
};

type IResponse = {
  data: CandidatePaperResponse;
};

const defaultParams = {
  PageIndex: 1,
  PageSize: 20,
  OrderBy: 0,
};

const getListCandidatePaperTableUsecase =
  (candidatePaperAPI: CandidatePaperAPIType) => async (params: any) => {
    try {
      const { data }: IResponse = await candidatePaperAPI.getAllCandidatePaperTable(
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

export { getListCandidatePaperTableUsecase };
