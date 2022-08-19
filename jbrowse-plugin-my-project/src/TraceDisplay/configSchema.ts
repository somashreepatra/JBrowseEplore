import { ConfigurationSchema } from '@jbrowse/core/configuration'
import { Instance } from 'mobx-state-tree'
import PluginManager from '@jbrowse/core/PluginManager'
//import { linearBasicDisplayConfigSchemaFactory } from '@jbrowse/plugin-linear-genome-view'

export function TraceDisplayConfigFactory(
  pluginManager: PluginManager,
) {
  //const configSchema = linearBasicDisplayConfigSchemaFactory(pluginManager)
  const renderindisplay = pluginManager.pluggableConfigSchemaType('renderer');
  console.log("renderindisplay  ",renderindisplay);
  return ConfigurationSchema(
    'TraceSequenceDisplay',
    {
      mouseover: {
        type: 'string',
        description: 'what to display in a given mouseover',
        defaultValue: `jexl:get(feature,'name')`,

        contextVariable: ['feature'],
      },
      renderer: renderindisplay
    },
    {explicitIdentifier: 'displayId', explicitlyTyped: true }
    //{ baseConfiguration: configSchema, explicitlyTyped: true },
  )
}

export type TraceDisplayConfigModel = ReturnType<
  typeof TraceDisplayConfigFactory
>
export type TraceDisplayConfig =
  Instance<TraceDisplayConfigModel>
