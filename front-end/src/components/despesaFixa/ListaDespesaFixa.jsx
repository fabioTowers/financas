import React, { Component } from 'react';
import DespesaFixaService from '../../service/DespesaFixaService';
import MesAnoService from '../../service/MesAnoService';

class ListaDespesasFixas extends Component {

    constructor(props){

        super(props)

        this.state = {
            despesasFixas: [],
            idMes: this.props.match.params.idMes
        }

        this.adicionarDespesaFixa = this.adicionarDespesaFixa.bind(this);
        this.editarRegistro = this.editarRegistro.bind(this);
    }

    componentDidMount() {
        MesAnoService.getMesById(this.state.idMes).then(res => {
            DespesaFixaService.getDespesaFixaByMes(res.data).then(r => {
                this.setState({ despesasFixas: r.data });
            });
        });
    }

    adicionarDespesaFixa(){
        this.props.history.push('/despesa-fixa/form/-1');
    }

    editarRegistro(id){
        this.props.history.push(`/despesa-fixa/form/${id}`);
    }

    detalhesRegistro(id){
        this.props.history.push(`/detalhes-despesa-fixa/${id}`);
    }

    deletarRegistro(id){
        DespesaFixaService.deletarDespesaFixa(id).then(res => {
            this.setState({despesasFixas: this.state.despesasFixas.filter(despesaFixa => despesaFixa.id !== id)});
        });
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Despesas Fixas</h2>
                <div className="row" style={{padding: "10px"}}>
                    <button style={{width: "180px"}} className="btn btn-primary" onClick={this.adicionarDespesaFixa}>Adicionar registro</button>
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
                                this.state.despesasFixas.map(
                                    despesaFixa =>
                                        <tr key={`${despesaFixa.id}`}>
                                            <td>{despesaFixa.descricao}</td>
                                            <td>{despesaFixa.status}</td>
                                            <td>
                                                <button onClick={ () => this.editarRegistro(despesaFixa.id) } className="btn btn-info">Editar</button>
                                                <button onClick={ () => this.detalhesRegistro(despesaFixa.id) } style={{marginLeft: "10px"}} className="btn btn-info">Detalhes</button>
                                                <button onClick={ () => this.deletarRegistro(despesaFixa.id) } style={{marginLeft: "10px"}} className="btn btn-danger">Deletar</button>
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

export default ListaDespesasFixas;
