import React, { Component } from 'react';
import DespesaFixaService from '../../service/DespesaFixaService';
import DropdownMesAno from '../mesAno/DropdownMesAno';
import DropdownCategorias from '../categorias/DropdownCategorias';

class FormularioDespesaFixa extends Component {

    constructor(props){

        super(props)

        this.state = {
            id: this.props.match.params.id,
            descricao: '',
            categoria: {},
            valor: 0.0,
            status: 'PAGAMENTO PENDENTE',
            dataPagamento: '',
            observacao: '',
            mesAno: {}
        }

        this.modificaDescricao = this.modificaDescricao.bind(this);
        this.updateCategoria = this.updateCategoria.bind(this);
        this.modificaValor = this.modificaValor.bind(this);
        this.modificaStatus = this.modificaStatus.bind(this);
        this.modificaDataPagamento = this.modificaDataPagamento.bind(this);
        this.updateMes = this.updateMes.bind(this);
        this.modificaObservacao = this.modificaObservacao.bind(this);
        this.salvarRegistro = this.salvarRegistro.bind(this);
    }

    componentDidMount(){
        if( this.state.id === '-1' ){
            return
        } else {
            DespesaFixaService.getDespesaFixaById(this.state.id).then((res) => {
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
    }

    modificaDescricao = (e) => {
        this.setState({descricao: e.target.value});
    }

    updateCategoria(categoriaSelecionada){
        this.setState({ categoria: categoriaSelecionada });
    }
    
    modificaValor = (e) => {
        this.setState({ valor: e.target.value });
    }

    modificaStatus = (e) => {
        let valorDigitado = e.target.value.replace(',', '.').replace(/[^0-9.]/, '');
        this.setState({status: valorDigitado});
    }

    modificaDataPagamento = (e) => {
        this.setState({dataPagamento: e.target.value});
    }

    modificaObservacao = (event) => {
        this.setState({observacao: event.target.value});
    }

    updateMes(mesSelecionado){
        this.setState({ mesAno: mesSelecionado });
    }

    salvarRegistro = (e) => {
        e.preventDefault();
        let despesaFixa = {
            descricao: this.state.descricao,
            categoria: this.state.categoria,
            valor: this.state.valor,
            status: this.state.status,
            dataPagamento: this.state.dataPagamento,
            observacao: this.state.observacao,
            mesAno: this.state.mesAno
        }

        if (this.state.id === '-1'){
            DespesaFixaService.adicionarDespesaFixa(despesaFixa).then(res => {
                this.props.history.push(`/despesas-fixas/${this.state.mesAno.idMesAno}`);
            });
        } else {
            DespesaFixaService.atualizarDespesaFixa(despesaFixa, this.state.id).then( res => {
                this.props.history.push(`/despesas-fixas/${this.state.mesAno.idMesAno}`);
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
                            <h3 className="text-center">{(this.state.id === '-1') ? ('Adicionar Registro') : ('Editar Registro')}</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="descricao"><b>Descrição</b>: </label>
                                        <input className="form-control" value={this.state.descricao} onChange={this.modificaDescricao} typeof="text" name="descricao" placeholder="descrição"/>
                                        <br />

                                        <DropdownCategorias onChange={this.updateCategoria} />
                                        <br />

                                        <label htmlFor="valor"><b>Valor:</b> </label>
                                        <input className="form-control" value={this.state.valor} onChange={this.modificaValor} typeof="text" name="valor" placeholder="R$"/>
                                        <br />

                                        <label htmlFor="status"><b>Status</b>: </label>
                                        <select className="form-select" value={this.state.status} onChange={this.modificaStatus} name="status" id="">
                                            <option value="PAGAMENTO PENDENTE">PAGAMENTO PENDENTE</option>
                                            <option value="PAGO">PAGO</option>
                                            <option value="PAGAMENTO DISPENSADO">PAGAMENTO DISPENSADO</option>
                                        </select>
                                        <br />

                                        <label htmlFor="dataPagamento"><b>Data do Pagamento</b>: </label>
                                        <input className="form-control" value={this.state.dataPagamento} onChange={this.modificaDataPagamento} type="date" name="dataPagamento" placeholder="Data do pagamento" />
                                        <br />

                                        <label htmlFor="observacao"><b>Observação</b>: </label>
                                        <textarea className="form-control" value={this.state.observacao} onChange={this.modificaObservacao} typeof="text" name="observacao" placeholder="..."></textarea>
                                        <br />
                                        
                                        <DropdownMesAno onChange={this.updateMes} mes={this.state.mesAno} />
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

export default FormularioDespesaFixa;
