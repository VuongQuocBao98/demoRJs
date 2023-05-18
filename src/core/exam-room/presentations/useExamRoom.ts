import { examRoomAPI } from '../data/ExamRoomAPI';
import {
  createExamRoomUsecase,
  deleteExamRoomUsecase,
  editExamRoomUsecase,
  getExamRoomUsecase,
  getListExamRoomUsecase,
} from '../domain';

export function useExamRoom() {
  const getListExamRoom = getListExamRoomUsecase({
    getAllExamRoom: examRoomAPI.getAllExamRoom,
  });
  const getExamRoom = getExamRoomUsecase({
    getExamRoomById: examRoomAPI.getExamRoomById,
  });
  const createExamRoom = createExamRoomUsecase({
    createExamRoom: examRoomAPI.createExamRoom,
  });
  const editExamRoom = editExamRoomUsecase({
    editExamRoom: examRoomAPI.editExamRoom,
  });
  const deleteExamRoom = deleteExamRoomUsecase({
    deleteExamRoom: examRoomAPI.deleteExamRoom,
  });

  return {
    getListExamRoom,
    getExamRoom,
    createExamRoom,
    editExamRoom,
    deleteExamRoom,
  };
}
