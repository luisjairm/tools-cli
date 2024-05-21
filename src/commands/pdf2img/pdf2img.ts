import inquirer from 'inquirer'
import { PATH_FOLDER_WORKSPACE, listContentDir } from '../../libs/FileSystem.js'
import { pdf2img } from '../../libs/pdf2img.js'
export interface IItemInfo {
  isFile: boolean
  name: string
  value: string
  path: string
}

export interface IPdf2imgInquirerParams {
  selectedItem: string
}

// eslint-disable-next-line
export const pdf2imgCommand = async () => {
  await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedItem',
      message: 'Selecciona el archivo que desa convertir',
      choices: await listContentDir(PATH_FOLDER_WORKSPACE)
    }
  ]).then(async ({ selectedItem }: IPdf2imgInquirerParams) => {
    await pdf2img({ fileName: selectedItem })
  })
}
