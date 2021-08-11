import React, { Component } from 'react';
import CategoriaService from '../../service/CategoriaService';

class DropdownCategorias extends Component {

    constructor(props){

        super(props)

        this.state = {
            categorias: [],
            selecionado: {}
        }

        this.modificaValor = this.modificaValor.bind(this);
    }

    componentDidMount(){
        CategoriaService.getCategorias().then((res) => {
                this.setState({ categorias: res.data, selecionado: res.data[res.data.length-1] });
                this.props.onChange(this.state.selecionado);
        });
    }

    modificaValor = (e) => {
        this.setState({selecionado: this.state.categorias.find(categoria => categoria.descricao === e.target.value)});
        this.props.onChange(this.state.categorias.find(categoria => categoria.descricao === e.target.value));
    }

    render() {
        return (
            <>
                <label htmlFor="categorias" className="form-label"><b>Categoria</b>: </label>
                <select value={this.state.selecionado.descricao} name="categorias" className="form-select" onChange={this.modificaValor}>
                    {
                        this.state.categorias.map(
                            categoria =>
                            <option key={`${categoria.idCategoria}`} value={categoria.descricao}>{categoria.descricao}</option>
                        )
                    }
                </select>
            </>
        );
    }
}

export default DropdownCategorias;
