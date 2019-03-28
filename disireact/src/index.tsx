import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './registerServiceWorker';


import {applyMiddleware, createStore} from "redux";
import createBrowserHistory from "history/createBrowserHistory";
import {composeWithDevTools} from "redux-devtools-extension";
import createRootReducer from './redux/reducers/rootReducer';
import thunk from "redux-thunk";
import {ConnectedRouter, routerMiddleware} from "connected-react-router";
import {Provider} from "react-redux";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

export const publicUrl = process.env.PUBLIC_URL || "";

export const history = createBrowserHistory({basename: publicUrl});

export const store = createStore(createRootReducer(history), {},
    composeWithDevTools(
        applyMiddleware(
            thunk,
            routerMiddleware(history),
        ),
    )
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
