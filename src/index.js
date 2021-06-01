import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import routes from './routes';

const store = createStore(reducer);

const app = (
    <Provider store={store}>
        <React.StrictMode>
            {routes}
        </React.StrictMode>,
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
