import React, { Component } from 'react';
import DespesaVariavelService from '../../service/DespesaVariavelService';
import DropdownMesAno from '../mesAno/DropdownMesAno';
import DropdownCategorias from '../categorias/DropdownCategorias';

class FormularioDespesaVariavel extends Component {

    constructor(props){

        super(props)

        this.state = {
            id: this.props.match.params.id,
            descricao: '',
            categoria: {
                id: null,
                descricao: '',
                dataCriacao: ''
            },
            valorPlanejado: 0.0,
            valorPago: 0.0,
            status: 'PAGAMENTO PENDENTE',
            dataPagamento: '',
            observacao: '',
            mesAno: {}
        } // fim do set state

        this.updateMes = this.updateMes.bind(this);
        this.updateCategoria = this.updateCategoria.bind(this);
        this.modificaDescricao = this.modificaDescricao.bind(this);
        this.modificaValorPlanejado = this.modificaValorPlanejado.bind(this);
        this.modificaValorPago = this.modificaValorPago.bind(this);
        this.modificaDataPagamento = this.modificaDataPagamento.bind(this);
        this.modificaObservacao = this.modificaObservacao.bind(this);
        this.salvarRegistro = this.salvarRegistro.bind(this);
        this.modificaStatus = this.modificaStatus.bind(this);

    }// fim do construtor

    componentDidMount(){
        if( this.state.id === '-1'){
            return
        } else {
            DespesaVariavelService.getDespesaVariavelById(this.state.id).then((res) => {
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
    }

    updateMes(mesSelecionado){
        this.setState({ mesAno: mesSelecionado });
    }

    updateCategoria(categoriaSelecionada){
        this.setState({ categoria: categoriaSelecionada });
    }

    modificaDescricao = (event) => {
        this.setState({descricao: event.target.value});
    }

    modificaValorPlanejado = (e) => {
        let valorDigitado = e.target.value.replace(',', '.').replace(/[^0-9.]/, '');
        this.setState({valorPlanejado: valorDigitado});
    }

    modificaValorPago = (e) => {
        let valorDigitado = e.target.value.replace(',', '.').replace(/[^0-9.]/, '');
        this.setState({valorPago: valorDigitado});
    }

    modificaDataPagamento = (event) => {
        this.setState({dataPagamento: event.target.value});
    }

    modificaObservacao = (event) => {
        this.setState({observacao: event.target.value});
    }

    modificaStatus = (event) => {
        this.setState({status: event.target.value});
    }

    salvarRegistro = (e) => {
        e.preventDefault();
        let despesaVariavel = {
            descricao: this.state.descricao,
            categoria: this.state.categoria,
            valorPlanejado: this.state.valorPlanejado,
            valorPago: this.state.valorPago,
            status: this.state.status,
            dataPagamento: this.state.dataPagamento,
            observacao: this.state.observacao,
            mesAno: this.state.mesAno
        }

        console.log('Descrição: ' + despesaVariavel.descricao);
        console.log('Categoria: ' + despesaVariavel.categoria.descricao);
        console.log('Valor Planejado: ' + despesaVariavel.valorPlanejado);
        console.log('Valor Pago: ' + despesaVariavel.valorPago);
        console.log('Status: ' + despesaVariavel.status);
        console.log('Data do Pagamento: ' + despesaVariavel.dataPagamento);
        console.log('Observação: ' + despesaVariavel.observacao);
        console.log('Mes: ' + despesaVariavel.mesAno.descricao);

        if( this.state.id === '-1'){
            DespesaVariavelService.adicionarDespesaVariavel(despesaVariavel).then(res => {
                this.props.history.push(`/despesas-variaveis/${this.state.mesAno.idMesAno}`);
            });
        } else {
            DespesaVariavelService.atualizarDespesaVariavel(despesaVariavel, this.state.id).then( res => {
                this.props.history.push(`/despesas-variaveis/${this.state.mesAno.idMesAno}`)
            });
        }
    }



    cancelar(){
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center"> {(this.state.id === '-1') ? ('Adicionar Registro') : ('Editar Registro')} </h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="descricao"><b>Descrição</b>: </label>
                                        <input className="form-control" value={this.state.descricao} onChange={this.modificaDescricao} typeof="text" name="descricao" placeholder="descrição" />
                                        <br />

                                        <DropdownCategorias onChange={this.updateCategoria}/>
                                        <br />

                                        <label htmlFor="valorPlanejado"><b>Valor Planejado</b>: </label>
                                        <input className="form-control" value={this.state.valorPlanejado} onChange={this.modificaValorPlanejado} typeof="text" name="valorPlanejado" placeholder="R$" />
                                        <br />

                                        <label htmlFor="valorPago"><b>Valor Pago</b>: </label>
                                        <input className="form-control" value={this.state.valorPago} onChange={this.modificaValorPago} typeof="text" name="valorPago" placeholder="R$" />
                                        <br />

                                        <label htmlFor="status"><b>Status</b>: </label>
                                        <select className="form-select" value={this.state.status} onChange={this.modificaStatus} name="status">
                                        <option value="PAGAMENTO PENDENTE">PAGAMENTO PENDENTE</option>
                                            <option value="PAGO">PAGO</option>
                                            <option value="PAGAMENTO DISPENSADO">PAGAMENTO DISPENSADO</option>
                                        </select>
                                        <br />

                                        <label htmlFor="dataPagamento"><b>Data do pagamento</b>: </label>
                                        <input className="form-control" value={this.state.dataPagamento} onChange={this.modificaDataPagamento} type="date" name="dataPagamento" placeholder="data do pagamento"/>
                                        <br />

                                        <label htmlFor="observacao"><b>Observação</b>: </label>
                                        <textarea className="form-control" value={this.state.observacao} onChange={this.modificaObservacao} typeof="text" name="observacao" placeholder="..."></textarea>
                                        <br />

                                        <DropdownMesAno onChange={this.updateMes} mes={this.state.mesAno}/>
                                        <br />

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

export default FormularioDespesaVariavel;
