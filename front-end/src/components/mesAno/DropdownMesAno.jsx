import React, { Component } from 'react';
import MesAnoService from '../../service/MesAnoService';

class DropdownMesAno extends Component {

    constructor(props){

        super(props)

        this.state = {
            meses: [],
            selecionado: {}
        }

        this.modificaValor = this.modificaValor.bind(this);
    }

    

    componentDidMount(){
        MesAnoService.getMeses().then((res) => {
                this.setState({ meses: res.data, selecionado: res.data[res.data.length-1] });
                this.props.onChange( res.data[res.data.length-1] );
        });
    }

    modificaValor = (e) => {
        this.setState({ selecionado: this.state.meses.find(mes => mes.descricao === e.target.value) });
        this.props.onChange( this.state.meses.find(mes => mes.descricao === e.target.value) );
    }

    render() {
        return (
            <>
                <label htmlFor="meses" className="form-label"><b>Mês</b>: </label>
                <select value={this.state.selecionado.descricao} name="meses" className="form-select" onChange={this.modificaValor}>
                    {
                        this.state.meses.map(
                            mes =>
                            <option key={mes.idMesAno} value={mes.descricao}>{mes.descricao}</option>
                        )
                    }
                </select>
            </>
        );
    }
}

export default DropdownMesAno;
