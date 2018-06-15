import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import AutorBox from './Autor';


class App extends Component {
  constructor() {
    super();
    this.state = {lista : []};
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
                <AutorBox/>
             </article>
            </main>            
          );
   }
}

export default App;
