import React, { Component } from 'react';
import CategoriaService from '../../service/CategoriaService';

/**Esse componente será usado para adicionar um novo mês
 * ou editar um mês existente. Para diferenciar as duas
 * funções vamos verificar se o id é válido (editar) ou 
 * se é -1 (adicionar)
 */

class FormularioCategoria extends Component {
    
    constructor(props){
        
        super(props)

        this.state = {
            id: this.props.match.params.id,
            descricao: '',
            dataCriacao: ''
        }

        this.modificaDescricao = this.modificaDescricao.bind(this);
        this.modificaDataCriacao = this.modificaDataCriacao.bind(this);
        this.salvarRegistro = this.salvarRegistro.bind(this);
    }

    componentDidMount(){
        if( this.state.id === '-1' ){
            return
        } else {
            CategoriaService.getCategoriaById(this.state.id).then( (res => {
                let categoria = res.data;
                this.setState({
                    descricao: categoria.descricao,
                    dataCriacao: categoria.dataCriacao
                });
            }))
        }
    }

    modificaDescricao = (event) => {
        this.setState({descricao: event.target.value});
    }

    modificaDataCriacao = (event) => {
        this.setState({dataCriacao: event.target.value});
    }

    salvarRegistro = (e) => {
        e.preventDefault();
        let categoria = {descricao: this.state.descricao, dataCriacao: this.state.dataCriacao};

        if( this.state.id === '-1' ){
            CategoriaService.adicionarCategoria(categoria).then(res => {
                this.props.history.push('/categorias/todas');
            });
        } else {
            CategoriaService.atualizarCategoria(categoria, this.state.id).then( res =>  {
                this.props.history.push('/categorias/todas');
            });
        }
    }

    cancelar(){
        this.props.history.push('/categorias/todas');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center"> {(this.state.id === '-1') ? ('Adicionar Registro') : ('Editar Registro')} </h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Descrição: </label>
                                        <input placeholder="Descrição" name="descricao" className="form-control" 
                                            value={this.state.descricao} onChange={this.modificaDescricao}/>
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label>Data da Criação: </label>
                                        <input placeholder="dd/mm/aaaa" name="data" className="form-control" 
                                            value={this.state.dataCriacao} onChange={this.modificaDataCriacao} type="date"/>
                                    </div>
                                    <br />

                                    <button className="btn btn-success" onClick={this.salvarRegistro}>Salvar</button>
                                    <button className="btn btn-danger" onClick={this.cancelar.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormularioCategoria;
