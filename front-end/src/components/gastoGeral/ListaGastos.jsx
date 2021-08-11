import React, { Component } from 'react';
import GastoGeralService from '../../service/GastoGeralService';
import MesAnoService from '../../service/MesAnoService';

class ListaGastos extends Component {

    constructor(props){

        super(props)

        this.state = {
            gastos: [],
            idMes: this.props.match.params.idMes
        }

        this.adicionarGasto = this.adicionarGasto.bind(this);
        this.editarRegistro = this.editarRegistro.bind(this);
    }

    componentDidMount(){
        MesAnoService.getMesById(this.state.idMes).then(res => {
            GastoGeralService.getGastosByMes(res.data).then((res) => {
                this.setState({ gastos: res.data });
            });
        });
    }

    adicionarGasto = () => { this.props.history.push('/gasto/form/-1') }
    editarRegistro = (id) => { this.props.history.push(`/gasto/form/${id}`) }
    detalhesRegistro = (id) => { this.props.history.push(`/detalhes-gasto/${id}`) }

    deletarRegistro(id) {
        GastoGeralService.deletarGasto(id).then(() => {
            this.setState({ gastos: this.state.gastos.filter(gasto => gasto.id !== id) });
        });
    }

    render(){
        return(
            <div className="container">
                <h2 className="text-center">Gastos Gerais</h2>
                <div className="row" style={{padding: "10px"}}>
                    <button style={{width: "180px"}} className="btn btn-primary" onClick={this.adicionarGasto}>Adicionar registro</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th>Valor</th>
                                <th>Mês</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.gastos.map(
                                    gasto => 
                                        <tr key={`${gasto.id}`}>
                                            <td>{gasto.dataCompra}</td>
                                            <td>{gasto.descricao}</td>
                                            <td>{gasto.categoria.descricao}</td>
                                            <td>{gasto.valor}</td>
                                            <td>{gasto.mesAno.descricao}</td>
                                            <td>
                                                <button onClick={ () => this.editarRegistro(gasto.id) } className="btn btn-info">Editar</button>
                                                <button onClick={ () => this.detalhesRegistro(gasto.id) } style={{marginLeft: "10px"}} className="btn btn-info">Detalhes</button>
                                                <button onClick={ () => this.deletarRegistro(gasto.id) } style={{marginLeft: "10px"}} className="btn btn-danger">Excluir</button>
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

export default ListaGastos;
