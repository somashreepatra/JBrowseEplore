import { ConfigurationSchema } from "@jbrowse/core/configuration";

import PluginManager from '@jbrowse/core/PluginManager'
//import { ConfigurationSchema } from '@jbrowse/core/configuration'
import { types } from 'mobx-state-tree'

export default (pluginManager: PluginManager) => {
  return types.late(() =>
    ConfigurationSchema(
      'TraceAdapter',
      {
        tracesLocation: {
          type: 'fileLocation',
          defaultValue: { uri: '/path/to/my.vcf.gz', locationType: 'UriLocation' },
        },
        index: ConfigurationSchema('VcfIndex', {
          indexType: {
            model: types.enumeration('IndexType', ['TBI', 'CSI']),
            type: 'stringEnum',
            defaultValue: 'TBI',
          },
          location: {
            type: 'fileLocation',
            defaultValue: {
              uri: '/path/to/my.vcf.gz.tbi',
              locationType: 'UriLocation',
            },
          },
        }),
      },
      { explicitlyTyped: true },
    ),
  )
}

// export const configSchema = ConfigurationSchema(
//     "TraceAdapter",
//     {
//       base: {
//         type: "stringArray",
//         description: "base URL for the UCSC API",
//         defaultValue: {
//           uri: "https://api.genome.ucsc.edu",
//         },
//       },
//       track: {
//         type: "string",
//         description: "the track to select data from",
//         defaultValue: "",
//       },
//     },
//     { explicitlyTyped: true },
//   );