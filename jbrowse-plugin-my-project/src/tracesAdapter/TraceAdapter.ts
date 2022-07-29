import { BaseAdapter, BaseFeatureDataAdapter, BaseOptions } from "@jbrowse/core/data_adapters/BaseAdapter";
import { AugmentedRegion } from "@jbrowse/core/util";
  
export default class TraceAdapter extends BaseAdapter {
    freeResources(region: AugmentedRegion): void {
        console.log("REGION ", region);
        throw new Error("Method not implemented.");
    }
    

}