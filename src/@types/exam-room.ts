export type IExamRoom = {
  id: string;
  stt?: number;
  fullName: string;
  phoneNumber: string;
  testDay: string;
  address: string;
  email: string;
  startTime: string;
  endTime: string;
  linkZoom: string;
};

export type IExamRoomAdd = {
  id?: string;
  examRoomCode?: string;
  testExamSetID?: any;
  date?: string;
  start?: string;
  finish?: string;
  supervisorIDs?: any;
  linkZoom?: string;
};
