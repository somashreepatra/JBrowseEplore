/* eslint-disable @typescript-eslint/no-explicit-any */
//import React from 'react'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { AnyConfigurationModel } from '@jbrowse/core/configuration/configurationSchema'
import { contrastingTextColor } from '@jbrowse/core/util/color'
import { Feature } from '@jbrowse/core/util/simpleFeature'
import { Region } from '@jbrowse/core/util/types'
import { createJBrowseTheme } from '@jbrowse/core/ui'
import { observer } from 'mobx-react'
import {
  bpSpanPx,
  revcom,
  complement,
  defaultStarts,
  defaultStops,
  defaultCodonTable,
  generateCodonTable,
} from '@jbrowse/core/util'
import { readConfObject } from '@jbrowse/core/configuration'
import KeyDown from '../../keydown'

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
  const height = 120
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
  const topY = 300;
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

function DNA(props: {
  seq: string
  theme: any
  bpPerPx: number
  height: number
  region: Region
  feature: Feature
  y: number
}) {
  
  const { bpPerPx, region, feature, theme, height, seq, y } = props
  // console.log("DISPLAY DNA ", seq);
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

  return (
    <>
      {seq.split('').map((letter, index) => {
        const color = theme.palette.bases[letter.toUpperCase()]
        const x = reverse ? rightPx - (index + 1) * w : leftPx + index * w
        return (
          <React.Fragment key={index}>
            <rect
              x={x}
              y={y}
              width={w}
              height={height}
              fill={color ? color.main : '#aaa'}
              stroke={render ? '#555' : 'none'}
              data-index={index}
            />
              
            {render ? (
              <text
                x={x + w / 2}
                y={y + height / 2}
                dominantBaseline="middle"
                textAnchor="middle"
                fill={color ? contrastingTextColor(color.main) : 'black'}
                data-index={index}
              >
                {letter}
              </text>
            ) : null}
            
          </React.Fragment>
        )
      })}
    </>
  )
}

const SequenceSVG = (props: {
  features: Map<string, Feature>, 
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
  const {
    features = new Map(),
    regions,
    bpPerPx,
    config,
    configTheme,
    showForward,
    showReverse,
    showTranslation,
    onMouseOut,
    onMouseDown,
    onMouseLeave,
    onMouseEnter,
    onMouseOver,
    onMouseMove,
    onMouseUp,
    onClick,
  } = props
  const [region] = regions || []
  const width = (region.end - region.start) / bpPerPx
  const displayMode = readConfObject(config, 'displayMode') as string

  const ref = useRef<SVGSVGElement>(null)
  const [mouseIsDown, setMouseIsDown] = useState(false)
  //const [height, setHeight] = useState(0)
  const [movedDuringLastMouseDown, setMovedDuringLastMouseDown] =
    useState(false)
  const mouseDown = useCallback(
    (event: React.MouseEvent) => {
      setMouseIsDown(true)
      setMovedDuringLastMouseDown(false)
      return onMouseDown?.(event)
    },
    [onMouseDown],
  )

  const mouseUp = useCallback(
    (event: React.MouseEvent) => {
      setMouseIsDown(false)
      return onMouseUp?.(event)
    },
    [onMouseUp],
  )

  const mouseMove = useCallback(
    (event: React.MouseEvent) => {

      // if (!ref.current) {
      //   return
      // }
      // if (mouseIsDown) {
      //   setMovedDuringLastMouseDown(true)
      // }
      // const { left, top } = ref.current.getBoundingClientRect()
      // const offsetX = event.clientX - left
      // const offsetY = event.clientY - top
      // const px = region.reversed ? width - offsetX : offsetX
      // const clientBp = region.start + bpPerPx * px

      // const featureIdCurrentlyUnderMouse = displayModel.getFeatureOverlapping?.(
      //   blockKey,
      //   clientBp,
      //   offsetY,
      // )

      // if (onMouseMove) {
      //   onMouseMove(event, featureIdCurrentlyUnderMouse)
      // }
    },
    [
      bpPerPx,
      mouseIsDown,
      onMouseMove,
      region.reversed,
      region.start,
      width,
    ],
  )

  const click = useCallback(
    (event: React.MouseEvent, featureId: string) => {
      // don't select a feature if we are clicking and dragging
      if (movedDuringLastMouseDown) {
        return
      }
      onClick?.(event)
    },
    [movedDuringLastMouseDown, onClick],
  )




  
  //const [region] = regions
  const theme = createJBrowseTheme(configTheme)
  const codonTable = generateCodonTable(defaultCodonTable)
  const height = 20
  const [feature]= Array.from(features.values());
  if (!feature) {
    return null
  }
  const seq: string = feature.get('seq')
  if (!seq) {
    return null
  }
  const signala: number[] = feature.get('Signal_A');
  const signalt: number[] = feature.get('Signal_T');
  const signalg: number[] = feature.get('Signal_G');
  const signalc: number[] = feature.get('Signal_C');

  // incrementer for the y-position of the current sequence being rendered
  // (applies to both translation rows and dna rows)
  let currY = -20

  return (
    <>
     <DNA
          height={height}
          y={(currY += 20)}
          feature={feature}
          region={region}
          seq={region.reversed ? complement(seq) : seq}
          bpPerPx={bpPerPx}
          theme={theme}
      />
        
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
  }) => {
    let {
      exportSVG,
      features,
      regions,
      bpPerPx,
      config,
      configTheme,
      showForward,
      showReverse,
      showTranslation,
      onMouseOut,
      onMouseDown,
      onMouseLeave,
      onMouseEnter,
      onMouseOver,
      onMouseMove,
      onMouseUp,
      onClick,
    } = props;
  const [region] = regions || [];
  const width = (region.end - region.start) / bpPerPx
  const height = 100
  const totalHeight = 500
  const widthnew = (region.end - region.start) / bpPerPx;
  const displayMode = readConfObject(config, 'displayMode') as string

  const ref = useRef<SVGSVGElement>(null)
  const [mouseIsDown, setMouseIsDown] = useState(false)
  //const [height, setHeight] = useState(0)
  const [movedDuringLastMouseDown, setMovedDuringLastMouseDown] = useState(false)
  const [isSelectBase, setSelectBase] = useState(0)
  const [feature] = Array.from(features.values())
  const [leftPx, rightPx] = bpSpanPx(
    feature.get('start'),
    feature.get('end'),
    region,
    bpPerPx,
  )
  const qbd = feature.get('QBD');
  const len = feature.get('end') - feature.get('start')
  const w = Math.max((rightPx - leftPx) / len, 0.8)

  const mouseDown = useCallback(
    (event: React.MouseEvent) => {
      setMouseIsDown(true)
      setMovedDuringLastMouseDown(false)
      return onMouseDown?.(event)
    },
    [onMouseDown],
  )

  const mouseUp = useCallback(
    (event: React.MouseEvent) => {
      setMouseIsDown(false)
      return onMouseUp?.(event)
    },
    [onMouseUp],
  )

  const mouseMove = useCallback(
    (event: React.MouseEvent) => {

      // if (!ref.current) {
      //   return
      // }
      // if (mouseIsDown) {
      //   setMovedDuringLastMouseDown(true)
      // }
      // const { left, top } = ref.current.getBoundingClientRect()
      // const offsetX = event.clientX - left
      // const offsetY = event.clientY - top
      // const px = region.reversed ? width - offsetX : offsetX
      // const clientBp = region.start + bpPerPx * px

      // const featureIdCurrentlyUnderMouse = displayModel.getFeatureOverlapping?.(
      //   blockKey,
      //   clientBp,
      //   offsetY,
      // )

      // if (onMouseMove) {
      //   onMouseMove(event, featureIdCurrentlyUnderMouse)
      // }
    },
    [
      bpPerPx,
      mouseIsDown,
      onMouseMove,
      region.reversed,
      region.start,
      width,
    ],
  )

  const click = useCallback(
    (event: React.MouseEvent) => {

      console.log("SVG CLICKED ", event, features, region, bpPerPx, width);

      console.log("EVENT TARGET ",event.target);
      // don't select a feature if we are clicking and dragging
      const et: any = event.target as Element;
      let index = et.getAttribute('data-index')
     
      console.log("INDEX",index);
      if(index !== undefined || index !== null) {
        setSelectBase(index);
      }
      if (movedDuringLastMouseDown) {
        return
      }


      onClick?.(event)
    },
    [bpPerPx,movedDuringLastMouseDown, onClick,
      region.reversed,
      region.start,
      width],
  )

  
  return (
    // <React.Fragment>
    <div data-testid="seq_wrapper" style={{position: `relative`, width, height: totalHeight}}>
      {isSelectBase ? 
      (<div data-testid="base_select" 
      style={{width: w, height: totalHeight, left:  leftPx + isSelectBase * w + `px`, 
        border: `1px dashed black`, 
        position: `absolute`}}
      >-</div>): null}
      <svg
        data-testid="sequence_track"
        width={width}
        height={height}
        style={{ width, height: height}}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onMouseMove={mouseMove}
        onClick={click}
      >
        <SequenceSVG {...props} />
        <Electropherogram {...props}></Electropherogram>
        <QualityBars {...props}></QualityBars>
      </svg>
      <KeyDown/>
    </div>
    // </React.Fragment>
  )
}

function SequenceRendering(props: SequenceProps) {
  console.log("SEQUENCE RENDERING ", props);

  return (
    <Wrapper {...props} />
  )
}

export default observer(SequenceRendering)
