import { ConfigurationSchema } from '@jbrowse/core/configuration'
import PluginManager from '@jbrowse/core/PluginManager'
import { types } from 'mobx-state-tree'
import { stateModelFactory as baseModelFactory } from '@jbrowse/core/BaseFeatureWidget'

export const configSchema = ConfigurationSchema('TraceFeatureWidget', {})

export function stateModelFactory(pluginManager: PluginManager) {
  const baseModel = baseModelFactory(pluginManager)
  return types.compose(
    baseModel,
    types.model('TraceFeatureWidget', {
      type: types.literal('TraceFeatureWidget'),
      descriptions: types.frozen(),
    }),
  )
}
