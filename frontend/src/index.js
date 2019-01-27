/* import ES6Promise from 'es6-promise'; */
/* import { polyfill } from 'es6-promise';  */
import 'react-app-polyfill/ie11';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider} from 'react-redux';
import {createStore} from 'redux';


import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer';

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
console.log(process.env)
/* ES6Promise.polyfill(); */
/* polyfill(); */
const app = (
    <Provider store={store}>
        <BrowserRouter basename="/platform">
            <App></App>
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
