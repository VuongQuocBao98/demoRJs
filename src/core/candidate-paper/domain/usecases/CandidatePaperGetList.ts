import { ICandidatePaperAPI } from '../ports/ICandidatePaperAPI';
import { ICandidatePaper } from '../CandidatePaperEntity';
import { isEmpty } from 'lodash';

type CandidatePaperAPIType = Pick<ICandidatePaperAPI, 'getAllCandidatePaper'>;

type CandidatePaperResponse = {
  items?: ICandidatePaper[] | undefined;
  totalItem?: number | undefined;
};

type IResponse = {
  data: CandidatePaperResponse;
};

const defaultParams = {
  PageIndex: 1,
  PageSize: 20,
  OrderBy: 0,
};

const getListCandidatePaperUsecase =
  (candidatePaperAPI: CandidatePaperAPIType) => async (params: any) => {
    try {
      const { data }: IResponse = await candidatePaperAPI.getAllCandidatePaper(
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

export { getListCandidatePaperUsecase };
