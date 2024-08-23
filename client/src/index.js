import React from 'react';
import ReactDOM from 'react-dom'
import App from './components/App'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';


const el = document.getElementById("root");

const root = ReactDOM.createRoot(el);


const store = createStore(()=>reducers,{},applyMiddleware());


root.render(<Provider store ={store}>
    <App />
  </Provider>
)

// ReactDOM.render(<App />, document.querySelector('#root'));