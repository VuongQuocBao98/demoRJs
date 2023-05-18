import { IExamAPI } from '../ports/IExamAPI';
import { IExam } from '../ExamEntity';
import { isEmpty } from 'lodash';

type ExamAPIType = Pick<IExamAPI, 'getAllExam'>;

type ExamResponse = {
  items?: IExam[] | undefined;
  totalItem?: number | undefined;
  pageSize?: number | undefined;
  pageIndex?: number | undefined;
  totalPage?: number | undefined;
};

type IResponse = {
  data: ExamResponse;
};

const defaultParams = {
  PageIndex: 1,
  PageSize: 20,
  OrderBy: 0,
};

const getListExamUsecase = (examAPI: ExamAPIType) => async (params: any) => {
  try {
    const { data }: IResponse = await examAPI.getAllExam(isEmpty(params) ? defaultParams : params);
    const { items, totalItem, pageSize, pageIndex, totalPage } = data;

    if (items && items.length) {
      const startIdx = (pageIndex! - 1) * pageSize! + 1;
      const dataConvert = items.map((value: IExam, idx: number) => ({
        ...value,
        stt: startIdx + idx,
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

export { getListExamUsecase };
