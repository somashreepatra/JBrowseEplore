import AdapterType from "@jbrowse/core/pluggableElementTypes/AdapterType";
import Plugin from "@jbrowse/core/Plugin";
import { AdapterClass, configSchema } from "./UCSCAdapter";


export default class UCSCPlugin extends Plugin {
  name = "UCSCPlugin";
  version = "1";
  install(pluginManager: any) {
    pluginManager.addAdapterType(
      () =>
        new AdapterType({
          name: "UCSCAdapter",
          configSchema,
          AdapterClass,
        }),
    );
  }
}