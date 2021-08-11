import React, { Component } from 'react';
import EstatisticasService from '../../service/EstatisticasService';
import MesAnoService from '../../service/MesAnoService';

class Estatisticas extends Component {

    constructor(props){

        super(props)

        this.state = {
            gastosPorCategoria: [],
            idMes: this.props.match.params.idMes
        }

        this.updateMes = this.updateMes.bind(this);
    }

    componentDidMount(){
        MesAnoService.getMesById(this.state.idMes).then(r => {
            EstatisticasService.getGastosCategoriaByMes(r.data).then(res => {
                this.setState({ gastosPorCategoria: res.data });
            });
        });
    }

    updateMes = mesSelecionado => {
        this.setState({ mesAno: mesSelecionado });
    }

    render(){
        return (
            <div className="container">
                <h2 className="text-center">Total gasto por categoria</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Categoria</th>
                                <th>Total gasto (R$)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.gastosPorCategoria.map(
                                    categoria => <tr key={categoria.descricao}>
                                        <td>{categoria.descricao}</td>
                                        <td>{categoria.valor}</td>
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

export default Estatisticas;
