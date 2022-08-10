/* eslint-disable @typescript-eslint/no-explicit-any */
//import React from 'react'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { AnyConfigurationModel } from '@jbrowse/core/configuration/configurationSchema'
import { contrastingTextColor } from '@jbrowse/core/util/color'
import { Feature } from '@jbrowse/core/util/simpleFeature'
import { Region } from '@jbrowse/core/util/types'
import { createJBrowseTheme } from '@jbrowse/core/ui'
import { observer } from 'mobx-react'

import KeyDown from '../../keydown';
import { features } from 'process'

interface SequenceProps {
  exportSVG?: boolean
  features: Map<string, Feature>
  regions: Region[]
  bpPerPx: number
  config: AnyConfigurationModel
  highResolutionScaling: number
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
}



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

    let {features, onClick} = props;
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
        <div onClick={clickHandler}>
          <KeyDown childToParent={childToParent} feature={qbt}/>
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