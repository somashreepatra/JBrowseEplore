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
import {
  ReactComponent as HelloViewReactComponent,
  stateModel as helloViewStateModel,
} from './HelloView'
import ViewType from '@jbrowse/core/pluggableElementTypes/ViewType'
import TracesAdapter from "./TraceAdapter/TracesAdapter";
export default class TracesPlugin extends Plugin {
  name = 'TracesPlugin'

  install(pluginManager: PluginManager) {
    console.log("TRACES PLUGIN INSTALL New V1 ",pluginManager);
    pluginManager.addAdapterType(
      () =>
        {
          console.log("INSIDE ADD ADAPTER")
        return new AdapterType({
          name: 'TracesAdapter',
          configSchema: configSchema,
          // getAdapterClass: () =>
          //   import('./TraceAdapter/TracesAdapter').then(
          //     r => r.default,
          //   ),
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

    
        pluginManager.addViewType(() => {
          console.log("VIEW TYPE");
      return new ViewType({
        name: 'HelloView',
        stateModel: helloViewStateModel,
        ReactComponent: HelloViewReactComponent,
      })
    })
  }
}
