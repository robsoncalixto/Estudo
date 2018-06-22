import React, { Component } from 'react';
import InputCustomizado from './componentes/InputCustomizado';
import SubmitCustomizado from './componentes/SubmitCustomizado';
import PubSub from 'pubsub-js';
import TrataErros from './TrataErros';



class FormularioLivro extends Component{
    constructor() {
        super();
        this.state = {titulo:'',preco:'',autorID:''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
      }
   
      enviaForm(evento){
            evento.preventDefault();
            
            PubSub.publish("limpa-erros",{});

            fetch('http://localhost:8080/api/livros',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({titulo:this.state.titulo,preco:this.state.preco,autorId:this.state.autorId})
            })
            .then( data => data.json())
            .then( response => {
                console.log(response);
                if(response.status === 400)
                    throw response;

                PubSub.publish('novaListaAutor',response);
                this.setState({titulo:'',preco:'',autorId:''});
                
            }).catch(Error =>  new TrataErros().publicaErros(Error));
        }
    
        setTitulo(evento){
            this.setState({titulo:evento.target.value});
        }
          
        setPreco(evento){
            this.setState({preco:evento.target.value});
        }
          
        setAutorId(evento){
            this.setState({autorId:evento.target.value});
        }

      render(){
          return(
            <section className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit= { this.enviaForm } method="POST">
                    
                    <InputCustomizado id="titulo"   type="text"     name="titulo"  value={this.state.titulo}  onChange={this.setTitulo}  label="Titulo"  />                                              
                    <InputCustomizado id="preco"    type="text"     name="preco"   value={this.state.preco}   onChange={this.setPreco}   label="Preco" />                                              
                    
                    <div className="pure-control-group">
                        <label htmlFor={this.props.id}>{this.props.label}</label>
                            <select value={this.state.autorId} name="autorId" id="autorID" onChange={this.setAutorId}>
                                <option value="">Selecione autor</option>
                                {
                                    this.props.autores.map( (autor) =>  <option key={ autor.id } value={autor.id}>{autor.nome}</option>)
                                }
                            </select>                                           
                    </div>                   
                    
                    <SubmitCustomizado type="submit" label="Gravar" />
                
                </form>             
            </section>  
          )
      }
}


class TabelaLivros extends Component{

    render(){
        return(
           <section>            
                <table className="pure-table">
                    <thead>
                        <tr>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.props.lista.map( livro => {
                            return (
                            <tr key={ livro.id }>
                                <td>{livro.titulo}</td>
                                <td>{livro.preco}</td>
                                <td>{livro.autor.nome}</td>
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

export default class LivroBox extends Component {
    constructor() {
        super();
        this.state = {lista: [], autores: []};
    }
    
    componentWillMount(){
      
        fetch('http://localhost:8080/api/livros',{
              method: 'GET',
              headers: new Headers(),
              mode: 'cors',
              cache: 'default'
            }).then( data => data.json())
              .then( datajson => this.setState({lista:datajson}));

        fetch('http://localhost:8080/api/autores',{
                method: 'GET',
                headers: new Headers(),
                mode: 'cors',
                cache: 'default'
              }).then( data => data.json())
                .then( datajson => this.setState({autores:datajson}));      

        PubSub.subscribe('novaListaAutor', (topico, novaListaAutor) => this.setState({lista:novaListaAutor}) );
    }

    render(){
      return (
        <div>
          <div className="header">
            <h1>Cadastro de livros</h1>
          </div>
          <div className="content" id="content">
                    <FormularioLivro autores={ this.state.autores }/>
                    <TabelaLivros lista={ this.state.lista }/>
                </div>
        </div>
      );
    }   
  }