import { ViewType } from "@jbrowse/core/pluggableElementTypes"
import PluginManager from "@jbrowse/core/PluginManager"
import { createViewState, JBrowseLinearGenomeView } from "@jbrowse/react-linear-genome-view"
import assembly from './assembly'
import tracks from './tracks';

// () => {
//     // you don't have to necessarily define this inside your react component, it
//     // just helps so that you can see the source code in the storybook to have it
//     // here
//     class HighlightRegionPlugin extends Plugin {
//       name = 'HighlightRegionPlugin'
  
//       install(pluginManager: PluginManager) {
//         pluginManager.addToExtensionPoint(
//           'Core-extendPluggableElement',
          
//           (pluggableElement: any) => {
//             if (pluggableElement.name === 'LinearGenomeView') {
//               const { stateModel } = pluggableElement as ViewType
//               const newStateModel = stateModel.extend(self => {
//                 const superRubberBandMenuItems = self.rubberBandMenuItems
//                 return {
//                   views: {
//                     rubberBandMenuItems() {
//                       return [
//                         ...superRubberBandMenuItems(),
//                         {
//                           label: 'Console log selected region',
//                           onClick: () => {
//                             const { leftOffset, rightOffset } = self
//                             const selectedRegions = self.getSelectedRegions(
//                               leftOffset,
//                               rightOffset,
//                             )
//                             // console log the list of potentially multiple
//                             // regions that were selected
//                             console.log(selectedRegions)
//                           },
//                         },
//                       ]
//                     },
//                   },
//                 }
//               })
  
//               pluggableElement.stateModel = newStateModel
//             }
//             return pluggableElement
//           },
//         )
//       }
  
//       configure() {}
//     }
  
//     const state = createViewState({
//       assembly,
//       plugins: [HighlightRegionPlugin],
//       tracks,
//       defaultSession,
//       location: 'ctgA:1105..1221',
//     })
  
//     return <JBrowseLinearGenomeView viewState={state} />
//   }