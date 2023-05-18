export enum IGender {
  Other = 0,
  Male = 1,
  Female = 2,
}

// ----------------------------------------------------------------------

export type IUserAccountGeneral = {
  id: string;
  username: string;
  avatarUrl: string;
  active: boolean;
  address: string;
  birthday: string;
  code: string;
  email: string;
  firstName: string;
  fullName: string;
  lastName: string;
  gender: IGender;
  identityCard: string;
  isAdmin: boolean;
  isTrial: boolean;
  note: string;
  phone: string | number;
  roles: string[] | null;
  status: number;
  thumbnail: string;
  userRole: string;
};

export type IUserAccountChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
