// import Plugin from '@jbrowse/core/Plugin'
// import PluginManager from '@jbrowse/core/PluginManager'
// import ViewType from '@jbrowse/core/pluggableElementTypes/ViewType'
// import { AbstractSessionModel, isAbstractMenuManager } from '@jbrowse/core/util'
// import { version } from '../package.json'
// import {
//   ReactComponent as HelloViewReactComponent,
//   stateModel as helloViewStateModel,
// } from './HelloView'

// import AdapterType from '@jbrowse/core/pluggableElementTypes/AdapterType';
// import configSchema from './tracesAdapter/configSchema';

// export default class TracesPlugin extends Plugin {
//   name = 'TracesPlugin'
//   version = version
  
//   install(pluginManager: PluginManager) {
//     console.log("TRACES PLUGIN");
//     pluginManager.addAdapterType(
//       () =>
//         new AdapterType({
//           name: 'TraceAdapter',
//           configSchema: pluginManager.load(configSchema),
//           getAdapterClass: () => import('./tracesAdapter/TraceAdapter').then(r => r.default),
//         }),
//     )
//     pluginManager.addViewType(() => {
//       return new ViewType({
//         name: 'HelloView',
//         stateModel: helloViewStateModel,
//         ReactComponent: HelloViewReactComponent,
//       })
//     })
//   }

//   configure(pluginManager: PluginManager) {
//     console.log("TRACES PLUGIN configure");
//     if (isAbstractMenuManager(pluginManager.rootModel)) {
//       pluginManager.rootModel.appendToMenu('Add', {
//         label: 'Hello Deepa View',
//         onClick: (session: AbstractSessionModel) => {
//           session.addView('HelloView', {})
//         },
//       })
//     }
//   }
// }



// import * as React from "react";
// import * as ReactDOM from "react-dom";
// ReactDOM.render(<div>
//   test</div>, document.getElementById("root"));



import AdapterType from "@jbrowse/core/pluggableElementTypes/AdapterType";
import Plugin from "@jbrowse/core/Plugin";
import {configSchema} from "./TraceAdapter/configSchema";
import PluginManager from '@jbrowse/core/PluginManager'
import TracesAdapter from "./TraceAdapter/TracesAdapter";
import {
  configSchema as traceSequenceConfigSchema,
  ReactComponent as TraceSequenceRenderingComponent,
} from './TraceRenderer';
import traceConfigSchema from './TraceRenderer/configSchema';
import {
  traceConfigSchemaFactory as traceDisplayConfigSchemaFactory,
  traceModelFactory as traceDisplayModelFactory,
} from './TraceDisplay'
import FeatureRendererType from "@jbrowse/core/pluggableElementTypes/renderers/FeatureRendererType";
import { Region } from "@jbrowse/core/util/types";
import DisplayType from "@jbrowse/core/pluggableElementTypes/DisplayType";
import { BaseDisplay } from '@jbrowse/core/pluggableElementTypes/models'
import { types, getSnapshot, Instance } from 'mobx-state-tree'
// import {
//   getContainingView,
//   getSession,
//   makeAbortableReaction,
// } from '@jbrowse/core/util'

import {
  getConf,
  readConfObject,
  ConfigurationReference,
  ConfigurationSchema,
} from '@jbrowse/core/configuration'

// import {
//   getParentRenderProps,
//   getRpcSessionId,
// } from '@jbrowse/core/util/tracks'

import ReactComponent from './TraceDisplay/reactComponent';

//import { BaseLinearDisplayComponent } from '@jbrowse/plugin-linear-genome-view'

class TraceSequenceRenderer extends FeatureRendererType {
  supportsSVG = true

  getExpandedRegion(region: Region) {
    return {
      ...region,
      start: Math.max(region.start - 3, 0),
      end: region.end + 3,
    }
  }
}

export default class TracesPlugin extends Plugin {
  name = 'TracesPlugin'
  
  install(pluginManager: PluginManager) {
    console.log("TRACES PLUGIN INSTALL New V1 ",pluginManager);
    
    pluginManager.addAdapterType(
      () =>
        {
          console.log("INSIDE ADD ADAPTER NEW ")
        return new AdapterType({
          name: 'TracesAdapter',
          configSchema: configSchema,
          adapterMetadata: {
            category: null,
            hiddenFromGUI: true,
            displayName: null,
            description: null,
          },
          AdapterClass: TracesAdapter,
        })
      }
    )

    pluginManager.addRendererType(
      () =>
        new TraceSequenceRenderer({
          name: 'TraceSequenceRenderer',
          ReactComponent: TraceSequenceRenderingComponent,
          configSchema: traceConfigSchema,
         // traceSequenceConfigSchema,
          pluginManager
        }),
    )

    // pluginManager.addDisplayType(() => {
    //   const configSchema = configSchemaFactory(pluginManager)
    //   return new DisplayType({
    //     name: 'TraceDisplay',
    //     configSchema: traceDisplayConfigSchema,
    //     stateModel: stateModelFactory(configSchema),
    //     trackType: 'FeatureTrack',
    //     viewType: 'LinearGenomeView',
    //     //ReactComponent,
    //     ReactComponent: BaseLinearDisplayComponent,
    //   })
    // })

    pluginManager.addDisplayType(() => {
      const configSchema = traceDisplayConfigSchemaFactory(pluginManager)
      return new DisplayType({
        name: 'TraceSequenceDisplay',
        configSchema: configSchema,
        stateModel: traceDisplayModelFactory(configSchema),
        trackType: 'FeatureTrack',
        viewType: 'LinearGenomeView',
        ReactComponent: ReactComponent//BaseLinearDisplayComponent,
      })
    })
    
  }
}


// export function configSchemaFactory(pluginManager: any) {
//   const traceRendererConfigSchema =
//     pluginManager.getRendererType('TraceSequenceRenderer').configSchema
//     console.log("traceRendererConfigSchema  ",traceRendererConfigSchema);
//   const cs = ConfigurationSchema('RenderersConfiguration', {
//     TraceSequenceRenderer: traceConfigSchema,
//   });
//   console.log("CS  :: ", cs);
//   return ConfigurationSchema(
//     'TraceDisplay',
//     {
//       renderers: cs,
//       renderer: '',
//       //pluginManager.pluggableConfigSchemaType('renderer'),
      
//       // types.optional(
        
//       //   pluginManager.pluggableConfigSchemaType('renderer'),
//       //   { type: 'TraceSequenceRenderer' },
//       // ),
//     },
//     { explicitIdentifier: 'displayId', explicitlyTyped: true },
//   )
// }

// export function stateModelFactory(
//   configSchema: ReturnType<typeof configSchemaFactory>,
// ) {
//   return types
//     .compose(
//       'TraceDisplay',
//       BaseDisplay,
//       types.model({
//         type: types.literal('TraceDisplay'),
//         configuration: ConfigurationReference(configSchema),
//       }),
//     )

//     .views(self => ({
//       renderProps() {
//         //const parentView = getContainingView(self) as LinearSyntenyViewModel
//         return {
//           rpcDriverName: self.rpcDriverName,
//           displayModel: self,
//           //config: getConf(self, 'renderer'),
//           config: self.configuration.renderer,
//           width: 1000,//parentView.width,
//           height: 500//parentView.middleComparativeHeight,
//         }
//       },
//       get rendererTypeName() {
//         return self.configuration.renderer.type
//       },
//       get adapterConfig() {
//         // TODO possibly enriches with the adapters from associated trackIds
//         return {
//           // @ts-ignore
//           name: self.parentTrack.configuration.adapter.type,
//           assemblyNames: getConf(self, 'assemblyNames'),
//           ...getConf(self.parentTrack, 'adapter'),
//         }
//       },
//     }))
// }

// export function stateModelFactory(configSchema: any) {
//   return types
//     .compose(
//       'DotplotDisplay',
//       BaseDisplay,
//       types
//         .model({
//           type: types.literal('DotplotDisplay'),
//           configuration: ConfigurationReference(configSchema),
//         })
//         .volatile(() => ({
//           renderInProgress: undefined as AbortController | undefined,
//           filled: false,
//           data: undefined as any,
//           reactElement: undefined as React.ReactElement | undefined,
//           message: undefined as string | undefined,
//           renderingComponent: undefined as any,
//           ReactComponent2:
//             ServerSideRenderedBlockContent as unknown as React.FC<any>,
//         })),
//     )
//     .views(self => ({
//       get rendererTypeName() {
//         return getConf(self, ['renderer', 'type'])
//       },
//       renderProps() {
//         return {
//           ...getParentRenderProps(self),
//           rpcDriverName: self.rpcDriverName,
//           displayModel: self,
//           config: self.configuration.renderer,
//         }
//       },
//     }))
//     .actions(self => {
//       let renderInProgress: undefined | AbortController

//       return {
//         afterAttach() {
//           makeAbortableReaction(
//             self as any,
//             () => renderBlockData(self as any),
//             (blockData): any => {
//               return blockData ? renderBlockEffect(blockData) : undefined
//             },
//             {
//               name: `${self.type} ${self.id} rendering`,
//               delay: 1000,
//               fireImmediately: true,
//             },
//             this.setLoading,
//             this.setRendered,
//             this.setError,
//           )
//         },

//         setLoading(abortController: AbortController) {
//           self.filled = false
//           self.message = undefined
//           self.reactElement = undefined
//           self.data = undefined
//           self.error = undefined
//           self.renderingComponent = undefined
//           renderInProgress = abortController
//         },
//         setMessage(messageText: string) {
//           if (renderInProgress && !renderInProgress.signal.aborted) {
//             renderInProgress.abort()
//           }
//           self.filled = false
//           self.message = messageText
//           self.reactElement = undefined
//           self.data = undefined
//           self.error = undefined
//           self.renderingComponent = undefined
//           renderInProgress = undefined
//         },
//         setRendered(args?: {
//           data: any
//           reactElement: React.ReactElement
//           renderingComponent: React.Component
//         }) {
//           if (args === undefined) {
//             return
//           }
//           const { data, reactElement, renderingComponent } = args
//           self.filled = true
//           self.message = undefined
//           self.reactElement = reactElement
//           self.data = data
//           self.error = undefined
//           self.renderingComponent = renderingComponent
//           renderInProgress = undefined
//         },
//         setError(error: unknown) {
//           console.error(error)
//           if (renderInProgress && !renderInProgress.signal.aborted) {
//             renderInProgress.abort()
//           }
//           // the rendering failed for some reason
//           self.filled = false
//           self.message = undefined
//           self.reactElement = undefined
//           self.data = undefined
//           self.error = error
//           self.renderingComponent = undefined
//           renderInProgress = undefined
//         },
//       }
//     })
// }

// function renderBlockData(self: DotplotDisplayModel) {
//   const { rpcManager } = getSession(self)
//   const { rendererType } = self
//   const { adapterConfig } = self
//   const parent = getContainingView(self) as DotplotViewModel

//   // Alternative to readConfObject(config) is below used because renderProps is
//   // something under our control.  Compare to serverSideRenderedBlock
//   readConfObject(self.configuration)
//   getSnapshot(parent)

//   if (parent.initialized) {
//     const { viewWidth, viewHeight, borderSize, borderX, borderY } = parent
//     return {
//       rendererType,
//       rpcManager,
//       renderProps: {
//         ...self.renderProps(),
//         view: clone(getSnapshot(parent)),
//         width: viewWidth,
//         height: viewHeight,
//         borderSize,
//         borderX,
//         borderY,
//         adapterConfig,
//         rendererType: rendererType.name,
//         sessionId: getRpcSessionId(self),
//         timeout: 1000000, // 10000,
//       },
//     }
//   }
//   return undefined
// }

// async function renderBlockEffect(
//   props: ReturnType<typeof renderBlockData> | undefined,
// ) {
//   if (!props) {
//     throw new Error('cannot render with no props')
//   }

//   const { rendererType, rpcManager, renderProps } = props

//   const { reactElement, ...data } = await rendererType.renderInClient(
//     rpcManager,
//     renderProps,
//   )

//   return { reactElement, data, renderingComponent: rendererType.ReactComponent }
// }

// export type DotplotDisplayStateModel = ReturnType<typeof stateModelFactory>
// export type DotplotDisplayModel = Instance<DotplotDisplayStateModel>

