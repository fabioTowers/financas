import React, { Component } from 'react';
import CategoriaService from '../../service/CategoriaService';

class ListaCategorias extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categorias: []
        }
        this.adicionarRegistro = this.adicionarRegistro.bind(this);
        this.editarRegistro = this.editarRegistro.bind(this);
        this.deletarRegistro = this.deletarRegistro.bind(this);
    }

    deletarRegistro(id){
        // chamada a REST API
        CategoriaService.deletarCategoria(id).then( res => {
            this.setState({categorias: this.state.categorias.filter(categoria => categoria.idCategoria !== id)});
        });
    }

    /**
     * componentDidMount é chamado assim que o 
     * componente é renderizado
     */
    componentDidMount(){
        CategoriaService.getCategorias().then((res) => {
            this.setState({ categorias: res.data });
        });
    }

    adicionarRegistro(){
        this.props.history.push('/categoria/form/-1');
    }

    editarRegistro( id ){
        this.props.history.push(`/categoria/form/${id}`);
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Categorias</h2>
                <div className="row" style={{padding: "10px"}}>
                    <button style={{width: "180px"}} className="btn btn-primary" onClick={this.adicionarRegistro}>Adicionar registro</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                               <th>Descrição</th>
                               <th>Data da criação</th>
                               <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.categorias.map(
                                    categoria => 
                                        <tr key={`${categoria.idCategoria}`}>
                                            <td>{categoria.descricao}</td>
                                            <td>{categoria.dataCriacao}</td>
                                            
                                            <td>
                                                <button onClick={ () => this.editarRegistro(categoria.idCategoria)} className="btn btn-info">Editar</button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deletarRegistro(categoria.idCategoria)} className="btn btn-danger"> Deletar </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListaCategorias;
