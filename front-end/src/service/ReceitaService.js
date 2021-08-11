import axios from "axios";

// Endpoint
const RECEITAS_API_BASE_URL = 'http://localhost:8080/receitas'

class ReceitaService{
    
    // Ver todas as receitas
    getReceitas(){
        return axios.get(RECEITAS_API_BASE_URL + '/todas');
    }

    // Adicionar um novo registro às receitas
    adicionarReceita(receita){
        return axios.post(RECEITAS_API_BASE_URL + '/nova/receita', receita);
    }

    // Consultar uma receita pelo ID
    getReceitaById(receitaID){
        return axios.get(RECEITAS_API_BASE_URL + '/receita/' + receitaID);
    }

    // Atualizar um registro de receita
    atualizarReceita(receita, receitaID){
        return axios.put(RECEITAS_API_BASE_URL + '/receita/' + receitaID, receita);
    }

    // Excluir um registro de receita
    deletarReceita(receitaID){
        return axios.delete(RECEITAS_API_BASE_URL + '/receita/' + receitaID);
    }

    // Recupera registros de receita com determinado ID
    getReceitaByMes(mesAno){
        return axios.post(RECEITAS_API_BASE_URL + '/receitas-mes', mesAno);
    }
}

export default new ReceitaService();
