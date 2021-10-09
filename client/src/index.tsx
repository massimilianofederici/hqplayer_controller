import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Library} from "./Library";
import "bootswatch/dist/darkly/bootstrap.min.css";
import {
    Route,
    HashRouter as Router
} from "react-router-dom";
import {ToastProvider} from "react-toast-notifications";

ReactDOM.render(
    <ToastProvider autoDismiss={true}>
        <Router>
            <Route path={"/library/:viewId"} component={Library}>
            </Route>
        </Router>
    </ToastProvider>,
    document.getElementById('root')
);
