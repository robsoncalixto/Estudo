import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AutorBox from './Autor';
import  Home from './Home';
import LivroBox from './Livro';
import { Router, Route,browserHistory, IndexLink } from 'react-router';

ReactDOM.render(
    (<Router history={ browserHistory }>
        <Route component={ App }>
            <IndexLink path="/" component={ Home }/>
            <Route path="/Autor" component={ AutorBox }/>
            <Route path="/Livro" component={ LivroBox }/>
        </Route>
      </Router>)
, document.getElementById('root'));
registerServiceWorker();
