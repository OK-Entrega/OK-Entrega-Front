import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import routes from './routes';
import { ToastProvider } from "react-toast-notifications";
import "./index.css";

const store = createStore(reducer);

const app = (
    <ToastProvider>
        <Provider store={store}>
            <React.StrictMode>
                {routes}
            </React.StrictMode>,
        </Provider>
    </ToastProvider>
);

ReactDOM.render(
    app,
    document.getElementById('root')
);

serviceWorker.unregister();
