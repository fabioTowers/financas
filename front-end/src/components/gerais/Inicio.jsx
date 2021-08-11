import React, { Component } from 'react';
import DropdownMesAno from '../mesAno/DropdownMesAno'

class Inicio extends Component {

    constructor(props){
        super(props)

        this.state = {
            mesAno: {}
        }

        this.verTodosMeses = this.verTodosMeses.bind(this);
        this.verTodasCategorias = this.verTodasCategorias.bind(this);
        this.verTodasDespesasVariaveis = this.verTodasDespesasVariaveis.bind(this);
        this.verTodasDespesasFixas = this.verTodasDespesasFixas.bind(this);
        this.verTodasReceitas = this.verTodasReceitas.bind(this);
        this.updateMes = this.updateMes.bind(this);
        this.verGastosPorCategoria = this.verGastosPorCategoria.bind(this);
    }

    

    verTodosMeses = (e) => {
        this.props.history.push('/meses');
    }

    verTodasCategorias(e){
        this.props.history.push('/categorias');
    }
    

    verTodosGastos = () => { this.props.history.push(`/gastos/${this.state.mesAno.idMesAno}`) }
    verTodasDespesasFixas = () => { this.props.history.push(`/despesas-fixas/${this.state.mesAno.idMesAno}`) }
    verTodasDespesasVariaveis = () => { this.props.history.push(`/despesas-variaveis/${this.state.mesAno.idMesAno}`) }
    verTodasReceitas = () => { this.props.history.push(`/receitas/${this.state.mesAno.idMesAno}`) }
    verGastosPorCategoria = () => { this.props.history.push(`/gastos-categoria/${this.state.mesAno.idMesAno}`) }

    updateMes = mesSelecionado => {
        this.setState({ mesAno: mesSelecionado });
    }

    render() {
        return (
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-sm-4">
                        <DropdownMesAno onChange={this.updateMes} />
                    </div>
                    <div className="col-sm-8">
                        <br />
                        <p>Ao clicar nos <i>cards</i> abaixo serão exibidos os registros referentes ao mês que está atualmente selecionado.</p>
                    </div>
                </div>
                <br />
                <br />
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title text-center">Receitas</h5>
                                <p className="card-text">Insira aqui suas fontes de renda no mês como salário, rendimentos, alugueis etc.</p>
                                <br />
                                <button style={{width: "200px"}} className="btn btn-success" onClick={this.verTodasReceitas} >Acessar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title text-center">Gastos em geral</h5>
                                <p className="card-text">Nessa categoria são contabilizados os gastos do dia a dia que são eventuais como o cafézinho na padaria ou uma pizza no sábado a noite.</p>
                                <button style={{width: "200px"}} className="btn btn-success" onClick={this.verTodosGastos} >Acessar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title text-center">Despesas Variáveis</h5>
                                <p className="card-text">Aqui você insere os gastos que tem todo mês e o valor oscila conforme o consumo (não possuem uma taxa fixa) como conta de energia elétrica, alimentação etc.</p>
                                <button style={{width: "200px"}} className="btn btn-success" onClick={this.verTodasDespesasVariaveis} >Acessar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title text-center">Despesas Fixas</h5>
                                <p className="card-text">São os gastos previstos mensalmente em que o valor pago é sempre mesmo como a mensalidade da internet, parcela do imóvel etc.</p>
                                <br />
                                <button style={{width: "200px"}} className="btn btn-success" onClick={this.verTodasDespesasFixas} >Acessar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title text-center">Gastos por categoria</h5>
                                <p className="card-text">Todos os gastos e despesas (fixas e variáveis) estão relacionadas a uma categoria. Aqui você pode consultar quanto já gastou até o momento no mês em cada categoria.</p>
                                <button style={{width: "200px"}} className="btn btn-success" onClick={this.verGastosPorCategoria} >Acessar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title text-center">Categorias</h5>
                                <p className="card-text">Consultar, editar e cadastrar novas categorias de gastos e despesas.</p>
                                <br />
                                <br />
                                <button style={{width: "200px"}} className="btn btn-success" onClick={this.verTodasCategorias} >Acessar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h5 className="card-title text-center">Histórico</h5>
                                <p className="card-text">Consultar os meses já cadastrados no banco ou inserir um novo registro de mês.</p>
                                <button style={{width: "200px"}} className="btn btn-success" onClick={this.verTodosMeses}>Acessar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<button style={{width: "200px"}} className="btn btn-success" onClick={this.verTodosMeses}>Ver todos os meses</button>
                <br/>
                <br/>
                <button style={{width: "200px"}} className="btn btn-success" onClick={this.verTodasCategorias} >Ver todas as categorias</button>
                <br/>
                <br/>
                <button style={{width: "200px"}} className="btn btn-success" onClick={this.verTodasDespesasVariaveis} >Ver todas as despesas variáveis</button>
                <br/>
                <br/>
                <button style={{width: "200px"}} className="btn btn-success" onClick={this.verTodasDespesasFixas} >Ver todas as despesas fixas</button>
                <br/>
                <br/>
                <button style={{width: "200px"}} className="btn btn-success" onClick={this.verTodasReceitas} >Ver todas as receitas</button>
                <br/>
                <br/>
                <button style={{width: "200px"}} className="btn btn-success" onClick={this.verTodosGastos} >Ver todos os gastos</button>
                <br/>
                <br/>
                <button style={{width: "200px"}} className="btn btn-success" onClick={this.verGastosPorCategoria} >Gastos por categoria</button>*/}
                <br/>
                <br/>
            </div>
        );
    }
}

export default Inicio;
