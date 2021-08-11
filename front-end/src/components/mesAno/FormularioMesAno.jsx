import React, { Component } from 'react';
import MesAnoService from '../../service/MesAnoService';

/**Esse componente será usado para adicionar um novo mês
 * ou editar um mês existente. Para diferenciar as duas
 * funções vamos verificar se o id é válido (editar) ou 
 * se é -1 (adicionar)
 */

class FormularioMesAno extends Component {
    
    constructor(props){
        
        super(props)

        this.state = {
            id: this.props.match.params.id,
            descricao: ''
        }

        this.modificaDescricao = this.modificaDescricao.bind(this);
        this.salvarRegistro = this.salvarRegistro.bind(this);
    }

    componentDidMount(){
        if( this.state.id === '-1' ){
            return
        } else {
            MesAnoService.getMesById(this.state.id).then( (res => {
                let mes = res.data;
                this.setState({
                    descricao: mes.descricao
                });
            }))
        }
    }

    modificaDescricao = (event) => {
        this.setState({descricao: event.target.value});
    }

    salvarRegistro = (e) => {
        e.preventDefault();
        let mes = {descricao: this.state.descricao};

        if( this.state.id === '-1' ){
            MesAnoService.adicionarMes(mes).then(res => {
                this.props.history.push('/meses/todos');
            });
        } else {
            MesAnoService.atualizarMes(mes, this.state.id).then( res =>  {
                this.props.history.push('/meses/todos');
            });
        }
    }

    cancelar(){
        this.props.history.push('/meses');
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
                                        <label>Mês: </label>
                                        <input placeholder="Mês/ano" name="nome" className="form-control" 
                                            value={this.state.descricao} onChange={this.modificaDescricao}/>
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

export default FormularioMesAno;
