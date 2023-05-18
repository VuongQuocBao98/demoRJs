import { IExamRoom } from '../ExamRoomEntity';
import { IExamRoomAPI } from '../ports/IExamRoomAPI';

type ExamRoomAPIType = Pick<IExamRoomAPI, 'editExamRoom'>;

const editExamRoomUsecase = (examRoomAPI: ExamRoomAPIType) => async (ExamRoom: IExamRoom) => {
  try {
    const { data } = (await examRoomAPI.editExamRoom(ExamRoom))!;
    return data;
  } catch (error) {
    throw error;
  }
};

export { editExamRoomUsecase };

