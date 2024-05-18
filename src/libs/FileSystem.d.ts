import { ICreateFolderParams, IFolderExistParams, IGetFilesFromPathParams } from '../entities/FileSystem.js';
export declare const getFilesPdfFromPath: ({ folderName }: IGetFilesFromPathParams) => void;
export declare const getPathFolderWorkSpace: () => string | undefined;
export declare const folderExist: ({ fullPath }: IFolderExistParams) => boolean;
export declare const createFolder: ({ fullPath }: ICreateFolderParams) => {
    success: boolean;
    folderPath: string;
};
