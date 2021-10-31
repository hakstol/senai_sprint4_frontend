import logo from './logo.svg';
import './App.css';
import { Component } from 'react'

class GitHub extends Component {
  constructor(props) {
    super(props)
    this.state =
    {
      listaRepositorios : [],
      nome : ''
    }
  }

  buscarRepositorios = (conta) => {
    conta.preventDefault();
    fetch('https://api.github.com/users/' + this.state.nome + '/repos?per_page=10')
      .then(resposta => resposta.json())
      .then(dados => this.setState({ listaRepositorios: dados }))
      .catch(erro => console.log(erro))
  }

  atualizar = async  (Nome) => {
    await this.setState({ nome : Nome.target.value })
    console.log(this.state.nome)
  }
  render() 
  {
    return (
    <div className="App">
      <main>
        <section>
        <form onSubmit={this.buscarRepositorios}>
          <input type="text" value={this.state.nome} onChange={this.atualizar} placeholder="Insira o nome da conta desejada"></input>
          <button type="submit" onClick={() => this.buscarRepositorios}>Buscar</button>
        </form>
        </section>
        <section>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Data de Criação</th>
                <th>Tamanho</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listaRepositorios.map((repositorio) => {
                console.log(repositorio);
                return (
                  <tr key={repositorio.id}>
                    <td>{repositorio.id}</td>
                    <td>{repositorio.name}</td>
                    <td>{repositorio.description}</td>
                    <td>{repositorio.created_at}</td>
                    <td>{repositorio.size}</td>
                  </tr>
                )
              })
              }
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
}
export default GitHub;
