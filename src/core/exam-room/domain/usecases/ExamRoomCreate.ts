import { IExamRoom } from '../ExamRoomEntity';
import { IExamRoomAPI } from '../ports/IExamRoomAPI';

type ExamRoomAPIType = Pick<IExamRoomAPI, 'createExamRoom'>;

const createExamRoomUsecase =
  (examRoomAPI: ExamRoomAPIType) => async (examRoom: IExamRoom) => {
    try {
      const { data } = (await examRoomAPI.createExamRoom(examRoom))!;
      return data;
    } catch (error) {
      throw error;
    }
  };

export { createExamRoomUsecase };
