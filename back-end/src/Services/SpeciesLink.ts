import axios from 'axios'
import { Logger } from '../Logger/Logger'

export class SpeciesLink {
  async buscaSpeciesLink(especies: Array<string>) {
    const logger = new Logger().logger()
    try {
      logger.debug(`Tentando buscar no SpeciesLink: ${especies}`)
      const dadosSpeciesLink = await axios.post(`https://api.splink.org.br/records`, {
        Scientificname: especies,
        Format: 'JSON',
      })

      logger.info('Sucesso na busca de especies no SpeciesLink')

      return dadosSpeciesLink.data
    } catch (err) {
      logger.error('Erro na busca de especies no SpeciesLink')
      throw err
    }
  }
}
