import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route,browserHistory, IndexLink } from 'react-router';
import AutorBox from './Autor';
import  Home from './Home';


ReactDOM.render(
    (<Router history={ browserHistory }>
        <Route component={ App }>
            <IndexLink path="/" component={ Home }/>
            <Route path="/Autor" component={ AutorBox }/>
            <Route path="/Livro"/>
        </Route>
      </Router>)
, document.getElementById('root'));
registerServiceWorker();
