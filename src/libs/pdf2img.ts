import chalk from 'chalk'
import pdftopic from 'pdftopic'
import { PATH_FOLDER_WORKSPACE, createFolder, getFullPathFile, pathJoin, readFileSync, writeFileSync } from './FileSystem.js'

export interface IPdf2imgParams {
  fileName: string
}

export const pdf2img = async ({ fileName }: IPdf2imgParams) => {
  console.log(chalk.yellow('Iniciando...'))
  console.log(chalk.yellow('Obteniendo información del archivo'))

  const { filePath, filename } = getFullPathFile({ fileName })

  const { folderPath, success } = createFolder({ fullPath: pathJoin({ basePath: PATH_FOLDER_WORKSPACE, name: filename }) })

  if (!success) {
    return
  }

  console.log(chalk.yellow('Convirtiendo'))

  const convertedResult = await pdftopic.pdftobuffer(readFileSync(filePath), 'all')

  if (convertedResult === null) {
    chalk.red('No se pudo convertir el archivo')
    return
  }

  for (let i = 0; i < convertedResult.length; i++) {
    const name = `${i + 1}-${filename}.jpg`
    console.log(
      chalk.yellow('Guardando ') +
      chalk.blue(name)
    )
    const fullFileName = pathJoin({ basePath: folderPath, name })
    writeFileSync({ fullPathFileName: fullFileName, file: convertedResult[i] })
  }

  console.log(chalk.blue(`Guardado en ${folderPath}`))
}
