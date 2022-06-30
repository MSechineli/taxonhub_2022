import axios from 'axios'
import https from 'https'
import { Logger } from '../Logger/Logger'

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export class FloraDoBrasil {
  async buscaEspecieFloraDoBrasil(especies: Array<string>) {
    const logger = new Logger().logger();

    logger.info('Iniciando busca de especies do Flora do Brasil pela API')  

    const data = []

    try {
      for (const especie of especies) {
        const dadosFloraDoBrasil = await axios.get(
          `https://servicos.jbrj.gov.br/flora/taxon/${especie}`,
          {
            httpsAgent: new https.Agent({
              rejectUnauthorized: false,
            }),
          },
        )
        data.push(dadosFloraDoBrasil.data)
      }

      logger.info('Sucesso na busca de especies do Flora do Brasil');
      
      return data
    } catch (err) {
      logger.error('Erro na busca de especies do Flora do Brasil')
      throw err
    }
  }
}
