import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
//import JB from './JB';
import reportWebVitals from './reportWebVitals';

import App from './App';
import {
  createViewState,
  JBrowseLinearGenomeView,
  loadPlugins
} from '@jbrowse/react-linear-genome-view'

import assembly from './assembly'
import tracks from './tracks';



const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("CALLED FROM INDEX");
root.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>
);



// const defaultSession = {
//   "name": "My session",
//   "view": {
//     "id": "linearGenomeView",
//     "type": "LinearGenomeView",
//     "tracks": [
//       {
//         "type": "ReferenceSequenceTrack",
//         "configuration": "SARS-CoV-2-ReferenceSequenceTrack",
//         "displays": [
//           {
//             "type": "LinearReferenceSequenceDisplay",
//             "configuration": "SARS-CoV-2-ReferenceSequenceTrack-LinearReferenceSequenceDisplay"
//           }
//         ]
//       },
//       // {
//       //   "type": "QuantitativeTrack",
//       //   "configuration": "entropy-score",
//       //   "displays": [
//       //     {
//       //       "type": "LinearWiggleDisplay",
//       //       "displayId": "entropy-score-LinearWiggleDisplay",
//       //       "renderers": {
//       //         "DensityRenderer": {
//       //           "type": "DensityRenderer"
//       //         },
//       //         "XYPlotRenderer": {
//       //           "type": "XYPlotRenderer"
//       //         },
//       //         "LinePlotRenderer": {
//       //           "type": "LinePlotRenderer"
//       //         }
//       //       }
//       //     }
//       //   ]
//       // },
//       {
//         "type": "FeatureTrack",
//         "configuration": "nextstrain-annotations",
//         "displays": [
//           {
//             "type": "LinearBasicDisplay",
//             "configuration": "nextstrain-color-display"
//           }
//         ]
//       }, {
//         "type": "FeatureTrack",
//         "configuration": "electropherogram-annotations",
//         // "displays": [
//         //   {
//         //     "type": "LinearBasicDisplay",
//         //     "configuration": "basicv1-color-display"
//         //   }
//         // ]
        
//       }
//     ]
//   }
// };

// // const [viewState, setViewState] = useState();
// //   const [patches, setPatches] = useState('')
// //   const [stateSnapshot, setStateSnapshot] = useState('')
//   const [plugins, setPlugins] = useState('')
//   useEffect(() => {
//     async function getPlugins() {
//       const loadedPlugins = await loadPlugins([
//         {
//           "name": "Traces",
//           "url": "http://localhost:9000/dist/jbrowse-plugin-traces.umd.development.js"
//         }
//       ])
//       setPlugins(loadedPlugins)
//     }
//     getPlugins();
//   }, [])
  
//     console.log("NEW STATE ADDED IN INDEX");
//     const state = createViewState({
//       assembly,
//       tracks,
//       plugins: plugins.map(p => p.plugin),
//       "location": "SARS-CoV-2:14,936..14,968",
//       // onChange: (patch) => {
//       //   setPatches((previous) => previous + JSON.stringify(patch) + '\n')
//       // },
//       defaultSession,
//     })



// const domContainer = document.getElementById('root')
// console.log("DOM CONT ", domContainer);
// ReactDOM.render(
//   React.createElement(JBrowseLinearGenomeView, { viewState: state }),
//   domContainer,
// )



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();