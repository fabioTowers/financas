import axios from "axios";

// Endpoint
const DESPESAS_VARIAVEIS_API_BASE_URL = 'http://localhost:8080/despesa-variavel'

class DespesaVariavelService{

    // Receber todas as despesas variáveis
    getDespesasVariaveis(){
        return axios.get(DESPESAS_VARIAVEIS_API_BASE_URL + '/todas');
    }

    // Adicionar nova despesa variável
    adicionarDespesaVariavel(despesaVariavel){
        return axios.post(DESPESAS_VARIAVEIS_API_BASE_URL + '/nova/despesa-variavel', despesaVariavel);
    }

    // Consultar despesa variável pelo id
    getDespesaVariavelById(despesaVariavelID){
        return axios.get(DESPESAS_VARIAVEIS_API_BASE_URL + '/despesa-variavel/' + despesaVariavelID);
    }

    // Enviar registro de uma despesa variável atualizado
    atualizarDespesaVariavel(despesaVariavel, despesaVariavelID){
        return axios.put(DESPESAS_VARIAVEIS_API_BASE_URL + '/despesa-variavel/' + despesaVariavelID, despesaVariavel);
    }

    // Deletar um registro de despesa variável
    deletarDespesaVariavel(despesaVariavelID){
        return axios.delete(DESPESAS_VARIAVEIS_API_BASE_URL + '/despesa-variavel/' + despesaVariavelID);
    }

    // Recuperar lista de despesas variáveis pelo mes
    getDepesasVariaveisByMes(mesAno){
        return axios.post(DESPESAS_VARIAVEIS_API_BASE_URL + '/despesa-variavel-mes', mesAno);
    }
}

export default new DespesaVariavelService()
