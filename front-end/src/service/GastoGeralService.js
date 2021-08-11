import axios from "axios";

// Endpoint
const GASTOS_GERAIS_API_BASE_URL = 'http://localhost:8080/gastos'

class GastoGeralService{

    // Ver todos os gastos
    getGastos(){
        return axios.get(GASTOS_GERAIS_API_BASE_URL + '/todos');
    }

    // Adicionar um novo registro a tabela gastos gerais
    adicionarGasto(gasto){
        return axios.post(GASTOS_GERAIS_API_BASE_URL + '/novo/gasto', gasto);
    }

    // Consultar um registro de gastos gerais pelo ID
    getGastoById(gastoID){
        return axios.get(GASTOS_GERAIS_API_BASE_URL + '/gasto/' + gastoID);
    }

    // Atualizar um registro da tabela gastos gerais
    atualizarGasto(gasto, gastoID){
        return axios.put(GASTOS_GERAIS_API_BASE_URL + '/gasto/' + gastoID, gasto);
    }

    // Excluir um registro da tabela de gastos gerais
    deletarGasto(gastoID){
        return axios.delete(GASTOS_GERAIS_API_BASE_URL + '/gasto/' + gastoID);
    }

    // Recuperar todos os registros de gastos gerais com mesmo ID de mês
    getGastosByMes(mesAno){
        return axios.post(GASTOS_GERAIS_API_BASE_URL + '/gastos-mes', mesAno);
    }
}

export default new GastoGeralService();
