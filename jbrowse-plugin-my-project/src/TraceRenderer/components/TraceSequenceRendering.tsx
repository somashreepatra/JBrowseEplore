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
import { model } from 'mobx-state-tree/dist/internal'


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
  const seq: string = feature.get('gappedSeq')
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
  const signaldata = feature.get('signaldata');
  const signala = signaldata[0];// feature.get('Signal_A');
  const signalc = signaldata[1]; //feature.get('Signal_T');
  const signalg = signaldata[2]; //feature.get('Signal_G');
  const signalt = signaldata[3]; //feature.get('Signal_C');
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

  const regionstart = region.start || 0
  const regionend = region.end || 0

  const [regionleftPx, regionrightPx] = bpSpanPx(
    regionstart,
    regionend,
    region,
    bpPerPx,
  )

  //const qbx = feature.get("QBX");
  let pathdatastr: string = ``;
  let paths = {A: '', T: '', G: '', C: ''};
  const maxa = Math.max(...signala);
  const heightpersignal = (height)/maxa;
  const topY = 150;
  const gappedPeakLocation = feature.get("gappedPeakLocation");
  const gappedarr = gappedPeakLocation.slice(23, 24 + (regionend - regionstart));

  console.log('gappedPeakLocation', regionstart, regionend, feature.get('start'), feature.get('end'), (regionend - regionstart), gappedarr)
  gappedarr.forEach((base: number, baseIndex: number) => {
    let pathdata: string = ``;
    if(baseIndex < gappedarr.length - 1) {
      const start = base, end = gappedarr[baseIndex + 1];
      const diff = end - start;
      const scale = (w/diff);

      const adjust = (feature.get('start') - regionstart + 23) * w;
      const leftpos = regionleftPx + adjust + (w * baseIndex);

      signala.slice(start, end + 1).forEach((val: number, index: number) => {        
        const x = leftpos + (index * scale);
        if(index === 0) {
          pathdata +=  `M${leftpos} ${topY - (val * heightpersignal)}`;
        }
        // pathdata += `A 2 2 0 1 1 ${x} ${val * heightpersignal}`;
        pathdata += `L ${x} ${topY - (val * heightpersignal)}`;
      });
      paths['A'] += pathdata;

      pathdata = '';
      signalt.slice(start, end + 1).forEach((val: number, index: number) => {        
        const x = leftpos + (index * scale);
        if(index === 0) {
          pathdata +=  `M${leftpos} ${topY - (val * heightpersignal)}`;
        }
        pathdata += `L ${x} ${topY - (val * heightpersignal)}`;
      });
      paths['T'] += pathdata;

      pathdata = '';
      signalc.slice(start, end + 1).forEach((val: number, index: number) => {        
        const x = leftpos + (index * scale);
        if(index === 0) {
          pathdata +=  `M${leftpos} ${topY - (val * heightpersignal)}`;
        }
        pathdata += `L ${x} ${topY - (val * heightpersignal)}`;
      });
      paths['C'] += pathdata;

      pathdata = '';
      signalg.slice(start, end + 1).forEach((val: number, index: number) => {        
        const x = leftpos + (index * scale);
        if(index === 0) {
          pathdata +=  `M${leftpos} ${topY - (val * heightpersignal)}`;
        }
        pathdata += `L ${x} ${topY - (val * heightpersignal)}`;
      });
      paths['G'] += pathdata;

    }

  });
  // paths['A'] = pathdatastr;
  console.log('allpathdata',  paths);
  

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
              stroke={'red'}
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
    displayModel: any
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
    let { features, displayModel, regions, bpPerPx, configTheme, onDblClick} = props;
    const theme = createJBrowseTheme(configTheme)
    
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
    const feature = Array.from(features.values());
    const feature0 = feature[0];
    const clickHandler = (event: React.MouseEvent) => {
      console.log("click event  ", event);
      const target: any = event.target;
      const dataset = target?.dataset;
      selectedIndex = dataset?.index;
      displayModel.toggleShowEditInput();
      
      displayModel.setEditstartposition(dataset?.left+ "px");
      displayModel.setEditfeatureindex(dataset?.index);
      displayModel.setEditbasevalue(dataset?.base);
      displayModel.setEditInputwidth(dataset?.rectwidth+ "px");
    }
  
    return (
        <div>
            <KeyDown isAddBase={isAddBase} OnSvgClick={clickHandler} OnSvgDoubleClick={svgDoubleClickHandler} selectedIndex={selectedIndex} feature={feature0} regions={regions} bpPerPx={bpPerPx} height={height} theme={theme} />
        </div>
    )
}

const [data, setData] = useState('');

const keyDownEventHandler = (childdata: any, props: any) => {
  let { features, regions, bpPerPx, configTheme, onClick} = props;
  const [qbt, setQbt] = useState('');
  const featureValues: any = Array.from(features.values());
  if(childdata[0] !== 0 && selectedIndex > -1 && childdata[0] !== qbt.charAt(selectedIndex)) {
    //let qbtarr = featureValues[0].get("QBT");
    const gappedSeq = featureValues[0].get("gappedSeq");
    const qbtarr = gappedSeq.split("");
    if(childdata[2] !== BaseOperationEnum.NONE) {
      if(childdata[2] === BaseOperationEnum.UPDATE) {
        qbtarr[selectedIndex] = childdata[0];
      } else if(childdata[2] === BaseOperationEnum.DELETE) {
        qbtarr[selectedIndex] = "-";
      } else if(childdata[2] === BaseOperationEnum.ADD) {
        const newselected = ++selectedIndex;
        qbtarr.splice(newselected, 0, childdata[0]);
      }
      childdata[2] = BaseOperationEnum.NONE;
      setQbt(qbtarr.join(""));
    }
  }
}

function SequenceRendering(props: any) {
  console.log("SEQUENCE RENDERING ", props);
  //const keydata: any = useKeyDown();
  //keyDownEventHandler(keydata, props)
  let {
    features,
    regions,
    bpPerPx
  } = props;
  const [region] = regions || [];
  const width = (region.end - region.start) / bpPerPx
  const totalHeight = 200
  return (
    <div >
      {features?.size ?
      (  
      <div><svg
          data-testid="sequence_track_QB"
          width={width}
          height={totalHeight - 100}
          style={{ width, height: totalHeight - 100}}
        >
          <QualityBars {...props}></QualityBars> 
        </svg>
        <Wrapper {...props} />
        <svg
          data-testid="sequence_track_EL"
          width={width}
          height={totalHeight}
          style={{ width, height: totalHeight}}
        >
          <Electropherogram {...props}></Electropherogram>
        </svg></div>) : null}
      
    </div>
  )
}

export default observer(SequenceRendering)