import axios from 'axios'

// Endpoint
const CATEGORIAS_API_BASE_URL = 'http://localhost:8080/categorias'

class CategoriaService {
    // Receber dados das categorias
    getCategorias(){
        return axios.get(CATEGORIAS_API_BASE_URL + '/todas');
    }

    // Enviar dados
    adicionarCategoria(categoria){
        return axios.post(CATEGORIAS_API_BASE_URL + '/nova/categoria', categoria);
    }

    // Recuperar categoria pelo id
    getCategoriaById(categoriaID){
        return axios.get(CATEGORIAS_API_BASE_URL + '/categoria/' + categoriaID);
    }

    // Enviar registro de uma categoria atualizado
    atualizarCategoria(categoria, categoriaID){
        return axios.put(CATEGORIAS_API_BASE_URL + '/categoria/' + categoriaID, categoria);
    }

    // Solicitar a API que delete um registro
    deletarCategoria(categoriaID){
        return axios.delete(CATEGORIAS_API_BASE_URL + '/categoria/' + categoriaID);
    }
}

export default new CategoriaService()