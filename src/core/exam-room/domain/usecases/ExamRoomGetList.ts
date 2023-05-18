import { IExamRoomAPI } from '../ports/IExamRoomAPI';
import { IExamRoom } from '../ExamRoomEntity';
import { isEmpty } from 'lodash';

type ExamRoomAPIType = Pick<IExamRoomAPI, 'getAllExamRoom'>;

type ExamRoomResponse = {
  items?: IExamRoom[] | undefined;
  totalItem?: number | undefined;
  totalPage?: number | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
};

type IResponse = {
  data: ExamRoomResponse;
};

const defaultParams = {
  PageIndex: 1,
  PageSize: 20,
  OrderBy: 0,
};

const getListExamRoomUsecase = (examRoomAPI: ExamRoomAPIType) => async (params: any) => {
  try {
    const { data }: IResponse = await examRoomAPI.getAllExamRoom(
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
        totalItem
      };
    }
    return {
      data: [],
      total: 0,
      totalItem
    };
  } catch (error) {
    throw error;
  }
};

export { getListExamRoomUsecase };
