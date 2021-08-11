import axios from 'axios';

// Endpoint
const ESTATISTICAS_API_BASE_URL = 'http://localhost:8080/totais'

class EstatisticaService{

    /**Requisitar informação de quanto foi gasto por categoria
     * em um determinado mês
     */
    getGastosCategoriaByMes = mesAno => {
        return axios.post(ESTATISTICAS_API_BASE_URL + '/by-categoria', mesAno);
    }
}

export default new EstatisticaService();
