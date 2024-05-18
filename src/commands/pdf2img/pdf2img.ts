import inquirer from 'inquirer'

// eslint-disable-next-line
export const pdf2img = async () => {
  await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedFileName',
      message: 'Selecciona el archivo que desa convertir',
      choices: ['1', '2']
    }
  ]).then(res => {
    console.log(res)
  })
}
