#! /usr/bin/env node
import { program } from 'commander'
import inquirer from 'inquirer'
import { pdf2img } from '../src/commands/pdf2img/pdf2img.js'
import chalk from 'chalk'
import { configureWorkspace } from '../src/actions/configureWorkspace.js'
import { PATH_FOLDER_WORKSPACE, folderExist } from '../src/libs/FileSystem.js'

const listTools = [
  { name: 'pdf2img', value: 'pdf2img', description: 'Convertir PDF a imágenes' },
  { name: 'compress', value: 'compress', description: 'Comprimir archivos' }
] as const
type TListTools = (typeof listTools)[number]['value']

interface IResponsesPrompt {
  selectedTool: TListTools
}

interface IResponseCommander {
  configure?: boolean
}

program.version('1.0.0').description('')
  .option('-c, --configure', 'Configurar area de trabajo')
  .action(async ({ configure }: IResponseCommander) => {
    if (configure === true) {
      configureWorkspace()
      return
    }

    if (!folderExist({ fullPath: PATH_FOLDER_WORKSPACE })) {
      console.log(chalk.blue('Primero deve crear la carpeta correspondiente y mover los archivos'))
      console.log(chalk.yellow('ejecute: '))
      console.log()
      console.log(chalk.green('tools-cli -c'))
      return
    }

    await inquirer.prompt([
      {
        type: 'list',
        message: chalk.yellow('Selecciona la herramienta'),
        name: 'selectedTool',
        choices: listTools.map(tool => ({
          name: `${tool.name} - ${tool.description}`,
          value: tool.value
        }))
      }
    ]).then(async ({ selectedTool }: IResponsesPrompt) => {
      console.log(selectedTool)

      switch (selectedTool) {
        case 'pdf2img':
          await pdf2img()
          break
        default:
          console.log(chalk.red('Opción no reconocida'))
      }
    })
  })

program.parse(process.argv)
