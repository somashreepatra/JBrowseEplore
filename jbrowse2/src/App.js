import React, { useState, useEffect } from 'react'
import {
  createViewState,
  JBrowseLinearGenomeView,
  loadPlugins
} from '@jbrowse/react-linear-genome-view'

import assembly from './assembly'
import tracks from './tracks';

//import Traces from 'traces-plugin';

// const defaultSession = {
//   name: 'this session',
//   view: {
//     id: 'linearGenomeView',
//     type: 'LinearGenomeView',
//     tracks: [
//       {
//         id: '7PWx6ki1_',
//         type: 'ReferenceSequenceTrack',
//         configuration: 'GRCh38-ReferenceSequenceTrack',
//         displays: [
//           {
//             id: 'pa_7lx6FDh',
//             type: 'LinearReferenceSequenceDisplay',
//             height: 210,
//             configuration:
//               'GRCh38-ReferenceSequenceTrack-LinearReferenceSequenceDisplay',
//           },
//         ],
//       },
//       {
//         id: 'KHwe41KXk',
//         type: 'AlignmentsTrack',
//         configuration: 'NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome',
//         displays: [
//           {
//             id: '_-kwYVczT8',
//             type: 'LinearAlignmentsDisplay',
//             PileupDisplay: {
//               id: '1HTk32IDZJ',
//               type: 'LinearPileupDisplay',
//               height: 100,
//               configuration: {
//                 type: 'LinearPileupDisplay',
//                 displayId:
//                   'NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome-LinearAlignmentsDisplay_pileup_xyz',
//               },
//             },
//             SNPCoverageDisplay: {
//               id: 'ZBXRXmuDrc',
//               type: 'LinearSNPCoverageDisplay',
//               height: 45,
//               configuration: {
//                 type: 'LinearSNPCoverageDisplay',
//                 displayId:
//                   'NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome-LinearAlignmentsDisplay_snpcoverage_xyz',
//               },
//             },
//             configuration:
//               'NA12878.alt_bwamem_GRCh38DH.20150826.CEU.exome-LinearAlignmentsDisplay',
//             height: 100,
//           },
//         ],
//       },
//       {
//         "type": "FeatureTrack",
//         "configuration": "genehancer_ucsc_deepa",
//         "displays": [
//           {
//             "type": "LinearBasicDisplay",
//             "configuration": "nextstrain-color-display"
//           }
//         ]
//       },
//     ],
//   },
// }

const defaultSession = {
    "name": "My session",
    "view": {
      "id": "linearGenomeView",
      "type": "LinearGenomeView",
      "tracks": [
        {
          "type": "ReferenceSequenceTrack",
          "configuration": "SARS-CoV-2-ReferenceSequenceTrack",
          "displays": [
            {
              "type": "LinearReferenceSequenceDisplay",
              "configuration": "SARS-CoV-2-ReferenceSequenceTrack-LinearReferenceSequenceDisplay"
            }
          ]
        },
        // {
        //   "type": "QuantitativeTrack",
        //   "configuration": "entropy-score",
        //   "displays": [
        //     {
        //       "type": "LinearWiggleDisplay",
        //       "displayId": "entropy-score-LinearWiggleDisplay",
        //       "renderers": {
        //         "DensityRenderer": {
        //           "type": "DensityRenderer"
        //         },
        //         "XYPlotRenderer": {
        //           "type": "XYPlotRenderer"
        //         },
        //         "LinePlotRenderer": {
        //           "type": "LinePlotRenderer"
        //         }
        //       }
        //     }
        //   ]
        // },
        {
          "type": "FeatureTrack",
          "configuration": "nextstrain-annotations",
          "displays": [
            {
              "type": "LinearBasicDisplay",
              "configuration": "nextstrain-color-display"
            }
          ]
        }, {
          "type": "FeatureTrack",
          "configuration": "electropherogram-annotations",
          "displays": [
            {
              "type": "LinearBasicDisplay",
              "configuration": "traces-color-display"
            }
          ]
          
        },  
        {
          "type": "FeatureTrack",
          "configuration": "seq-annotations",
          "displays": [
            {
              "type": "TraceSequenceDisplay",
              "configuration": "seq-color-display",
              showForward: true,
              showReverse: false,
              showTranslation: false,
              height: 680,
              renderer: {
                type: 'TraceSequenceRenderer',
              },
            }
          ]
        }, 
        {
          "type": "FeatureTrack",
          "configuration": "basic-annotations",
          "displays": [
            {
              "type": "LinearBasicDisplay",
              "configuration": "basic-color-display",
              showForward: true,
              showReverse: false,
              showTranslation: false,
              height: 680,
            }
          ]
        }, 
        
        // {
        //   "type": "FeatureTrack",
        //   "configuration": "bar-annotations",
        //   "displays": [
        //     {
        //       "type": "LinearBasicDisplay",
        //       "configuration": "bar-color-display",
        //       showForward: true,
        //       showReverse: false,
        //       showTranslation: false,
        //       height: 180
        //     }
        //   ]
        // }

        
        // {
        //   "type": "ReferenceSequenceTrack",
        //   "configuration": "sequence-annotations",
        //   "displays": [
        //     {
        //       "type": "LinearBasicDisplay",
        //       "configuration": "seq-color-display"
        //     }
        //   ]
        // }
      ]
    }
  };


function App() {
  console.log("INSIDE APP");
  // const [viewState, setViewState] = useState();
  // const [patches, setPatches] = useState('')
  // const [stateSnapshot, setStateSnapshot] = useState('')
  const [plugins, setPlugins] = useState()
  useEffect(() => {
    async function getPlugins() {
      const loadedPlugins = await loadPlugins([
        {
          "name": "Traces",
          "url": "http://localhost:9000/dist/jbrowse-plugin-traces.umd.development.js"
        }
      ])
      console.log("loadedPlugins ",loadedPlugins);
      setPlugins(loadedPlugins)
    }
    getPlugins()
  }, [setPlugins])
  console.log("PLUGINS NEWLY ADDED ", plugins);
  if (!plugins) {
    return null
  }
    const pl = plugins.map(p => p.plugin);
    const state = createViewState({
      assembly,
     tracks,
      //plugins: [HighlightRegionPlugin],
      plugins: pl,
      "location": "SARS-CoV-2:14,936..14,968",
      // onChange: (patch) => {
      //   setPatches((previous) => previous + JSON.stringify(patch) + '\n')
      // },
      defaultSession,
      // configuration: {
      //   theme: {
      //     palette: {
      //       primary: {
      //         main: '#311b92',
      //       },
      //       secondary: {
      //         main: '#0097a7',
      //       },
      //       tertiary: {
      //         main: '#f57c00',
      //       },
      //       quaternary: {
      //         main: '#d50000',
      //       },
      //       bases: {
      //         A: { main: '#98FB98' },
      //         C: { main: '#87CEEB' },
      //         G: { main: '#DAA520' },
      //         T: { main: '#DC143C' },
      //       },
      //     },
      //   },
      // },
    })
    
    
    
    //setViewState(state)

 
    return (
      <>
      <JBrowseLinearGenomeView viewState={state} />
        <h1>
          HI
        </h1>
        Hello
      </>
    );
  // return (
  //   <>
  //     <h1>
  //       JBrowse 2
  //     </h1>
  //     <JBrowseLinearGenomeView viewState={state} />
  //   </>
  // )
}

export default App;