// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


// //import('./JBrowseApp');

import AdapterType from "@jbrowse/core/pluggableElementTypes/AdapterType";
import Plugin from "@jbrowse/core/Plugin";
import { AdapterClass, configSchema } from "./UCSCAdapter";

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
import reportWebVitals from './reportWebVitals';

export default class UCSCPlugin extends Plugin {
  name = "UCSCPlugin";
  version = "1";
  install(pluginManager) {
    pluginManager.addAdapterType(
      () =>
        new AdapterType({
          name: "UCSCAdapter",
          configSchema,
          AdapterClass,
        }),
    );
  }
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();