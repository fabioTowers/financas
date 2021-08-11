import React, { Component } from 'react';
import ReceitaService from '../../service/ReceitaService';

class DetalhesReceita extends Component {

    constructor(props) {

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

        this.voltar = this.voltar.bind(this);
        this.editarRegistro = this.editarRegistro.bind(this);
    }

    componentDidMount(){
        ReceitaService.getReceitaById(this.state.id).then( res => {
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

    voltar = () => { this.props.history.push(`/receitas/${this.state.mesAno.idMesAno}`) }

    editarRegistro = (id) => { this.props.history.push(`/receita/form/${id}`) }

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
                            <p><b>Fonte</b>: {this.state.fonte}</p>
                        </div>
                        <div className="row">
                            <p><b>Data do recebimento</b>: {this.state.dataRecebimento}</p>
                        </div>
                        <div className="row">
                            <p><b>Valor</b>: R$ {this.state.valor}</p>
                        </div>
                        <div className="row">
                            <p><b>Mês</b>: {this.state.mesAno.descricao}</p>
                        </div>
                        <div className="row">
                            <p><b>Observações</b>: {this.state.observacao}</p>
                        </div>
                        <br />
                        <br />

                        <button className="btn btn-success" onClick={this.voltar}>Voltar</button>
                        <button onClick={ () => this.editarRegistro(this.state.id) } className="btn btn-success"  style={{marginLeft: "10px"}}>Editar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetalhesReceita;
