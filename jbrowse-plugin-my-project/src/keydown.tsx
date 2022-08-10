import React from 'react';
import useKeyDown from './useKeyDown';
import { Feature } from '@jbrowse/core/util/simpleFeature'
import { Region } from '@jbrowse/core/util/types'
import { contrastingTextColor } from '@jbrowse/core/util/color'
import { bpSpanPx } from '@jbrowse/core/util'

// height={height}
// feature={feature}
// region={region}
// bpPerPx={bpPerPx}
// theme={theme}

// function DNA(props: {
//   seq: string
//   theme: any
//   bpPerPx: number
//   height: number
//   region: Region
//   feature: Feature
// }) 

interface ISequence {
  height: number, feature: Feature, region: Region, bpPerPx: number, theme: any
}

const DNA = (props: ISequence) =>{
  
  const { bpPerPx, region, feature, theme, height} = props
  console.log("PROPS:  ", props);
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

export const KeyDown = (props: {childToParent: any, feature: any, region: any, bpPerPx: number, height: any, theme: any}) => {
  const [x, y] = useKeyDown();
  const {childToParent, feature, region, bpPerPx, height, theme} = props;

  {childToParent([x,y])}
  console.log("FEATURE ", feature);
  return (
    // <h1>
    //   The key is ({x}, {y}): from plugin
    
    //   <div>{feature}</div>
    // </h1>
    <>
      <DNA height={height} feature={feature} region={region} bpPerPx={bpPerPx} theme={theme} />
    </>
  );
}

export default KeyDown;
