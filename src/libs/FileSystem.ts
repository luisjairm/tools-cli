import { homedir } from 'os'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import { ICreateFolderParams, IFolderExistParams, IGetFilesFromPathParams } from '../entities/FileSystem.js'

export const PATH_FOLDER_WORKSPACE = path.resolve(homedir(), 'Documents/tools-cli')

export const getFilesPdfFromPath = ({ folderName }: IGetFilesFromPathParams) => {

}

export const createWordspace = () => {
  if (folderExist({ fullPath: PATH_FOLDER_WORKSPACE })) {
    console.log(
      chalk.green('La carpeta ya existe. Verifique que los archivos se encuentren en ') +
      chalk.blue(PATH_FOLDER_WORKSPACE)
    )
    return PATH_FOLDER_WORKSPACE
  }

  const { success, folderPath } = createFolder({ fullPath: PATH_FOLDER_WORKSPACE })
  if (success) return folderPath
}

export const folderExist = ({ fullPath }: IFolderExistParams) => {
  return fs.existsSync(fullPath)
}

export const createFolder = ({ fullPath }: ICreateFolderParams) => {
  const response = {
    success: true,
    folderPath: fullPath
  }

  try {
    fs.mkdirSync(fullPath)
    console.log(chalk.green('Carpeta Creada'))
    console.log(
      chalk.red('Primero deve mover los archivos pdf a la carpeta: ') +
      chalk.blue(fullPath)
    )
  } catch (error) {
    response.success = false
    response.folderPath = ''
    console.log(chalk.red('No se pudo crear la carpeta'))
  }

  return response
}
