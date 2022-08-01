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

function Electropherogram(props: {
  theme: any
  bpPerPx: number
  height: number
  region: Region
  feature: Feature
  y: number
  config: any
}) {

  const { bpPerPx, region, feature, theme, height, y, config } = props
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
        {
          <Electropherogram height={height}
          y={(currY += 20)}
          feature={feature}
          region={region}
          bpPerPx={bpPerPx}
          theme={theme} config={config}></Electropherogram>
        }
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
    </Wrapper>
  )
}

export default observer(Sequence)
