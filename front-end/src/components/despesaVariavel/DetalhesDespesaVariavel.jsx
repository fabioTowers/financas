import React, { Component } from 'react';
import DespesaVariavelService from '../../service/DespesaVariavelService';

class DetalhesDespesaVariavel extends Component {

    constructor(props) {

        super(props)

        this.state = {
            id: this.props.match.params.id,
            descricao: '',
            categoria: {},
            valorPlanejado: 0.0,
            valorPago: 0.0,
            status: '',
            dataPagamento: '',
            observacao: '',
            mesAno: {}
        }

        this.voltar = this.voltar.bind(this);
        this.editarRegistro = this.editarRegistro.bind(this);
    }

    componentDidMount(){
        DespesaVariavelService.getDespesaVariavelById(this.state.id).then( res => {
            let despesaVariavel = res.data;
            this.setState({
                descricao: despesaVariavel.descricao,
                categoria: despesaVariavel.categoria,
                valorPlanejado: despesaVariavel.valorPlanejado,
                valorPago: despesaVariavel.valorPago,
                status: despesaVariavel.status,
                dataPagamento: despesaVariavel.dataPagamento,
                observacao: despesaVariavel.observacao,
                mesAno: despesaVariavel.mesAno
            });
        });
    }

    voltar(){
        this.props.history.push(`/despesas-variaveis/${this.state.mesAno.idMesAno}`);
    }

    editarRegistro(id){
        this.props.history.push(`/despesa-variavel/form/${id}`);
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
                            <p><b>Valor planejado</b>: R$ {this.state.valorPlanejado}</p>
                        </div>
                        <div className="row">
                            <p><b>Valor pago</b>: R$ {this.state.valorPago}</p>
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

export default DetalhesDespesaVariavel;
