import React, { Component } from 'react';
import MesAnoService from '../../service/MesAnoService'

class ListaMesAno extends Component {

    constructor(props) {
        super(props)

        this.state = {
            meses: []
        }
        this.adicionarMes = this.adicionarMes.bind(this);
        this.editarRegistro = this.editarRegistro.bind(this);
        this.deletarRegistro = this.deletarRegistro.bind(this);
    }

    deletarRegistro(id){
        // chamada a REST API
        MesAnoService.deletarMes(id).then( res => {
            this.setState({meses: this.state.meses.filter(mes => mes.idMesAno !== id)});
        });
    }

    /**
     * componentDidMount é chamado assim que o 
     * componente é renderizado
     */
    componentDidMount(){
        MesAnoService.getMeses().then((res) => {
            this.setState({ meses: res.data });
        });
    }

    adicionarMes(){
        this.props.history.push('/mes/form/-1');
    }

    editarRegistro( id ){
        this.props.history.push(`/mes/form/${id}`);
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Meses</h2>
                <div className="row" style={{padding: "10px"}}>
                    <button style={{width: "180px"}} className="btn btn-primary" onClick={this.adicionarMes}>Adicionar registro</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                               <th>Mês</th>
                               <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.meses.map(
                                    mes => 
                                        <tr key={`${mes.idMesAno}`}>
                                            <td>{mes.descricao}</td>
                                            <td>
                                                <button onClick={ () => this.editarRegistro(mes.idMesAno)} className="btn btn-info">Editar</button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deletarRegistro(mes.idMesAno)} className="btn btn-danger"> Deletar </button>
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

export default ListaMesAno;
