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
import FeatureRendererType from "@jbrowse/core/pluggableElementTypes/renderers/FeatureRendererType";
import { Region } from "@jbrowse/core/util/types";

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
  }
}
