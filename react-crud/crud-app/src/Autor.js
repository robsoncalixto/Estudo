import React, { Component } from 'react';
import InputCustomizado from './componentes/InputCustomizado';
import SubmitCustomizado from './componentes/SubmitCustomizado';
import PubSub from 'pubsub-js';
import TrataErros from './TrataErros';


class FormularioAutor extends Component{
    constructor(){
        super();
        this.state     = { nome:'', email:'', senha:'' };
        this.enviaForm = this.enviaForm.bind(this);
        this.salvaAlteracao = this.salvaAlteracao.bind(this);
      }
   
      enviaForm(evento){
            evento.preventDefault();
            
            PubSub.publish("limpa-erros",{});

            fetch('http://localhost:8080/api/autores',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: this.state.nome , email: this.state.email, senha: this.state.senha })
            })
            .then( data => data.json())
            .then( response => {
                console.log(response);
                if(response.status === 400)
                    throw response;

                PubSub.publish('novaLista',response);
                this.setState({nome:'',email:'',senha:''});
                
            }).catch(Error =>  new TrataErros().publicaErros(Error));
        }
    
        salvaAlteracao(input,evento){
            var field = [];
            field[input] = evento.target.value;
            this.setState(field);
        }

      render(){
          return(
            <section className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit= { this.enviaForm } method="POST">
                    <InputCustomizado id="nome"  type="text"     name="nome"  value={this.state.nome}  onChange={this.salvaAlteracao.bind(this,'nome')}  label="Nome"  />                                              
                    <InputCustomizado id="email" type="email"    name="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this,'email')} label="Email" />                                              
                    <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.salvaAlteracao.bind(this,'senha')} label="Senha" />  
                    <SubmitCustomizado type="submit" label="Gravar" />
                </form>             
            </section>  
          )
      }
}


class TabelaAutores extends Component{

    render(){
        return(
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
                        this.props.lista.map( autor => {
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
        )
    }
}

export default class AutorBox extends Component {
    constructor() {
        super();
        this.state = {lista: []};
    }
      
    componentWillMount(){
      
        fetch('http://localhost:8080/api/autores',{
              method: 'GET',
              headers: new Headers(),
              mode: 'cors',
              cache: 'default'
            }).then( data => data.json())
              .then( datajson => this.setState({lista:datajson}));

        PubSub.subscribe('novaLista', (topico, novaLista) => this.setState({lista:novaLista}) );
       }

   
    
    render(){
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de autores</h1>
                </div>
                <div className="content" id="content">
                    <FormularioAutor/>
                    <TabelaAutores lista={this.state.lista}/>
                </div>
            </div>
        );
    }
}