/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import { AnyConfigurationModel } from '@jbrowse/core/configuration/configurationSchema'
import { contrastingTextColor } from '@jbrowse/core/util/color'
import { Feature } from '@jbrowse/core/util/simpleFeature'
import { Region } from '@jbrowse/core/util/types'
import { createJBrowseTheme } from '@jbrowse/core/ui'
import { observer } from 'mobx-react'

import {KeyDown} from '../../keydown';
import { BaseOperationEnum, SequenceProps } from './ITrace'
import useKeyDown from '../../useKeyDown';
import {
  bpSpanPx,
  defaultCodonTable,
  generateCodonTable,
} from '@jbrowse/core/util'
import { readConfObject } from '@jbrowse/core/configuration'


//const [selectedIndex, setSelectedIndex] = useState(-1);
let selectedIndex = -1;

const QualityBars = ({
  regions,
  theme: configTheme,
  features = new Map(),
  showReverse,
  showForward,
  showTranslation,
  bpPerPx,
  config
}: any) => {

// (props: {
//   theme: any
//   bpPerPx: number
//   height: number
//   region: Region
//   feature: Feature
//   y: number
//   config: any
// }) {

  //const { bpPerPx, region, feature, theme, height, y, config } = props
  const [region] = regions
  const theme = createJBrowseTheme(configTheme)
  const codonTable = generateCodonTable(defaultCodonTable)
  const height = 20
  const [feature] = [...features.values()]
  if (!feature) {
    return null
  }
  const seq: string = feature.get('seq')
  if (!seq) {
    return null
  }
  const render = 1 / bpPerPx >= 12

  const [leftPx, rightPx] = bpSpanPx(
    feature.get('start'),
    feature.get('end'),
    region,
    bpPerPx,
  )
  const qbd = feature.get('QBD');
  const len = feature.get('end') - feature.get('start')
  const w = Math.max((rightPx - leftPx) / len, 0.8)
  const stl = `fill:'blue';stroke:'pink';stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9`;

  // Assume:  Quality bar total height : 100px.
  
  return (
    <>
      {
      qbd.map((qbdval: number, index: number) => {
        //const color = theme.palette.bases[letter.toUpperCase()]
        const x = leftPx + index * w;
        const yval = 100 - qbdval;
        return (
          <React.Fragment key={index}>
            <rect x={x} y={yval} width={w} height={qbdval} fill='blue' style={{fill: 'blue'}} />
            
          </React.Fragment>
        )
      })}
    </>
  )


}

const Electropherogram = ({
  regions,
  theme: configTheme,
  features = new Map(),
  showReverse,
  showForward,
  showTranslation,
  bpPerPx,
  config
}: any) => {

// (props: {
//   theme: any
//   bpPerPx: number
//   height: number
//   region: Region
//   feature: Feature
//   y: number
//   config: any
// }) {

  //const { bpPerPx, region, feature, theme, height, y, config } = props

  const [region] = regions
  const theme = createJBrowseTheme(configTheme)
  const codonTable = generateCodonTable(defaultCodonTable)
  const height = 200
  const [feature] = [...features.values()]
  if (!feature) {
    return null
  }
  const seq: string = feature.get('seq')
  if (!seq) {
    return null
  }
  const render = 1 / bpPerPx >= 12

  const [leftPx, rightPx] = bpSpanPx(
    feature.get('start'),
    feature.get('end'),
    region,
    bpPerPx,
  )
  const reverse = region.reversed
  const len = feature.get('end') - feature.get('start')
  const w = Math.max((rightPx - leftPx) / len, 0.8)
  const signala = feature.get('Signal_A');
  const signalt = feature.get('Signal_T');
  const signalg = feature.get('Signal_G');
  const signalc = feature.get('Signal_C');
  let stroke = 'red';
  const label = readConfObject(config, 'label', { feature })
  const caption = readConfObject(config, 'caption', { feature })
  const strokeWidth = readConfObject(config, 'thickness', { feature }) || 1
  
  const [left, right] = bpSpanPx(
    feature.get('start'),
    feature.get('end'),
    region,
    bpPerPx,
  )


  const qbx = feature.get("QBX");
  let pathdata: string = ``;
  let paths = {A: '', T: '', G: '', C: ''};
  const maxa = Math.max(...signala);
  const heightpersignal = (height)/maxa;
  const topY = 150;
  //console.log("SIGNALS ", signala, signalc, signalg, signalt, height, heightpersignal, w);
  signala.forEach((val: number, index: number) => {
    const x = left + index;// * w;
    if(index === 0) {
      pathdata +=  `M${left} ${topY - (val * heightpersignal)}`;
    }
    // pathdata += `A 2 2 0 1 1 ${x} ${val * heightpersignal}`;
    pathdata += `L ${x} ${topY - (val * heightpersignal)}`;
  });
  paths['A'] = pathdata;

  pathdata = '';
  signalc.forEach((val: number, index: number) => {
    const x = left + index;// * w;
    if(index === 0) {
      pathdata +=  `M${left} ${topY - (val * heightpersignal)}`;
    }
    // pathdata += `A 2 2 0 1 1 ${x} ${val * heightpersignal}`;
    pathdata += `L ${x} ${topY - (val * heightpersignal)}`;
  });
  paths['C'] = pathdata;

  pathdata = '';
  signalg.forEach((val: number, index: number) => {
    const x = left + index;// * w;
    if(index === 0) {
      pathdata +=  `M${left} ${topY - (val * heightpersignal)}`;
    }
    // pathdata += `A 2 2 0 1 1 ${x} ${val * heightpersignal}`;
    pathdata += `L ${x} ${topY - (val * heightpersignal)}`;
  });
  paths['G'] = pathdata;
  
  pathdata = '';
  signalt.forEach((val: number, index: number) => {
    const x = left + index;// * w;
    if(index === 0) {
      pathdata +=  `M${left} ${topY - (val * heightpersignal)}`;
    }
    // pathdata += `A 2 2 0 1 1 ${x} ${val * heightpersignal}`;
    pathdata += `L ${x} ${topY - (val * heightpersignal)}`;
  });
  paths['T'] = pathdata;
  //ctx.arc(x * scaleX, sampleData[x] * scaleY, 2, 0, 2 * Math.PI, true);

  // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  // arc(x, y, radius, startAngle, endAngle, counterclockwise)

  return (
    <>
      <React.Fragment key={1}>
            <g data-testid="seq_g">
              <path data-testid="seq_path_a"
                d={paths.A}
                stroke={'green'}
                strokeWidth={strokeWidth}
                fill="transparent"
                pointerEvents="stroke"
              />
              <path data-testid="seq_path_t"
                d={paths.T}
                stroke={stroke}
                strokeWidth={strokeWidth}
                fill="transparent"
                pointerEvents="stroke"
              />
              <path data-testid="seq_path_g"
                d={paths.G}
                stroke={'orange'}
                strokeWidth={strokeWidth}
                fill="transparent"
                pointerEvents="stroke"
              />
              <path data-testid="seq_path_c"
                d={paths.C}
                stroke={'blue'}
                strokeWidth={strokeWidth}
                fill="transparent"
                pointerEvents="stroke"
              />
            </g>
      </React.Fragment>
    </>
  )
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
    onDblClick?: React.MouseEventHandler
  }) => {
    
    const height = 20
    let { features, regions, bpPerPx, configTheme, onDblClick} = props;
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

    const [isAddBase, setAddBase] = useState(false);

    // const dblClickHandler = useCallback(
    //   (event: React.MouseEvent) => {
    //     console.log("SVG CLICKED ", event);
    //     setAddBase(true);
    //     onDblClick?.(event)
    //   },
    //   [],
    // )
    
    const svgDoubleClickHandler = (event: React.MouseEvent) => {
      console.log("SVG DOUBLE CLICKED ", event);
      setAddBase(true);

    }
    //let leftMousePosition = "0px";
    const [leftMousePosition, setLeftMousePosition] = useState('0px');
    const clickHandler = (event: React.MouseEvent) => {
      console.log("click event  ", event);
      const target: any = event.target;
      //leftMousePosition = event.nativeEvent.offsetX+ "px";
      console.log("leftMousePosition  ",leftMousePosition);
      const dataset = target?.dataset;
      selectedIndex = dataset?.index;
      console.log("index  :: ", selectedIndex);
      setLeftMousePosition(event.nativeEvent.offsetX+ "px");
    }
    const [feature, setFeature] = useState(Array.from(features.values()));
    console.log("feature  ",feature);
    const feature0 = feature[0];
  
    return (
        <div>
            <KeyDown isAddBase={isAddBase} OnSvgClick={clickHandler} OnSvgDoubleClick={svgDoubleClickHandler} leftMousePosition={leftMousePosition} selectedIndex={selectedIndex} feature={feature0} regions={regions} bpPerPx={bpPerPx} height={height} theme={theme} />
        </div>
    )
}

const [data, setData] = useState('');

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
    if(childdata[2] !== BaseOperationEnum.NONE) {
      if(childdata[2] === BaseOperationEnum.UPDATE) {
        qbtarr[selectedIndex] = childdata[0];
      } else if(childdata[2] === BaseOperationEnum.DELETE) {
        qbtarr[selectedIndex] = "-";
      } else if(childdata[2] === BaseOperationEnum.ADD) {
        console.log("ADD OPERATION BEFORE :: ", qbtarr);
        const newselected = ++selectedIndex;
        qbtarr.splice(newselected, 0, childdata[0]);
        console.log("ADD OPERATION AFTER :: ", qbtarr);
      }
      childdata[2] = BaseOperationEnum.NONE;
      console.log("QBT ARRAY BEFORE SETTING")
      setQbt(qbtarr.join(""));
    }
    console.log("FEATURE 0 NEWLY ADDED ", featureValues[0]);
  }
}

function SequenceRendering(props: any) {
  console.log("SEQUENCE RENDERING ", props);
  const keydata: any = useKeyDown();
  console.log("KEY DATA ",props);
  console.log("keydata  ",keydata);
  keyDownEventHandler(keydata, props)
  let {
    regions,
    bpPerPx
  } = props;
  const [region] = regions || [];
  const width = (region.end - region.start) / bpPerPx
  const totalHeight = 200
  
  return (
    <div >
      <svg
        data-testid="sequence_track_New"
        width={width}
        height={totalHeight - 100}
        style={{ width, height: totalHeight - 100}}
      >
        <QualityBars {...props}></QualityBars> 
      </svg>
      <Wrapper {...props} />
      <svg
        data-testid="sequence_track_New"
        width={width}
        height={totalHeight}
        style={{ width, height: totalHeight}}
      >
        <Electropherogram {...props}></Electropherogram>
      </svg>
      
    </div>
  )
}

export default observer(SequenceRendering)