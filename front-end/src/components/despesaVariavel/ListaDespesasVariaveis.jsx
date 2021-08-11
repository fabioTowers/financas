import React, { Component } from 'react';
import DespesaVariavelService from '../../service/DespesaVariavelService';
import MesAnoService from '../../service/MesAnoService';

class ListaDespesasVariaveis extends Component {
    constructor(props) {

        super(props)

        this.state = {
            despesasVariaveis: [],
            idMes: this.props.match.params.idMes
        }

        this.adicionarDespesaVariavel = this.adicionarDespesaVariavel.bind(this);
        this.editarRegistro = this.editarRegistro.bind(this);
    }

    componentDidMount(){
        MesAnoService.getMesById(this.state.idMes).then(r => {
            DespesaVariavelService.getDepesasVariaveisByMes(r.data).then((res) => {
                this.setState({ despesasVariaveis: res.data });
            });
        });
    }

    adicionarDespesaVariavel(){
        this.props.history.push('/despesa-variavel/form/-1');
    }

    editarRegistro(id){
        this.props.history.push(`/despesa-variavel/form/${id}`);
    }

    deletarRegistro(id){
        DespesaVariavelService.deletarDespesaVariavel(id).then( res => {
            this.setState({despesasVariaveis: this.state.despesasVariaveis.filter(despesaVariavel => despesaVariavel.id !== id)});
        });
    }

    detalhesRegistro(id){
        this.props.history.push(`/detalhes-despesa-variavel/${id}`);
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Despesas Variáveis</h2>
                <div className="row" style={{padding: "10px"}}>
                    <button style={{width: "180px"}} className="btn btn-primary" onClick={this.adicionarDespesaVariavel}>Adicionar registro</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Status</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.despesasVariaveis.map(
                                    despesaVariavel => 
                                        <tr key={`${despesaVariavel.id}`}>
                                            <td>{despesaVariavel.descricao}</td>
                                            <td>{despesaVariavel.status}</td>
                                            <td>
                                                <button onClick={ () => this.editarRegistro(despesaVariavel.id)} className="btn btn-info">Editar</button>
                                                <button onClick={ () => this.detalhesRegistro(despesaVariavel.id) } style={{marginLeft: "10px"}} className="btn btn-info">Detalhes</button>
                                                <button onClick={ () => this.deletarRegistro(despesaVariavel.id)} style={{marginLeft: "10px"}} className="btn btn-danger">Deletar</button>
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

export default ListaDespesasVariaveis;