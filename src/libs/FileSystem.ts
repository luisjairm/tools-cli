import { homedir } from 'os'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import { ICreateFolderParams, IFolderExistParams, IGetFilesFromPathParams } from '../entities/FileSystem.js'

export const getFilesPdfFromPath = ({ folderName }: IGetFilesFromPathParams) => {

}

export const getPathFolderWorkSpace = () => {
  const fullPathFolder = path.resolve(homedir(), 'Documents/tools-cli')
  if (folderExist({ fullPath: fullPathFolder })) {
    console.log(
      chalk.green('La carpeta ya existe. Verifique que los archivos se encuentren en ') +
      chalk.blue(fullPathFolder)
    )
    return fullPathFolder
  }

  const { success, folderPath } = createFolder({ fullPath: fullPathFolder })
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
