export type IExamQuestion = {
  id: string;
  title: string;
};

export type IExamSection = {
  id?: string;
  name: string;
  questions: IExamQuestion[];
};

export type IExamInfo = {
  id?: string;
  type: number;
  sections: IExamSection[];
};

export type IExam = {
  id?: string;
  exam: string;
  creator?: string;
  created: string | number;
  updated: string;
  audioFile?: string;
  code: string;
  roomCode?: string;
  status?: string;
  examInfos: IExamInfo[];
};

// ----------------------------------------------------------------------

export type IExamLabel = {
  id: string;
  type: string;
  name: string;
  unreadCount?: number;
  color?: string;
};

export type IExamQuestionAdd = {
  skill?: string;
  title?: string;
  content?: string;
  record?: File | null;
  typeQuestion?: string | null;
  inputItems?: any;
  valueSettings?: string;
  overview?: string;
  answers?: any;
  configAnswerCheckBoxs?: any;
};

export type IExamSectionEdit = {
  id?: string;
  examID?: string;
  name?: string;
  overview?: string;
  content?: string;
};

export type IExamEdit = {
  id: string;
  code?: string;
  name?: string;
  type?: number;
  note?: string;
  listeningFile?: string;
};
