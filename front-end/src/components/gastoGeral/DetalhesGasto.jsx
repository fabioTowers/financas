import React, { Component } from 'react';
import GastoGeralService from '../../service/GastoGeralService';

class DetalhesGasto extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            dataCompra: '',
            descricao: '',
            categoria: {},
            valor: 0.0,
            mesAno: {}
        }

        this.voltar = this.voltar.bind(this);
        this.editarRegistro = this.editarRegistro.bind(this);
    }

    componentDidMount(){
        GastoGeralService.getGastoById(this.state.id).then((res) => {
            let gasto = res.data;
            this.setState({
                dataCompra: gasto.dataCompra,
                descricao: gasto.descricao,
                categoria: gasto.categoria,
                valor: gasto.valor,
                mesAno: gasto.mesAno
            });
        });
    }

    voltar = () => { this.props.history.push(`/gastos/${this.state.mesAno.idMesAno}`) }

    editarRegistro = (id) => { this.props.history.push(`/gasto/form/${id}`) }

    render() {
        return (
            <div>
                <br />
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> Detalhes </h3>
                    <div className="card-body">
                        <div className="row">
                            <p><b>Data</b>: {this.state.dataCompra}</p>
                        </div>
                        <div className="row">
                            <p><b>Descrição</b>: {this.state.descricao}</p>
                        </div>
                        <div className="row">
                            <p><b>Categoria</b>: {this.state.categoria.descricao}</p>
                        </div>
                        <div className="row">
                            <p><b>Valor</b>: R$ {this.state.valor}</p>
                        </div>
                        <div className="row">
                            <p><b>Mês</b>: {this.state.mesAno.descricao}</p>
                        </div>
                        <br />
                        <br />

                        <button className="btn btn-success" onClick={this.voltar}>Voltar</button>
                        <button onClick={ () => this.editarRegistro(this.state.id) } className="btn btn-success"  style={{marginLeft: "10px"}}>Editar</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetalhesGasto;
