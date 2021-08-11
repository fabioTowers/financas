import React, { Component } from 'react';
import ReceitaService from '../../service/ReceitaService';
import MesAnoService from '../../service/MesAnoService';

class ListaReceitas extends Component {

    constructor(props){

        super(props)

        this.state = {
            receitas: [],
            idMes: this.props.match.params.idMes
        }

        this.adicionarReceita = this.adicionarReceita.bind(this);
        this.editarRegistro = this.editarRegistro.bind(this);
    }

    componentDidMount(){
        MesAnoService.getMesById(this.state.idMes).then(r => {
            ReceitaService.getReceitaByMes(r.data).then((res) => {
                this.setState({ receitas:  res.data});
            });
        });
    }

    adicionarReceita(){
        this.props.history.push('/receita/form/-1');
    }

    editarRegistro(id){
        this.props.history.push(`/receita/form/${id}`);
    }

    detalhesRegistro(id){
        this.props.history.push(`/detalhes-receita/${id}`);
    }
    deletarRegistro(id){
        ReceitaService.deletarReceita(id).then(res => {
            this.setState({receitas: this.state.receitas.filter(receita => receita.id !== id)});
        });
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Receitas</h2>
                <div className="row" style={{padding: "10px"}}>
                    <button style={{width: "180px"}} className="btn btn-primary" onClick={this.adicionarReceita}>Adicionar registro</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Fonte</th>
                                <th>Valor</th>
                                <th>Descrição</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.receitas.map(
                                    receita =>
                                        <tr key={`${receita.id}`}>
                                            <td>{receita.fonte}</td>
                                            <td>{receita.valor}</td>
                                            <td>{receita.descricao}</td>
                                            <td>
                                                <button onClick={ () => this.editarRegistro(receita.id) } className="btn btn-info">Editar</button>
                                                <button onClick={ () => this.detalhesRegistro(receita.id) } style={{marginLeft: "10px"}} className="btn btn-info">Detalhes</button>
                                                <button onClick={ () => this.deletarRegistro(receita.id) } style={{marginLeft: "10px"}} className="btn btn-danger">Excluir</button>
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

export default ListaReceitas;
