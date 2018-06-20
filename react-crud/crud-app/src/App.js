import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import { Link } from 'react-router';

class App extends Component {
  constructor() {
    super();
    this.state = {lista : []};
  }
  render() {
    return (     
            <main id="layout">
              <a href="/" id="menuLink" className="menu-link"><span></span></a>
              <nav id="menu">
                  <div className="pure-menu">
                      <a className="pure-menu-heading" >Crud React</a>
                      <ul className="pure-menu-list">
                          <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                          <li className="pure-menu-item"><Link to="/Autor" className="pure-menu-link">Autor</Link></li>
                          <li className="pure-menu-item"><Link to="/Livro" className="pure-menu-link">Livro</Link></li>
                      </ul>
                  </div>
              </nav>
              <div id="main">
                {this.props.children}   
              </div>
             </main>            
          );
   }
}

export default App;
