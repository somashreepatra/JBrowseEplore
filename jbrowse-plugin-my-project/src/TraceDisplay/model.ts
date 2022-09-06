import { BaseLinearDisplay, LinearGenomeViewModel } from '@jbrowse/plugin-linear-genome-view'
import { getContainingView } from '@jbrowse/core/util'
import { getConf, ConfigurationReference, AnyConfigurationSchemaType } from '@jbrowse/core/configuration'
import { types, getEnv, Instance } from 'mobx-state-tree'
import { linearBasicDisplayModelFactory } from '@jbrowse/plugin-linear-genome-view';

const stateModelFactory = (configSchema: AnyConfigurationSchemaType) =>
  types.compose(
      'TraceSequenceDisplay',
      linearBasicDisplayModelFactory(configSchema),
      types.model({
        type: types.literal('TraceSequenceDisplay'),
        showEditInput: types.optional(types.boolean, false),
        editstartposition: types.maybe(types.string),
        editfeatureindex: types.maybe(types.string),
        editinputwidth: types.maybe(types.string),
        editbasevalue: types.maybe(types.string),
        configuration: ConfigurationReference(configSchema),
        showElectropherogram:  types.optional(types.boolean, true),
        showQualityBars:  types.optional(types.boolean, true),
        showForward: types.optional(types.boolean, true),
        showReverse: types.optional(types.boolean, false),
        showTranslation: types.optional(types.boolean, false),
        height: 180,
        // types.model({
        //   inputTop: types.maybe(types.string),
        //   inputLeft: types.maybe(types.string),
        //   inputWidth: types.maybe(types.string)
        // })
        // editInputMetaData: types.maybe(types.model('', {
        //   startposition: types.number,
        //   featureindex: types.number,
        // }))
      })
  ).views((self) => ({
        get rendererTypeName() {
          console.log("RENDERER NAME :: ",getConf(self, ['renderer', 'type']));
          return getConf(self, ['renderer', 'type'])
        },
        get editInput() {
          return self.showEditInput ?? getConf(self, ['renderer', 'showEditInput'])
        },
        // get editstartposition() {
        //   return self.editstartposition ?? getConf(self, ['renderer', 'editstartposition'])
        // },
        // get editfeatureindex() {
        //   return self.editfeatureindex ?? getConf(self, ['renderer', 'editfeatureindex'])
        // },
  }))
  .views(self => {
    const { renderProps: superRenderProps } = self
    return {
      renderProps() {
        const { showForward, showReverse, showTranslation, showElectropherogram, showQualityBars } = self
        return {
          ...superRenderProps(),
          rpcDriverName: self.rpcDriverName,
          config: self.configuration.renderer,
          showForward,
          showReverse,
          showTranslation,
          showElectropherogram,
          showQualityBars
        }
      },
      regionCannotBeRendered(/* region */) {
        const view = getContainingView(self) as LinearGenomeViewModel
        if (view && view.bpPerPx >= 1) {
          return 'Zoom in to see sequence'
        }
        return undefined
      },

      get rendererTypeName() {
        return self.configuration.renderer.type
      },
    }
  })
      .actions(self => ({
        toggleShowEditInput() {
          self.showEditInput = !self.showEditInput
        },
        setEditstartposition(startposition: string) {
          self.editstartposition = startposition
        },
        setEditfeatureindex(editfeatureindex: string) {
          self.editfeatureindex = editfeatureindex
        },
        setEditbasevalue(basevalue: string) {
          self.editbasevalue = basevalue
        },
        setEditInputwidth(inputwidth: string) {
          self.editinputwidth = inputwidth
        },
        toggleShowForward() {
          self.showForward = !self.showForward
        },
        toggleShowReverse() {
          self.showReverse = !self.showReverse
        },
        toggleShowTranslation() {
          self.showTranslation = !self.showTranslation
        },

        // setInputDisplayObject(inputdisplays: IInputDisplays) {
        //   self.editInputObject = inputdisplays;
        // }
      }))
      .views(self => ({
        trackMenuItems() {
          return [
            {
              label: 'Show forward',
              type: 'checkbox',
              checked: self.showForward,
              onClick: () => {
                self.toggleShowForward()
              },
            },
            {
              label: 'Show reverse',
              type: 'checkbox',
              checked: self.showReverse,
              onClick: () => {
                self.toggleShowReverse()
              },
            },
            {
              label: 'Show translation',
              type: 'checkbox',
              checked: self.showTranslation,
              onClick: () => {
                self.toggleShowTranslation()
              },
            },
          ]
        },
      }))
    
    

export type TraceTrackStateModel = ReturnType<typeof stateModelFactory>
export type TraceTrackModel = Instance<TraceTrackStateModel>

export default stateModelFactory