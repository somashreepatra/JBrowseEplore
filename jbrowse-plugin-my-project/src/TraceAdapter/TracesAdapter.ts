import { BaseFeatureDataAdapter } from '@jbrowse/core/data_adapters/BaseAdapter'
import SimpleFeature, {
  Feature,
  SimpleFeatureSerialized,
} from '@jbrowse/core/util/simpleFeature'
import { ObservableCreate } from '@jbrowse/core/util/rxjs'
import { NoAssemblyRegion } from '@jbrowse/core/util/types'
import { AnyConfigurationModel } from '@jbrowse/core/configuration/configurationSchema'
import { readConfObject } from '@jbrowse/core/configuration'
import PluginManager from '@jbrowse/core/PluginManager'
import { getSubAdapterType } from '@jbrowse/core/data_adapters/dataAdapterCache'

/**
 * Adapter that just returns the features defined in its `features` configuration
 * key, like:
 *   `"features": [ { "refName": "ctgA", "start":1, "end":20 }, ... ]`
 */

export default class TracesAdapter extends BaseFeatureDataAdapter {
  protected features: Map<string, Feature[]>

  constructor(
    conf: AnyConfigurationModel,
    getSubAdapter?: getSubAdapterType,
    pluginManager?: PluginManager,
  ) {
    console.log("INSIDE TRACES ADAPTER");
    super(conf, getSubAdapter, pluginManager)
    const feats = readConfObject(conf, 'features') as SimpleFeatureSerialized[]
    this.features = TracesAdapter.makeFeatures(feats || [])
  }

  static makeFeatures(fdata: SimpleFeatureSerialized[]) {
     const features = new Map<string, Feature[]>()
    for (let i = 0; i < fdata.length; i += 1) {
      if (fdata[i]) {
        const f = this.makeFeature(fdata[i])
        const refName = f.get('refName') as string
        let bucket = features.get(refName)
        if (!bucket) {
          bucket = []
          features.set(refName, bucket)
        }

        bucket.push(f)
      }
    }

    // sort the features on each reference sequence by start coordinate
    // for (const refFeatures of features.values()) {
    //   refFeatures.sort((a, b) => a.get('start') - b.get('start'))
    // }

    return features
  }

  static makeFeature(data: SimpleFeatureSerialized) {
    return new SimpleFeature(data)
  }

  async getRefNames() {
    return Object.keys(this.features);//[...this.features.keys()]
  }

  async getRefNameAliases() {
    return Array.from(this.features.values()).map(featureArray => ({
      refName: featureArray[0].get('refName'),
      aliases: featureArray[0].get('aliases'),
    }))
  }

  getFeatures(region: NoAssemblyRegion) {
    const { refName, start, end } = region

    return ObservableCreate<Feature>(async observer => {
      const features: Map<string, Feature[]> = this.features; //this.features.get(refName) || []
      //for (let i = 0; i < features.length; i++) {
      for (let [key, featuresArr] of features) {
       // const fs = features.get(key);
        for(let f of featuresArr) {
          if (f.get('end') > start && f.get('start') < end) {
            observer.next(f)
          }
        }
      }
      
      observer.complete()
    })
  }

  freeResources(/* { region } */): void {}
}



// observer.next(
//   new SimpleFeature({
//     ...feat.toJSON(),
//     uniqueId: `${feat.id()}:${region.start}-${region.end}`,
//     end: region.end,
//     start: region.start,
//     seq: feat
//       .get('seq')
//       .slice(
//         Math.max(region.start - feat.get('start'), 0),
//         Math.max(region.end - feat.get('start'), 0),
//       ),
//   }),