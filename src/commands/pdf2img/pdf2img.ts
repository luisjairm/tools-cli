import inquirer from 'inquirer'

// eslint-disable-next-line
export const pdf2img = async () => {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'folderName',
      message: 'Ingresa el nombre de la carpeta donde se encutra el pdf.\n La carpeta debe estar dentro de "Descargas'
    }
  ]).then(res => {
    console.log(res)
  })
}
