#! /usr/bin/env node
import { program } from 'commander'
import inquirer from 'inquirer'
import { pdf2img } from '../src/commands/pdf2img/pdf2img.js'
import chalk from 'chalk'
import { getPathFolderWorkSpace } from '../src/libs/FileSystem.js'

const listTools = [
  { name: 'pdf2img', value: 'pdf2img', description: 'Convertir PDF a imágenes' },
  { name: 'compress', value: 'compress', description: 'Comprimir archivos' }
] as const
type TListTools = (typeof listTools)[number]['value']

interface IResponsesPrompt {
  selectedTool: TListTools
}

program.version('1.0.0').description('')
program.action(async () => {
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
    getPathFolderWorkSpace()

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
