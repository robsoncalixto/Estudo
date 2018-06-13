import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import InputCustomizado from './componentes/InputCustomizado';
import SubmitCustomizado from './componentes/SubmitCustomizado';


class App extends Component {

  constructor(){
    super();
    this.state     = { lista: [], nome:'', email:'', senha:'' };
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome   = this.setNome.bind(this);
    this.setEmail  = this.setEmail.bind(this);
    this.setSenha  = this.setSenha.bind(this);
  }
    
  componentWillMount(){
    
    fetch('http://localhost:8080/api/autores',{
        method: 'GET',
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'
      }).then( data => data.json())
        .then( datajson => this.setState({lista:datajson}))
  }

  enviaForm(evento){
    evento.preventDefault();
    
 
    fetch('http://localhost:8080/api/autores',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome: this.state.nome , email: this.state.email, senha: this.state.senha })
    })
    .then( data => data.json())
    .then( response => this.setState({lista:response}))
    .catch(Error => console.error(Error));
  }

  setNome(evento){
    this.setState({nome:evento.target.value});
  }

  setEmail(evento){
    this.setState({email:evento.target.value});
  }

  setSenha(evento){
    this.setState({senha:evento.target.value});
  }
  
  render() {
    return (     
            <main id="layout">
              <a href="#menu" id="menuLink" className="menu-link"><span></span></a>
              <nav id="menu">
                  <div className="pure-menu">
                      <a className="pure-menu-heading" >Crud React</a>
                      <ul className="pure-menu-list">
                          <li className="pure-menu-item"><a className="pure-menu-link">Home</a></li>
                          <li className="pure-menu-item"><a  className="pure-menu-link">Autor</a></li>
                          <li className="pure-menu-item"><a  className="pure-menu-link">Livro</a></li>
                      </ul>
                  </div>
              </nav>
              <header id="main">
                  <div className="header">
                      <h1>Autor</h1>
                  </div>
              </header>
              <article className="content" id="content">
                <section className="pure-form pure-form-aligned">
                    <form className="pure-form pure-form-aligned" onSubmit= { this.enviaForm } method="POST">
                      
                      <InputCustomizado id="nome"  type="text"     name="nome"  value={this.state.nome}  onChange={this.setNome}  label="Nome"  />                                              
                      <InputCustomizado id="email" type="email"    name="email" value={this.state.email} onChange={this.setEmail} label="Email" />                                              
                      <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />  
                      <SubmitCustomizado type="submit" label="Gravar" />

                    </form>             
                  </section>  
                  <section>            
                      <table className="pure-table">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.lista.map( autor => {
                              return (
                                <tr key= { autor.id }>
                                  <td>{autor.nome}</td>
                                  <td>{autor.email}</td>
                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table> 
                  </section>             
             </article>
            </main>            
          );
   }
}

export default App;
