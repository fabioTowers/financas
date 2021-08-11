import React, { Component } from 'react';
import ReceitaService from '../../service/ReceitaService';
import DropdownMesAno from '../mesAno/DropdownMesAno';

class FormularioReceita extends Component {

    constructor(props){

        super(props)

        this.state = {
            id: this.props.match.params.id,
            descricao: '',
            fonte: '',
            dataRecebimento: '',
            valor: 0.0,
            mesAno: {},
            observacao: ''
        }

        this.modificaDescricao = this.modificaDescricao.bind(this);
        this.modificaFonte = this.modificaFonte.bind(this);
        this.modificaDataRecebimento = this.modificaDataRecebimento.bind(this);
        this.modificaValor = this.modificaValor.bind(this);
        this.modificaObservacao = this.modificaObservacao.bind(this);
        this.updateMes = this.updateMes.bind(this);
        this.salvarRegistro = this.salvarRegistro.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '-1'){
            return
        } else {
            ReceitaService.getReceitaById(this.state.id).then((res) => {
                let receita = res.data;
                this.setState({
                    descricao: receita.descricao,
                    fonte: receita.fonte,
                    dataRecebimento: receita.dataRecebimento,
                    valor: receita.valor,
                    mesAno: receita.mesAno,
                    observacao: receita.observacao
                });
            });
        }
    }

    modificaDescricao = (e) => {
        this.setState({ descricao: e.target.value });
    }

    modificaFonte = e => {
        this.setState({ fonte: e.target.value });
    }

    modificaDataRecebimento = e => {
        this.setState({ dataRecebimento: e.target.value });
    }

    modificaValor = e => {
        this.setState({ valor: e.target.value });
    }

    modificaObservacao = e => {
        this.setState({ observacao: e.target.value });
    }

    updateMes = mesSelecionado => {
        this.setState({ mesAno: mesSelecionado });
    }

    cancelar = () => { this.props.history.push('/') }

    salvarRegistro(e){
        e.preventDefault();
        let receita = {
            descricao: this.state.descricao,
            fonte: this.state.fonte,
            dataRecebimento: this.state.dataRecebimento,
            valor: this.state.valor,
            mesAno: this.state.mesAno,
            observacao: this.state.observacao
        }

        if (this.state.id === '-1'){
            ReceitaService.adicionarReceita(receita).then((res) => {
                this.props.history.push(`/receitas/${this.state.mesAno.idMesAno}`);
            });
        } else {
            ReceitaService.atualizarReceita(receita, this.state.id).then( res => {
                this.props.history.push(`/receitas/${this.state.mesAno.idMesAno}`);
            });
        }
    }

    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">{(this.state.id === '-1') ? ('Adicionar Registro') : ('Editar Registro')}</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="descricao"><b>Descrição</b>:</label>
                                        <input className="form-control" value={this.state.descricao} onChange={this.modificaDescricao} type="text" name="descricao" placeholder="descrição"/>
                                        <br />

                                        <label htmlFor="fonte"><b>Fonte</b>:</label>
                                        <input className="form-control" value={this.state.fonte} onChange={this.modificaFonte} type="text" nema="fonte" placeholder="Fonte"/>
                                        <br />

                                        <label htmlFor="dataRecebimento"><b>Data do recebimento</b>:</label>
                                        <input className="form-control" onChange={this.modificaDataRecebimento} value={this.state.dataRecebimento} type="date" name="dataRecebimento" placeholder="Selecione a data"/>
                                        <br />

                                        <label htmlFor="valor"><b>Valor</b>:</label>
                                        <input className="form-control" value={this.state.valor} onChange={this.modificaValor} type="text" name="valor" placeholder="R$" />
                                        <br />

                                        <label htmlFor="observacao"><b>Observações</b>:</label>
                                        <textarea onChange={this.modificaObservacao} type="text" className="form-control" value={this.state.observacao} name="observacao" placeholder="..."></textarea>
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

export default  FormularioReceita;
