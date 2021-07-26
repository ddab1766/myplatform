import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";

import store from "./store/index";
import persistor from "./store/persistStore"
import history from "./utils/historyUtils";
import {authLogin} from "./actions/authActions";
import App from "./components/App";
import {PersistGate} from 'redux-persist/integration/react';
import {CookiesProvider} from 'react-cookie';
// styles
import "assets/css/Custom.css"
import "assets/css/bootstrap.min.css";
import "assets/demo/demo.css";
import 'redux-notifications/lib/styles.css';
import 'font-awesome/css/font-awesome.min.css';
import 'assets/css/rsuite-default.css';

const token = localStorage.getItem("token");
// const comcode = localStorage.getItem("comcode");

if (token) {
    store.dispatch(authLogin(token));
}
// if (comcode) {
//     store.dispatch(setComCode(comcode));
// }
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
                {/*<Index/>*/}
                <CookiesProvider>
                    <App/>
                </CookiesProvider>
            </Router>
        </PersistGate>
    </Provider>
    , document.getElementById("root"));
