import { IExamRoomAPI } from '../ports/IExamRoomAPI';

type ExamRoomAPIType = Pick<IExamRoomAPI, 'deleteExamRoom'>;

const deleteExamRoomUsecase =
  (examRoomAPI: ExamRoomAPIType) => async (id: string | number) => {
    try {
      await examRoomAPI.deleteExamRoom(id);
    } catch (error) {
      throw error;
    }
  };

export { deleteExamRoomUsecase };
