import React from 'react';
import ReactDOM from 'react-dom';
import './static/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
