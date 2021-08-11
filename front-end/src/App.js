import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/gerais/Header';
import Footer from './components/gerais/Footer';
import ListaMesAno from './components/mesAno/ListaMesAno';
import FormularioMesAno from './components/mesAno/FormularioMesAno';
import Inicio from './components/gerais/Inicio';
import ListaCategorias from './components/categorias/ListaCategorias';
import FormularioCategoria from './components/categorias/FormularioCategoria';
import ListaDespesasVariaveis from './components/despesaVariavel/ListaDespesasVariaveis';
import FormularioDespesaVariavel from './components/despesaVariavel/FormularioDespesaVariavel';
import DetalhesDespesaVariavel from './components/despesaVariavel/DetalhesDespesaVariavel';
import ListaDespesasFixas from './components/despesaFixa/ListaDespesaFixa';
import FormularioDespesaFixa from './components/despesaFixa/FormularioDespesaFixa';
import DetalhesDespesaFixa from './components/despesaFixa/DetalhesDespesaFixa';
import ListaReceitas from './components/receitas/ListaReceita';
import FormularioReceita from './components/receitas/FormularioReceita';
import DetalhesReceita from './components/receitas/DetalhesReceita';
import ListaGastos from './components/gastoGeral/ListaGastos';
import FormularioGastos from './components/gastoGeral/FormularioGastos';
import DetalhesGasto from './components/gastoGeral/DetalhesGasto';
import Estatisticas from './components/gerais/Estatisticas';

function App() {
  return (
    <div>
      <Router>
        <Header />
          <div className="container">
            <Switch>
              <Route path = "/" exact component = {Inicio} />
              <Route path = "/meses" component = {ListaMesAno} />
              <Route path = "/mes/form/:id" component = {FormularioMesAno} />
              <Route path = "/categorias" component = {ListaCategorias} />
              <Route path = "/categoria/form/:id" component = {FormularioCategoria} />
              <Route path = "/despesas-variaveis/:idMes" component = {ListaDespesasVariaveis} />
              <Route path = "/despesa-variavel/form/:id" component = {FormularioDespesaVariavel} />
              <Route path = "/detalhes-despesa-variavel/:id" component = {DetalhesDespesaVariavel} />
              <Route path = "/despesas-fixas/:idMes" component = {ListaDespesasFixas} />
              <Route path = "/despesa-fixa/form/:id" component = {FormularioDespesaFixa} />
              <Route path = "/detalhes-despesa-fixa/:id" component = {DetalhesDespesaFixa} />
              <Route path = "/receitas/:idMes" component = {ListaReceitas} />
              <Route path = "/receita/form/:id" component = {FormularioReceita}/>
              <Route path = "/detalhes-receita/:id" component = {DetalhesReceita} />
              <Route path = "/gastos/:idMes" component = {ListaGastos} />
              <Route path = "/gasto/form/:id" component = {FormularioGastos}/>
              <Route path = "/detalhes-gasto/:id" component = {DetalhesGasto}/>
              <Route path = "/gastos-categoria/:idMes" component = {Estatisticas} />
            </Switch>
          </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
