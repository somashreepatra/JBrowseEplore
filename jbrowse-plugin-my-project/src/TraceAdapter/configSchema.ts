import { ConfigurationSchema } from '@jbrowse/core/configuration'
//import { types } from 'mobx-state-tree'

export const configSchema = ConfigurationSchema(
  'TracesAdapter',
  {
    features: {
      type: 'frozen',
      defaultValue: [],
    },
    featureClass: {
      type: 'string',
      defaultValue: 'SimpleFeature',
    },
  },
  { explicitlyTyped: true, implicitIdentifier: 'adapterId' },
)


// export default types.late(() =>
//   ConfigurationSchema(
//     'TraceAdapter',
//     {
//       features: {
//         type: 'frozen',
//         defaultValue: [],
//       },
//       featureClass: {
//         type: 'string',
//         defaultValue: 'SimpleFeature',
//       },
//     },
//     { explicitlyTyped: true, implicitIdentifier: 'adapterId' },
//   )
// )