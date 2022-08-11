import React, { useEffect, useRef, useState, useCallback } from 'react'
import useKeyDown from './useKeyDown';
import { Feature } from '@jbrowse/core/util/simpleFeature'
import { Region } from '@jbrowse/core/util/types'
import { contrastingTextColor } from '@jbrowse/core/util/color'
import { bpSpanPx } from '@jbrowse/core/util'

interface ISequence {
  height: number, feature: Feature, region: Region, bpPerPx: number, theme: any
}

const DNA = (props: ISequence) =>{
  
  const { bpPerPx, region, feature, theme, height} = props
  console.log("PROPS:  ", props);
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
    const y = 0;
  const qbtarr = feature.get("QBT");
  console.log("QBT ARRAY :: ", qbtarr);
  return (
    <>
      {qbtarr.map((letter: string, index: number) => {
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



export const KeyDown = (props: {OnSvgClick: any, selectedIndex: number, feature: any, regions: any, bpPerPx: number, height: any, theme: any}) => {
 
  const {OnSvgClick, feature, selectedIndex, regions, bpPerPx, height, theme} = props;

  console.log("FEATURE ", feature);
  const [region] = regions || [];
  const width = (region.end - region.start) / bpPerPx
  const totalHeight = 500
  const len = feature.get('end') - feature.get('start')
  const [leftPx, rightPx] = bpSpanPx(
    feature.get('start'),
    feature.get('end'),
    region,
    bpPerPx,
  )
  const w = Math.max((rightPx - leftPx) / len, 0.8)
  const svgClickHandler = (event: React.MouseEvent) => {
    OnSvgClick(event);
  }

  
  return (
    <div data-testid="seq_wrapper" style={{position: `relative`, width, height: totalHeight}}>
      {selectedIndex ? 
      (<div data-testid="base_select" 
      style={{width: w, height: totalHeight, left:  leftPx + selectedIndex * w + `px`, 
        border: `1px dashed black`, 
        position: `absolute`}}
      >-</div>): null}
      <svg
            data-testid="sequence_track_New"
            width={width}
            height={totalHeight}
            style={{ width, height: totalHeight - 100}}
            onClick={svgClickHandler}
          >
        <DNA height={height} feature={feature} region={region} bpPerPx={bpPerPx} theme={theme} />
      </svg>
      </div>
  );
}

export default KeyDown;
