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
        this.setNome   = this.setNome.bind(this);
        this.setEmail  = this.setEmail.bind(this);
        this.setSenha  = this.setSenha.bind(this);
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
    
      setNome(evento){
        this.setState({nome:evento.target.value});
      }
    
      setEmail(evento){
        this.setState({email:evento.target.value});
      }
    
      setSenha(evento){
        this.setState({senha:evento.target.value});
      }
      render(){
          return(
            <section className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit= { this.enviaForm } method="POST">
                    <InputCustomizado id="nome"  type="text"     name="nome"  value={this.state.nome}  onChange={this.setNome}  label="Nome"  />                                              
                    <InputCustomizado id="email" type="email"    name="email" value={this.state.email} onChange={this.setEmail} label="Email" />                                              
                    <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />  
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
                <FormularioAutor/>
                <TabelaAutores lista={this.state.lista} />     
            </div>
        );
    }
}