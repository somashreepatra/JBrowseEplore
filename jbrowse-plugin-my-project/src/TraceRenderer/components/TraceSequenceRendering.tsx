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
import { SequenceProps } from './ITrace'


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
    const clickHandler = useCallback(
      (event: React.MouseEvent) => {
        console.log("SVG CLICKED ", event);
        if(true) {
          
        }
        onClick?.(event)
      },
      [],
    )
    const [feature, setFeature] = useState(Array.from(features.values()));
    const [qbt, setQbt] = useState('');
    console.log("feature  ",feature);

  const feature0 = feature[0];
  
  
    const childToParent = (childdata: any) => {
      console.log('childToParent :: ', childdata, feature0);
      
      if(childdata[0] !== 0 && childdata[0] !== qbt.charAt(25)) {
        let qbtarr = feature0.get("QBT");
        qbtarr[25] = childdata[0];
        //qbtstr.replace("A", "a");
        
        setQbt(qbtarr.join(""));
       // feature0.set("name", "MODIFIED_"+childdata[0]);
        console.log("FEATURE 0 ", feature0);
        //setFeature(Array.from(features.values()));
      }
      
    }

    return (
        <div>
          <svg
            data-testid="sequence_track"
            width={width}
            height={totalHeight}
            style={{ width, height: totalHeight - 100}}
            onClick={clickHandler}
          >
            <KeyDown childToParent={childToParent} feature={feature0} region={region} bpPerPx={bpPerPx} height={height} theme={theme} />
          </svg>
        </div>
    )
}

const [data, setData] = useState('');

function SequenceRendering(props: SequenceProps) {
  console.log("SEQUENCE RENDERING ", props);
  return (
    <Wrapper {...props} />
  )
}

export default observer(SequenceRendering)