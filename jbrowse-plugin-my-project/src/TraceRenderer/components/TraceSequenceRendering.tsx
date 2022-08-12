/* eslint-disable @typescript-eslint/no-explicit-any */
//import React from 'react'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { AnyConfigurationModel } from '@jbrowse/core/configuration/configurationSchema'
import { contrastingTextColor } from '@jbrowse/core/util/color'
import { Feature } from '@jbrowse/core/util/simpleFeature'
import { Region } from '@jbrowse/core/util/types'
import { createJBrowseTheme } from '@jbrowse/core/ui'
import { observer } from 'mobx-react'

import {KeyDown} from '../../keydown';
import { BaseOperationEnum, IKeyEventData, SequenceProps } from './ITrace'
import useKeyDown from '../../useKeyDown';
//const [selectedIndex, setSelectedIndex] = useState(-1);
let selectedIndex = -1;
const Wrapper = (props: {
    exportSVG?: boolean,
    features: Map<string, Feature>
    regions: Region[]
    bpPerPx: number
    config: AnyConfigurationModel
    configTheme: any
    showForward: boolean
    showReverse: boolean
    showTranslation: boolean,
    onMouseOut?: React.MouseEventHandler
    onMouseDown?: React.MouseEventHandler
    onMouseLeave?: React.MouseEventHandler
    onMouseEnter?: React.MouseEventHandler
    onMouseOver?: React.MouseEventHandler
    onMouseMove?: (event: React.MouseEvent, featureId?: string) => void
    onMouseUp?: React.MouseEventHandler
    onClick?: React.MouseEventHandler
  }) => {
    
    const height = 20
    let { features, regions, bpPerPx, configTheme, onClick} = props;
    const theme = createJBrowseTheme(configTheme)
    const [region] = regions || [];
    const width = (region.end - region.start) / bpPerPx
    const totalHeight = 500
    


    // const clickHandler = useCallback(
    //   (event: React.MouseEvent) => {
    //     console.log("SVG CLICKED ", event);
    //     const target: any = event.target;
    //     const dataset = target?.dataset;
    //     const index = dataset?.index;
    //     console.log("index  :: ", index);
    //     setSelectedIndex(index);
    //     onClick?.(event)
    //   },
    //   [],
    // )

    
    
    const clickHandler = (event: React.MouseEvent) => {
      console.log("event  ", event);
      //selectedIndex = 25;//event.target.dataset.index;
      const target: any = event.target;
      const dataset = target?.dataset;
      selectedIndex = dataset?.index;
      console.log("index  :: ", selectedIndex);
    }
    const [feature, setFeature] = useState(Array.from(features.values()));
    
    console.log("feature  ",feature);

    const feature0 = feature[0];
  
  
    

    

    return (
        <div>
          
            {/* <KeyDown OnSvgClick={clickHandler} childToParent={childToParent} feature={feature0} regions={regions} bpPerPx={bpPerPx} height={height} theme={theme} /> */}
            <KeyDown OnSvgClick={clickHandler} selectedIndex={selectedIndex} feature={feature0} regions={regions} bpPerPx={bpPerPx} height={height} theme={theme} />
          
        </div>
    )
}

const [data, setData] = useState('');

const keyDownEventHandler = (childdata: any, props: any) => {
  let { features, regions, bpPerPx, configTheme, onClick} = props;
  const [qbt, setQbt] = useState('');
  console.log('childToParent :: ', childdata);
  //let selectedIndex = 25;
  console.log("selectedIndex ", selectedIndex);
  const featureValues: any = Array.from(features.values());
  console.log("featureValues ",featureValues);

  if(childdata[0] !== 0 && selectedIndex > -1 && childdata[0] !== qbt.charAt(selectedIndex)) {
    let qbtarr = featureValues[0].get("QBT");
    console.log("QBT ARR ", qbtarr);
    if(childdata[2] !== BaseOperationEnum.NONE) {
      if(childdata[2] === BaseOperationEnum.UPDATE) {
        qbtarr[selectedIndex] = childdata[0];
      } else if(childdata[2] === BaseOperationEnum.DELETE) {
        qbtarr[selectedIndex] = "-";
      }
      childdata[2] = BaseOperationEnum.NONE;
      setQbt(qbtarr.join(""));
    }
    //qbtstr.replace("A", "a");
    
   // feature0.set("name", "MODIFIED_"+childdata[0]);
    console.log("FEATURE 0 NEWLY ADDED ", featureValues[0]);
    //setFeature(Array.from(features.values()));
  }
}

function SequenceRendering(props: SequenceProps) {
  console.log("SEQUENCE RENDERING ", props);
  const keydata: any = useKeyDown();
  console.log("KEY DATA ",props);
  keyDownEventHandler(keydata, props)

  return (
    <Wrapper {...props} />
  )
}

export default observer(SequenceRendering)