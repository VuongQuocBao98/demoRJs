export type IExamRoom = {
  id: string;
  stt?: number;
  examRoomCode: string;
  date: string;
  testExamSetID: string;
  start: string;
  finish: string;
  linkZoom: string;
  supervisorIDs: any;
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
