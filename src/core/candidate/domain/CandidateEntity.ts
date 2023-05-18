export type ICandidate = {
  id?: string;
  stt?: number;
  idNumber?: string;
  fullName?: string;
  phoneNumber: string;
  dob?: string;
  gender?: number;
  email?: string;
  identifyCard?: string;
  company?: string;
  avatar?: string;
  degree?: string;
  workplace?: string;
  address?: string;
  class?: string;
  linkTest: string;
  exam?: string;
  created?: any;
  status?: string | number;
};

export type ICandidateForm = {
  id?: string;
  fullName: string;
  dob: string;
  gender: string;
  identificationNumber: string;
  phoneNumber?: string;
  phoneBackupNumber?: string;
  email?: string;
  specificAddress: string;
  placeOfWork?: string;
  needsHardCopyCertification?: string;
  className?: string;
  prepCenter?: string;
  purposeOfTakingExam: string;
  photoOfCandidate: File | string;
};
