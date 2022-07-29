// import PluginManager from '@jbrowse/core/PluginManager'
// import AdapterType from '@jbrowse/core/pluggableElementTypes/AdapterType'

// // locals
// import configSchema from './configSchema'

// export default (pluginManager: PluginManager) => {
//   pluginManager.addAdapterType(
//     () =>
//       new AdapterType({
//         name: 'TraceAdapter',
//         configSchema: pluginManager.load(configSchema),
//         getAdapterClass: () => import('./TraceAdapter').then(r => r.default),
//       }),
//   )
// }
