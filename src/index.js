import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';

axios.interceptors.request.use(request => {
    console.log("Axios interceptors request is:", request);
    return request;
},
    error => {
        console.log("[index.js] Axios interceptors error:", error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(response => {
    console.log("Axios interceptors response is:", response);
    return response;
},
    error => {
        console.log("[index.js] Axios interceptors error:", error);
        return Promise.reject(error);
    }
);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
