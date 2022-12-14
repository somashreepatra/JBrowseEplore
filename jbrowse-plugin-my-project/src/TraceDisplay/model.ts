// import { getConf, ConfigurationReference } from '@jbrowse/core/configuration'
// import { getRpcSessionId } from '@jbrowse/core/util/tracks'
// import {
//   getContainingTrack,
//   getSession,
//   getContainingView,
//   isSessionModelWithWidgets,
// } from '@jbrowse/core/util'
// import { Feature } from '@jbrowse/core/util/simpleFeature'
// import { linearBasicDisplayModelFactory } from '@jbrowse/plugin-linear-genome-view'
// import { types } from 'mobx-state-tree'
// import { TraceDisplayConfigModel } from './configSchema'

// export default function (configSchema: TraceDisplayConfigModel) {
//   return types
//     .compose(
//       'TraceDisplay',
//       linearBasicDisplayModelFactory(configSchema),
//       types.model({
//         type: types.literal('TraceDisplay'),
//         configuration: ConfigurationReference(configSchema),
//       }),
//     )
    
//     .actions((self: any) => ({

//         setRendered(args?: {
//           data: any
//           reactElement: React.ReactElement
//           renderingComponent: React.Component
//         }) {
//           console.log("renderingComponent ",args);
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
//           //renderInProgress = undefined
//         },
//       // async selectFeature(feature: Feature) {
//       //   const session = getSession(self)
//       //   if (isSessionModelWithWidgets(session)) {
//       //     const { rpcManager } = session
//       //     const sessionId = getRpcSessionId(self)
//       //     const track = getContainingTrack(self)
//       //     const adapterConfig = getConf(track, 'adapter')
//       //     const header = await rpcManager.call(sessionId, 'CoreGetMetadata', {
//       //       adapterConfig,
//       //     })
//       //     const featureWidget = session.addWidget(
//       //       'VariantFeatureWidget',
//       //       'variantFeature',
//       //       {
//       //         featureData: feature.toJSON(),
//       //         view: getContainingView(self),
//       //         descriptions: header,
//       //       },
//       //     )
//       //     session.showWidget(featureWidget)
//       //   }

//       //   session.setSelection(feature)
//       // },
//     }))
// }


import {
  getConf,
  ConfigurationReference,
  AnyConfigurationSchemaType,
} from '@jbrowse/core/configuration'
import { getSession } from '@jbrowse/core/util'
import { MenuItem } from '@jbrowse/core/ui'
import { types, getEnv, Instance } from 'mobx-state-tree'
//import { BaseDisplay } from '@jbrowse/core/pluggableElementTypes/models'
//import { BaseLinearDisplay } from '@jbrowse/plugin-linear-genome-view'
import { linearBasicDisplayModelFactory } from '@jbrowse/plugin-linear-genome-view';
// icons
import VisibilityIcon from '@mui/icons-material/Visibility'

// locals
//import BaseDisplay from '@jbrowse/react-linear-genome-view';

//const SetMaxHeightDlg = lazy(() => import('./components/SetMaxHeight'))

const stateModelFactory = (configSchema: AnyConfigurationSchemaType) =>
  types.compose(
      'TraceSequenceDisplay',
      linearBasicDisplayModelFactory(configSchema),
      types.model({
        type: types.literal('TraceSequenceDisplay'),
        showEditInput: types.maybe(types.boolean),
      })
    )
      .views((self) => ({
        get rendererTypeName() {
          console.log("RENDERER NAME :: ",getConf(self, ['renderer', 'type']));
          return getConf(self, ['renderer', 'type'])
        },
        get editInput() {
          return self.showEditInput ?? getConf(self, ['renderer', 'showEditInput'])
        }
      }))
      .views(self => ({
        get rendererConfig() {
          const configBlob = getConf(self, ['renderer']) || {}
          const config = configBlob as Omit<typeof configBlob, symbol>
  
          return self.rendererType.configSchema.create(
            {
              ...config,
              showEditInput: self.showEditInput
            },
            getEnv(self),
          )
        },
      }))
      .actions(self => ({
        toggleShowEditInput() {
          self.trackShowLabels = !self.showLabels
        }
      }))
      .views(self => {
        const {
          trackMenuItems: superTrackMenuItems,
          renderProps: superRenderProps,
        } = self
        return {
          renderProps() {
            const config = self.rendererConfig
            const superProps = superRenderProps()
  
            const superPropsOmit = superProps as Omit<typeof superProps, symbol>
  
            return {
              ...superPropsOmit,
  
              config,
            }
          },
  
          trackMenuItems(): MenuItem[] {
            return [
              ...superTrackMenuItems(),
              {
                label: 'Show Edit Input',
                icon: VisibilityIcon,
                type: 'checkbox',
                checked: self.showLabels,
                onClick: () => {
                  self.toggleShowLabels()
                },
              }
            ]
          },
        }
      })
    
    

export type TraceTrackStateModel = ReturnType<typeof stateModelFactory>
export type TraceTrackModel = Instance<TraceTrackStateModel>

export default stateModelFactory