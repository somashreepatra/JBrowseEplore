import React from 'react'
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
  // console.log("DISPLAY DNA ", seq);
  const render = 1 / bpPerPx >= 12
  const start = feature.get('start') || 0
  const end = feature.get('end') || 0

  let [leftPx, rightPx] = bpSpanPx(
    start,
    end,
    region,
    bpPerPx,
  )
  const reverse = region.reversed
  const len = end - start
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

export const KeyDown = (props: {isAddBase: boolean, OnSvgClick: any, OnSvgDoubleClick: any, leftMousePosition: string, selectedIndex: number, feature: any, regions: any, bpPerPx: number, height: any, theme: any}) => {
  const {isAddBase, OnSvgClick, OnSvgDoubleClick, leftMousePosition, feature, selectedIndex, regions, bpPerPx, height, theme} = props;
  console.log("FEATURE ", feature);
  console.log("leftMousePosition inside keydown ",leftMousePosition);
  const [region] = regions || [];
  const width = (region.end - region.start) / bpPerPx
  const totalHeight = 50
  

  const svgClickHandler = (event: React.MouseEvent) => {
    OnSvgClick(event);
  }

  const svgDblClickHandler = (event: React.MouseEvent) => {
    OnSvgDoubleClick(event);
  }
  
  return (
      <div>
        {
          isAddBase ?
          (<div style={{position:"relative"}}> 
            <input name="add_base_ce" title="qualityEditDiv" value="" style={{left: leftMousePosition, position: "absolute", top: "0",width: "10px",fontFamily: "verdana,sans-serif",fontSize: "15px",border: "0",outline: "medium none"}} />
          </div>) : null
        }
        <svg
              data-testid="sequence_track_New"
              width={width}
              height={totalHeight}
              style={{ width, height: totalHeight}}
              onClick={svgClickHandler}
              onDoubleClick={svgDblClickHandler}
            >
          <DNA height={height} feature={feature} region={region} bpPerPx={bpPerPx} theme={theme} />
        </svg>
      </div>
  );
}

export default KeyDown;
