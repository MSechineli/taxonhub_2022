import { Request, Response } from 'express'
import readline from 'readline'
import { Readable } from 'stream'
import { Logger } from '../Logger/Logger'

function validatorCSV(req: Request, res: Response) {
  const logger = new Logger().logger();

  logger.info('Iniciando validador de arquivo CSV');

  if (req.file?.mimetype !== 'text/csv') {
    res.status(400).send({ Erro: 'Tipo de arquivo não suportado, utilize um arquivo CSV.' })
    logger.error('Arquivo nao e do tipo CSV');
    return false
  }

  logger.info('O arquivo e do tipo CSV');

  return true
}

export class ParserCSV {
  async parserCSVtoJSON(req: Request, res: Response): Promise<Array<string>> {
    const logger = new Logger().logger();

    logger.info('Iniciando o parser de arquivo CSV para JSON');

    if (!validatorCSV(req, res)) return []

    const arrayNames = []
    const b = req.file?.buffer

    const readableFile = new Readable()
    readableFile.push(b)
    readableFile.push(null)

    const nameLine = readline.createInterface({
      input: readableFile,
    })

    for await (let line of nameLine) {
      const species_names = line.split(',') //faz a leitura somente da primeira coluna do arquivo
      arrayNames.push(species_names[0])
    }

    logger.info('Gerado com sucesso o array de nomes do arquivo CSV');

    return arrayNames
  }
}
