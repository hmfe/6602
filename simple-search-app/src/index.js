import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,  applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from "redux-thunk";

import './styles/index.css';
import App from './scripts/App';
import rootReducer from './scripts/reducers/root';

const store = createStore(rootReducer, undefined, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
