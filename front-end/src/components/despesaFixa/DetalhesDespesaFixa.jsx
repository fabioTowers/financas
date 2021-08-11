import React, { Component } from 'react';
import DespesaFixaService from '../../service/DespesaFixaService';

class DetalhesDespesaFixa extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            descricao: '',
            categoria: {},
            valor: 0.0,
            status: '',
            dataPagamento: '',
            observacao: '',
            mesAno: {}
        }

        this.voltar = this.voltar.bind(this);
        this.editarRegistro = this.editarRegistro.bind(this);
    }

    componentDidMount(){
        DespesaFixaService.getDespesaFixaById(this.state.id).then( res => {
            let despesaFixa = res.data;
            this.setState({
                descricao: despesaFixa.descricao,
                categoria: despesaFixa.categoria,
                valor: despesaFixa.valor,
                status: despesaFixa.status,
                dataPagamento: despesaFixa.dataPagamento,
                observacao: despesaFixa.observacao,
                mesAno: despesaFixa.mesAno
            });
        });
    }

    voltar(){
        this.props.history.push(`/despesas-fixas/${this.state.mesAno.idMesAno}`);
    }

    editarRegistro(id){
        this.props.history.push(`/despesa-fixa/form/${id}`);
    }

    render() {
        return (
            <div>
                <br />
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> Detalhes </h3>
                    <div className="card-body">
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
                            <p><b>Status</b>: {this.state.status}</p>
                        </div>
                        <div className="row">
                            <p><b>Data do pagamento</b>: {this.state.dataPagamento}</p>
                        </div>
                        <div className="row">
                            <p><b>Observação</b>: {this.state.observacao}</p>
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

export default DetalhesDespesaFixa;