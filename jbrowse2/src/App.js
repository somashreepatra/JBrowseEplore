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
          "configuration": "e1",
          "displays": [
            {
              "type": "LinearBasicDisplay",
              "configuration": "e1d1",
              showForward: true,
              showReverse: false,
              showTranslation: false,
              height: 680,
            }
          ]
        }, 
        {
          "type": "FeatureTrack",
          "configuration": "e2",
          "displays": [
            {
              "type": "LinearBasicDisplay",
              "configuration": "e2d2",
              showForward: true,
              showReverse: false,
              showTranslation: false,
              height: 680,
            }
          ]
        }, 
        {
          "type": "FeatureTrack",
          "configuration": "e3",
          "displays": [
            {
              "type": "LinearBasicDisplay",
              "configuration": "e3d3",
              showForward: true,
              showReverse: false,
              showTranslation: false,
              height: 680,
            }
          ]
        }, 
        {
          "type": "FeatureTrack",
          "configuration": "e4",
          "displays": [
            {
              "type": "LinearBasicDisplay",
              "configuration": "e4d4",
              showForward: true,
              showReverse: false,
              showTranslation: false,
              height: 680,
            }
          ]
        }, 
        {
          "type": "FeatureTrack",
          "configuration": "e5",
          "displays": [
            {
              "type": "LinearBasicDisplay",
              "configuration": "e5d5",
              showForward: true,
              showReverse: false,
              showTranslation: false,
              height: 680,
            }
          ]
        }, 
        {
          "type": "FeatureTrack",
          "configuration": "e6",
          "displays": [
            {
              "type": "LinearBasicDisplay",
              "configuration": "e6d6",
              showForward: true,
              showReverse: false,
              showTranslation: false,
              height: 680,
            }
          ]
        }, 
        {
          "type": "FeatureTrack",
          "configuration": "e7",
          "displays": [
            {
              "type": "LinearBasicDisplay",
              "configuration": "e7d7",
              showForward: true,
              showReverse: false,
              showTranslation: false,
              height: 680,
            }
          ]
        }, 
        {
          "type": "FeatureTrack",
          "configuration": "e8",
          "displays": [
            {
              "type": "LinearBasicDisplay",
              "configuration": "e8d8",
              showForward: true,
              showReverse: false,
              showTranslation: false,
              height: 680,
            }
          ]
        }, 
        {
          "type": "FeatureTrack",
          "configuration": "e9",
          "displays": [
            {
              "type": "LinearBasicDisplay",
              "configuration": "e9d9",
              showForward: true,
              showReverse: false,
              showTranslation: false,
              height: 680,
            }
          ]
        }
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