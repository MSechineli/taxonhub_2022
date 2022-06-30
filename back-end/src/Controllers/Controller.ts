import { Request, Response } from 'express'
import { FloraDoBrasil } from '../Services/FloraDoBrasil'
import { ParserCSV } from '../Services/MulterParser'
import { OutputParser } from '../Services/OutputParser'
import { SpeciesLink } from '../Services/SpeciesLink'
import { Formatters } from '../Utils/Formatters'
import { Logger } from '../Logger/Logger'

export class Controller {
  async buscaFloraDoBrasil(req: Request, res: Response) {
    const logger = new Logger().logger();
    const parserCSV = new ParserCSV()
    const floraDoBrasil = new FloraDoBrasil()
    const outputParser = new OutputParser()
    const formatters = new Formatters()

    try {
      const especies = await parserCSV.parserCSVtoJSON(req, res)
      const data = await floraDoBrasil.buscaEspecieFloraDoBrasil(especies)

      const jsonSplited = formatters.splitJson(data.toString())
      const jsonFormatted = formatters.addNameSearchedToJson(jsonSplited, especies)

      const parsedData = outputParser.parseOutputFloraDoBrasil(jsonFormatted)

      logger.info('Dados do Flora do Brasil em formato JSON gerado com sucesso');

      return res.status(200).send({ data: parsedData })
    } catch (err) {
      logger.error('Erro ao gerar dados do Flora do Brasil em formato JSON');
      return res.status(400).send({ erro: 'Erro inesperado' })
    }
  }

  async buscaSpeciesLink(req: Request, res: Response) {
    const parserCSV = new ParserCSV()
    const speciesLink = new SpeciesLink()
    const outputParser = new OutputParser()

    try {
      const especies = await parserCSV.parserCSVtoJSON(req, res)
      const data = await speciesLink.buscaSpeciesLink(especies)
      const parsedData = outputParser.parseOutputSpeciesLink(data)
      res.status(200).send({ data: parsedData })
    } catch (err) {
      res.status(400).send({ erro: 'Erro inesperado' })
    }
    return
  }
}
