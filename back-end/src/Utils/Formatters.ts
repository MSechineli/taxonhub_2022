import { Logger } from '../Logger/Logger'

export class Formatters {
  
  splitJson(json: String): any {
    const logger = new Logger().logger();
    
    logger.info('Iniciando o split do arquivo JSON');

    const ajustJson = json.replace(/\}Conectado com\: 10\.10\.100\.29\<br\/\>/g,  '}');
    const removeLineBreak = ajustJson.split('\n').join('');
    const jsonFormatted = JSON.parse("{ \"result\": [" +  removeLineBreak + "] }");

    logger.info('Retornando arquivo JSON formatado');

    return jsonFormatted;
  }

  addNameSearchedToJson(json: any, nameSearched: string[]): any {
    const logger = new Logger().logger();
    logger.info('Iniciando a adicao de nomes encontrados para um arquivo JSON');

    var jsonFormatted = json;

    var i = 0;
    for (var item of jsonFormatted.result) {
      const name = nameSearched[i];
      jsonFormatted.result[i] = JSON.parse("{ \"Name Searched\": \"" + name + "\", \"result\": " +  JSON.stringify(item.result) + " }");
      i++;
    }

    logger.info('Retornando o arquivo JSON com os nomes encontrados');

    return jsonFormatted;
  }
}