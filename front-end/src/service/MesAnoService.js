import axios from 'axios'

// Endpoint
const MES_ANO_API_BASE_URL = 'http://localhost:8080/meses'

class MesAnoService {
    // Receber dados de meses
    getMeses(){
        return axios.get(MES_ANO_API_BASE_URL + '/todos');
    }

    // Enviar dados
    adicionarMes(mesAno){
        return axios.post(MES_ANO_API_BASE_URL + '/novo/mes', mesAno);
    }

    // Recuperar mês pelo id
    getMesById(mesID){
        return axios.get(MES_ANO_API_BASE_URL + '/mes/' + mesID);
    }

    // Enviar registro de um mes atualizado
    atualizarMes(mesAno, mesAnoID){
        return axios.put(MES_ANO_API_BASE_URL + '/mes/' + mesAnoID, mesAno);
    }

    // Solicitar a API que delete um registro
    deletarMes(mesID){
        return axios.delete(MES_ANO_API_BASE_URL + '/mes/' + mesID);
    }
}

export default new MesAnoService()