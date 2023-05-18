// ----------------------------------------------------------------------

export type IFileShared = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  permission: string;
};

export type IFolderManager = {
  id: string;
  name: string;
  type: string;
  totalItems?: number;
  dateCreated: Date | number | string;
  dateModified: Date | number | string;
};

export type IFile = IFolderManager;
