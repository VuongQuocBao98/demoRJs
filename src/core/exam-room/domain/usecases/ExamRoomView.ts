import { IExamRoomAPI } from '../ports/IExamRoomAPI';

type ExamRoomAPIType = Pick<IExamRoomAPI, 'getExamRoomById'>;

const getExamRoomUsecase =
  (examRoomAPI: ExamRoomAPIType) => async (id: string) => {
    try {
      const data = await examRoomAPI.getExamRoomById(id);
      return data;
    } catch (error) {
      throw error;
    }
  };

export { getExamRoomUsecase };
