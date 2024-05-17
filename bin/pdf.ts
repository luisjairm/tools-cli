#! /usr/bin/env node
import { program } from "commander";
import inquirer from 'inquirer'

const listTools = ['pdf2img', 'compress'] as const;
export type TListTools = (typeof listTools)[number];

interface IResponsesPrompt {
  selectedTool: TListTools
}

program.version('1.0.0').description('')
program.action(() => {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Selecciona la herramienta',
      name: 'selectedTool',
      choices: listTools
    }
  ]).then(({selectedTool}:IResponsesPrompt) => {
    console.log(selectedTool);
  })
})

program.parse(process.argv)