import axios from 'axios'

const DESPESAS_FIXAS_API_BASE_URL = 'http://localhost:8080/despesa-fixa'

class DespesaFixaService{

    // Receber todos os registros de despesas fixas
    getDespesasFixas(){
        return axios.get(DESPESAS_FIXAS_API_BASE_URL + '/todas');
    }

    // Adicionar novo registro às despesas fixas
    adicionarDespesaFixa(despesaFixa){
        return axios.post(DESPESAS_FIXAS_API_BASE_URL + '/nova/despesa-fixa', despesaFixa);
    }

    // Consultar um registro de despesa fixa pelo ID
    getDespesaFixaById(despesaFixaID){
        return axios.get(DESPESAS_FIXAS_API_BASE_URL + '/despesa-fixa/' + despesaFixaID);
    }

    // Atualizar um registro de despesa fixa
    atualizarDespesaFixa(despesaFixa, despesaFixaID){
        return axios.put(DESPESAS_FIXAS_API_BASE_URL + '/despesa-fixa/' + despesaFixaID, despesaFixa);
    }

    // Deletar um registro de despesa fixa
    deletarDespesaFixa(despesaFixaID){
        return axios.delete(DESPESAS_FIXAS_API_BASE_URL + '/despesa-fixa/' + despesaFixaID);
    }

    // Recuperar lista de despesas fixas filtrado pelo id do mês
    getDespesaFixaByMes(mesAno){
        return axios.post(DESPESAS_FIXAS_API_BASE_URL + '/despesa-fixa-mes', mesAno);
    }
}

export default new DespesaFixaService();
