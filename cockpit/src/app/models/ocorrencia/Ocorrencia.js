import { shape, number, instanceOf, string, object } from "prop-types";

import { format } from "date-fns";
import { filterAny } from "../../../shared/libs/utils";

import OcorrenciaParser from "./OcorrenciaParser";
import { estadoShape } from "./EstadoOcorrencia";
import { tipoEventoShape } from "./TipoEvento";

export const ocorrenciaShape = shape({
  id: number,
  estado: estadoShape,
  tipoEvento: tipoEventoShape,
  data: instanceOf(Date),
  textoData: string,
  dataRecebimento: instanceOf(Date),
  textoDataRecebimento: string,
  operacao: string,
  referencia: string,
  dados: object,
  evento: object
});

export default class Ocorrencia {
  static criarComDadosApi(ocorrenciaApi) {
    const ocorrenciaParser = new OcorrenciaParser(ocorrenciaApi);
    return ocorrenciaParser.parse();
  }

  get textoData() {
    return format(this.data, "DD/MM/YYYY HH:mm");
  }

  get textoDataRecebimento() {
    return format(this.dataRecebimento, "DD/MM/YYYY HH:mm");
  }

  static sort(o1, o2) {
    return o2.id - o1.id;
  }

  static filtrarListaPorEstado(ocorrencias, estado) {
    if (!ocorrencias) return [];
    return ocorrencias.filter(ocorrencia =>
      ocorrencia.filtrarPorEstado(estado)
    );
  }

  filtrarPorEstado(estado) {
    if (!estado) return true;
    return this.estado && this.estado.id === estado.id;
  }

  static filtrarListaGenericamente(ocorrencias, filtro) {
    if (!ocorrencias) return [];
    return ocorrencias.filter(ocorrencia =>
      ocorrencia.filtrarGenericamente(filtro)
    );
  }

  filtrarGenericamente(textoFiltro) {
    if (!textoFiltro) return true;
    return filterAny(
      textoFiltro,
      this.id,
      this.estado && this.estado.descricao,
      this.tipoEvento && this.tipoEvento.descricaoCompleta
    );
  }
}
