/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import { createJBrowseTheme } from '@jbrowse/core/ui'
import { observer } from 'mobx-react'

import {KeyDown} from '../../keydown';
import { ISequenceProps } from './ITrace'
import {
  bpSpanPx
} from '@jbrowse/core/util'
import { readConfObject } from '@jbrowse/core/configuration'

const QualityBars = ({
  regions,
  theme: configTheme,
  features = new Map(),
  bpPerPx
}: any) => {

  const [region] = regions
  const [feature] = [...features.values()]
  if (!feature) {
    return null
  }
  const seq: string = feature.get('seq')
  if (!seq) {
    return null
  }
  const render = 1 / bpPerPx >= 12
  const start = feature.get('start') || 0;
  const [leftPx, rightPx] = bpSpanPx(
    start,
    feature.get('end'),
    region,
    bpPerPx,
  )
  const regionstart = region.start || 0
  
  const peakStartIndex = Math.abs(regionstart - start); 
  const len = feature.get('end') - start
  const w = Math.max((rightPx - leftPx) / len, 0.8)
  const adjust = (start - regionstart + peakStartIndex) * w;
  const qbd = feature.get('QBD');
  
  
  const stl = `fill:'blue';stroke:'pink';stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9`;
  const width = (region.end - region.start) / bpPerPx
  const barHeight = 100
  
  return (
    <React.Fragment>
    { 
      qbd ? 
        <svg
            data-testid="sequence_track_QB"
            width={width}
            height={barHeight}
            style={{ width, height: barHeight}}>
          {
            qbd?.map((qbdval: number, index: number) => {
            //const color = theme.palette.bases[letter.toUpperCase()]
            const x = adjust + (w * index);
            //const x = leftPx + index * w;
            const yval = 100 - qbdval;
            return (
              <React.Fragment key={index}>
                <rect x={x} y={yval} width={w} height={qbdval} fill='blue' style={{fill: 'blue'}} />
              </React.Fragment>
              )
            })
          }
        </svg> : null }
    </React.Fragment>
  )
}

const Electropherogram = ({
  regions,
  theme: configTheme,
  features = new Map(),
  bpPerPx,
  config
}: any) => {

  const [region] = regions
  const height = 200
  const [feature] = [...features.values()]
  if (!feature || ! feature.get('signaldata')) {
    return null
  }
  const seq: string = feature.get('seq')
  if (!seq) {
    return null
  }
  
  const [leftPx, rightPx] = bpSpanPx(
    feature.get('start'),
    feature.get('end'),
    region,
    bpPerPx,
  )
  const len = feature.get('end') - feature.get('start')
  const w = Math.max((rightPx - leftPx) / len, 0.8)
  const signaldata = feature.get('signaldata');
  
  const signala = signaldata[0];// feature.get('Signal_A');
  const signalc = signaldata[1]; //feature.get('Signal_T');
  const signalg = signaldata[2]; //feature.get('Signal_G');
  const signalt = signaldata[3]; //feature.get('Signal_C');
  const strokeWidth = readConfObject(config, 'thickness', { feature }) || 1
  const regionstart = region.start || 0
  const regionend = region.end || 0
  const start = feature.get('start');
  let paths = {A: '', T: '', G: '', C: ''};
  const maxa = Math.max(...signala);
  const heightpersignal = (height)/maxa;
  const topY = 150;

  const gappedPeakLocation = feature.get("gappedPeakLocation");
  const peakStartIndex = Math.abs(regionstart - start); 
  const gappedarr = gappedPeakLocation.slice(peakStartIndex, peakStartIndex + 1 + (regionend - regionstart));
  gappedarr.forEach((base: number, baseIndex: number) => {
    let pathdata: string = ``;
    if(baseIndex < gappedarr.length - 1) {
      const start = base, end = gappedarr[baseIndex + 1];
      const diff = end - start;
      const scale = (w/diff);

      const adjust = (feature.get('start') - regionstart + peakStartIndex) * w;
      const leftpos = adjust + (w * baseIndex);
      // const leftpos = 0;
      console.log('gappedPeakLocation start end', base, baseIndex, start, end, leftpos, regionstart);
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

  // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  // arc(x, y, radius, startAngle, endAngle, counterclockwise)
  const width = (region.end - region.start) / bpPerPx;
  const totalHeight = 200;
  
  return (
    <React.Fragment>
      <svg data-testid="sequence_track_EL" width={width} height={totalHeight} style={{ width, height: totalHeight}}>
        <g data-testid={`seq_g_${regionstart}`} transform={`translate(0 0)`}>
            <path data-testid={`seq_path_a_${regionstart}`}
              d={paths.A}
              stroke={'green'}
              strokeWidth={strokeWidth}
              fill="transparent"
              pointerEvents="stroke"
            />
            <path data-testid={`seq_path_t_${regionstart}`}
              d={paths.T}
              stroke={'red'}
              strokeWidth={strokeWidth}
              fill="transparent"
              pointerEvents="stroke"
            />
            <path data-testid={`seq_path_g_${regionstart}`}
              d={paths.G}
              stroke={'orange'}
              strokeWidth={strokeWidth}
              fill="transparent"
              pointerEvents="stroke"
            />
            <path data-testid={`seq_path_c_${regionstart}`}
              d={paths.C}
              stroke={'blue'}
              strokeWidth={strokeWidth}
              fill="transparent"
              pointerEvents="stroke"
            /> 
        </g>
      </svg>
    </React.Fragment>
  )
}

const Wrapper = (props: ISequenceProps) => {
    let { features, displayModel, regions, bpPerPx, configTheme} = props;
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

    //const [isAddBase, setAddBase] = useState(false);

    // const dblClickHandler = useCallback(
    //   (event: React.MouseEvent) => {
    //     console.log("SVG CLICKED ", event);
    //     setAddBase(true);
    //     onDblClick?.(event)
    //   },
    //   [],
    // )
    
    // const svgDoubleClickHandler = (event: React.MouseEvent) => {
    //   console.log("SVG DOUBLE CLICKED ", event);
    //   setAddBase(true);
    // }
    const feature = Array.from(features.values());
    const clickHandler = (event: React.MouseEvent) => {
      console.log("click event  ", event);
      const target: any = event.target;
      const dataset = target?.dataset;
      displayModel.toggleShowEditInput();
      
      displayModel.setEditstartposition(dataset?.left+ "px");
      displayModel.setEditfeatureindex(dataset?.index);
      displayModel.setEditbasevalue(dataset?.base);
      displayModel.setEditInputwidth(dataset?.rectwidth+ "px");
    }
  
    return (
      <KeyDown {...props} />
    )
}

function SequenceRendering(props: ISequenceProps) {
  console.log("SEQUENCE RENDERING ", props);
  let { features } = props;
  return (
    <React.Fragment>
      {features?.size ?
      (<React.Fragment>
        {props.showQualityBars ? <QualityBars {...props}></QualityBars> : null}
        <Wrapper {...props} />  
        {props.showElectropherogram ? <Electropherogram {...props}></Electropherogram> : null }
      </React.Fragment>) : null}
    </React.Fragment>
  )
}

export default observer(SequenceRendering)