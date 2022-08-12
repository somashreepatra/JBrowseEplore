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
import { bpSpanPx } from '@jbrowse/core/util'
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
    // const [region] = regions || [];
    // const width = (region.end - region.start) / bpPerPx
    // const totalHeight = 500
    


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
    
    console.log("feature , selectedIndex ",feature, selectedIndex);

    const feature0 = feature[0];
    const totalHeight = 500
    const [region] = regions || [];
    const width = (region.end - region.start) / bpPerPx
    const len = feature0.get('end') - feature0.get('start')
    const [leftPx, rightPx] = bpSpanPx(
      feature0.get('start'),
      feature0.get('end'),
      region,
      bpPerPx,
    )
    const w = Math.max((rightPx - leftPx) / len, 0.8)
    

    

    return (
      <div data-testid="seq_wrapper" style={{position: `relative`, width, height: totalHeight}}>
      {selectedIndex ? 
        (<div data-testid="base_select" 
        style={{width: w, height: totalHeight, left:  leftPx + selectedIndex * w + `px`, 
          border: `1px dashed black`, 
          position: `absolute`}}
        >-</div>): null}
          
            {/* <KeyDown OnSvgClick={clickHandler} childToParent={childToParent} feature={feature0} regions={regions} bpPerPx={bpPerPx} height={height} theme={theme} /> */}
            <KeyDown OnSvgClick={clickHandler} selectedIndex={selectedIndex} feature={feature0} regions={regions} bpPerPx={bpPerPx} height={height} theme={theme} />
          
        </div>
    )
}


const keyDownEventHandler = (childdata: any, props: any) => {
  let { features, regions, bpPerPx, configTheme, onClick} = props;
  const [qbt, setQbt] = useState('');
  console.log('childToParent :: ', childdata);
  console.log("selectedIndex ", selectedIndex);
  const featureValues: any = Array.from(features.values());
  console.log("featureValues ",featureValues);

  if(childdata[0] !== 0 && selectedIndex > -1 && childdata[0] !== qbt.charAt(selectedIndex)) {
    let qbtarr = featureValues[0].get("QBT");
    console.log("QBT ARR ", qbtarr);
    qbtarr[selectedIndex] = childdata[0];
    setQbt(qbtarr.join(""));
    console.log("FEATURE 0 ", featureValues[0]);
  }
}

function SequenceRendering(props: SequenceProps) {
  console.log("SEQUENCE RENDERING ", props);
  const keydata: any = useKeyDown();
  console.log("KEY DATA ",keydata);
  // {
  //   operation: BaseOperationEnum.UPDATE,
  //   key: props.key.toLowerCase(),
  //   keyCode: props.keyCode
  // }
  
  //if(keydata[2] === BaseOperationEnum.UPDATE) {
    {keyDownEventHandler([keydata[0], keydata[1]], props)}
  //}
  

  return (
    <Wrapper {...props} />
  )
}

export default observer(SequenceRendering)