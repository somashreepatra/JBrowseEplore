/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
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
interface MyProps {
  exportSVG?: { rasterizeLayers: boolean }
  features: Map<string, Feature>
  regions: Region[]
  bpPerPx: number
  config: AnyConfigurationModel
  highResolutionScaling: number
  theme: any
  showForward: boolean
  showReverse: boolean
  showTranslation: boolean
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
        const yval = 125 - qbdval;
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
  console.log("SIGNALS ", signala, signalc, signalg, signalt);
  const [left, right] = bpSpanPx(
    feature.get('start'),
    feature.get('end'),
    region,
    bpPerPx,
  )
  const qbx = feature.get("QBX");
  let pathdata: string = "";
  const maxa = Math.max(...signala);
  const heightpersignal = height/maxa;
  let str = "";
  for(let i = 0; i < 9; i++) {
    let startindex = qbx[i];
      let endindex = qbx[i+1];
      

      const w = Math.max((endindex - startindex) / len, 0.8); // Total width for 1 base
      console.log("WIDTH ",w);
      for(let j = startindex; j < endindex - 1; j++) {
        const signalj = signala[j];
        const signalj1 = signala[j+1];
        let x = leftPx + j * w;
        let x1 = leftPx + (j+1) * w;
        const [m1, m2] = bpSpanPx(
          heightpersignal * signalj,
          heightpersignal * signalj1,
          region,
          bpPerPx,
        )
        console.log("X1 ",x1, " X ",x);
        console.log("M1 ",m1, " M2 ",m2);
        str += `M ${x} ${m1} L ${x1} ${m2}`;
      }
  }
console.log("STR ",str);

  return (
    <>
      {
      signala.map((signal: number, index: number) => {
        //const color = theme.palette.bases[letter.toUpperCase()]
        const x = reverse ? rightPx - (index + 1) * w : leftPx + index * w
        return (
          <React.Fragment key={index}>
            <g>
              <path
               //d={`${str}`}
                d={`M ${left} 25 C ${left} ${height}, ${right} ${height}, ${right} 0`}
                stroke={stroke}
                strokeWidth={strokeWidth}
                fill="transparent"
                pointerEvents="stroke"
              />
            </g>
          </React.Fragment>
        )
      })}
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
  console.log("DISPLAY DNA ", seq);
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
            />
            {render ? (
              <text
                x={x + w / 2}
                y={y + height / 2}
                dominantBaseline="middle"
                textAnchor="middle"
                fill={color ? contrastingTextColor(color.main) : 'black'}
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

const SequenceSVG = ({
  regions,
  theme: configTheme,
  features = new Map(),
  showReverse,
  showForward,
  showTranslation,
  bpPerPx,
  config
}: any) => {
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
  const signala: number[] = feature.get('Signal_A');
  const signalt: number[] = feature.get('Signal_T');
  const signalg: number[] = feature.get('Signal_G');
  const signalc: number[] = feature.get('Signal_C');
  console.log("SIGNAL A ",signala);
  console.log("SIGNAL C ",signalc);
  console.log("SIGNAL G ",signalg);
  console.log("SIGNAL T ",signalt);
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
          {/* <Electropherogram height={height}
          y={(currY += 20)}
          feature={feature}
          region={region}
          bpPerPx={bpPerPx}
          theme={theme} config={config}></Electropherogram>
          <QualityBars height={height}
          y={(currY += 20)}
          feature={feature}
          region={region}
          bpPerPx={bpPerPx}
          theme={theme} config={config}></QualityBars> */}
    </>
  )
  
}

const Wrapper = ({ exportSVG, width, totalHeight, children }: any) => {
  return exportSVG ? (
    <>{children}</>
  ) : (
    <svg
      data-testid="sequence_track"
      width={width}
      height={totalHeight}
      style={{ width, height: totalHeight }}
    >
      {children}
    </svg>
  )
}

function Sequence(props: MyProps) {
  console.log("SEQUENCE ", props);
  const { regions, bpPerPx } = props
  const [region] = regions
  const width = (region.end - region.start) / bpPerPx
  const totalHeight = 200

  return (
    <Wrapper {...props} totalHeight={totalHeight} width={width}>
      <SequenceSVG {...props} />
      <Electropherogram {...props}></Electropherogram>
      <QualityBars {...props}></QualityBars>
    </Wrapper>
  )
}

export default observer(Sequence)
