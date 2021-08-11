import React, { Component } from 'react';
import DropdownMesAno from '../mesAno/DropdownMesAno';
import DropdownCategorias from '../categorias/DropdownCategorias';
import GastoGeralService from '../../service/GastoGeralService';

class FormularioGastos extends Component {

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

        this.modificaDataCompra = this.modificaDataCompra.bind(this);
        this.modificaDescricao = this.modificaDescricao.bind(this);
        this.updateCategoria = this.updateCategoria.bind(this);
        this.updateMes = this.updateMes.bind(this);
        this.salvarRegistro = this.salvarRegistro.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '-1'){
            return
        } else {
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
    }

    modificaDataCompra = e => { this.setState({dataCompra: e.target.value}) }
    modificaDescricao = e => { this.setState({ descricao: e.target.value }) }
    updateCategoria = (categoriaSelecionada) => { this.setState({ categoria: categoriaSelecionada }) }
    modificaValor = e => {
        let valorDigitado = e.target.value.replace(',', '.').replace(/[^0-9.]/, '');
        this.setState({ valor: valorDigitado });
    }
    updateMes = mesSelecionado => { this.setState({ mesAno: mesSelecionado }) }
    cancelar = () => { this.props.history.push('/') }

    salvarRegistro(e){
        e.preventDefault();
        let gasto = {
            dataCompra: this.state.dataCompra,
            descricao: this.state.descricao,
            categoria: this.state.categoria,
            valor: this.state.valor,
            mesAno: this.state.mesAno
        }

        if (this.state.id === '-1'){
            GastoGeralService.adicionarGasto(gasto).then(() => {
                this.props.history.push(`/gastos/${this.state.mesAno.idMesAno}`);
            });
        } else {
            GastoGeralService.atualizarGasto(gasto, this.state.id).then(() => {
                this.props.history.push(`/gastos/${this.state.mesAno.idMesAno}`);
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
                                    <label htmlFor="dataCompra"><b>Data</b>:</label>
                                    <input onChange={this.modificaDataCompra} value={this.state.dataCompra} className="form-control" type="date" placeholder="Selecione a data"/>
                                    <br />

                                    <label htmlFor="descricao"><b>Descrição</b>:</label>
                                    <input value={this.state.descricao} onChange={this.modificaDescricao} className="form-control" type="text" name="descricao" placeholder="descrição" />
                                    <br />

                                    <DropdownCategorias onChange={this.updateCategoria} />
                                    <br />

                                    <label htmlFor="valor"><b>Valor</b>:</label>
                                    <input className="form-control" value={this.state.valor} onChange={this.modificaValor} type="text" name="valor" placeholder="R$" />
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

export default FormularioGastos;