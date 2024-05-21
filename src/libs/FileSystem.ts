import { homedir } from 'os'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'

export interface IFolderExistParams {
  fullPath: string
}

export interface ICreateFolderParams {
  fullPath: string
}

export interface IGetFullPathParams {
  fileName: string
}

export interface IPathJoin {
  basePath: string
  name: string
}

export interface IWriteFileSync {
  fullPathFileName: string
  file: Buffer
}

export const PATH_FOLDER_WORKSPACE = path.resolve(homedir(), 'Documents/tools-cli')

export const writeFileSync = ({ fullPathFileName, file }: IWriteFileSync) => {
  return fs.writeFileSync(fullPathFileName, file)
}

export const pathJoin = ({ basePath, name }: IPathJoin) => {
  return path.join(basePath, name)
}

export const readFileSync = (filePath: string) => {
  return fs.readFileSync(filePath)
}

export const getFullPathFile = ({ fileName }: IGetFullPathParams) => {
  const filePath = path.resolve(PATH_FOLDER_WORKSPACE, fileName)
  const filename = path.parse(fileName).name
  return {
    filePath, filename
  }
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
  console.log(
    chalk.red('Primero deve mover los archivos pdf a la carpeta: ') +
    chalk.blue(folderPath)
  )
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
  } catch (error) {
    response.success = false
    response.folderPath = ''
    console.log(error)
    console.log(chalk.red('No se pudo crear la carpeta'))
  }

  return response
}

/**
 * Lista los nombres de las carpetas y archivos en un directorio específico, incluyendo las extensiones de los archivos.
 * @param {string} dirPath - Ruta del directorio a listar.
 * @returns {Promise<string[]>} - Promesa que se resuelve con un array de nombres de carpetas y archivos con sus extensiones.
 */
export const listContentDir = async (dirPath: string) => {
  try {
    // Leer el contenido del directorio
    const files = await fs.promises.readdir(dirPath, { withFileTypes: true })

    // Construir el array de objetos con la información requerida
    const entries = files.filter(file => file.name.endsWith('.pdf'))

    return entries
  } catch (error) {
    console.error(`Error leyendo el directorio: ${error.message as string}`)
    throw error
  }
}
