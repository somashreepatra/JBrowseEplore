import React, { useEffect, useRef, useState, useCallback } from 'react'
import useKeyDown from './useKeyDown';
import { Feature } from '@jbrowse/core/util/simpleFeature'
import { Region } from '@jbrowse/core/util/types'
import { contrastingTextColor } from '@jbrowse/core/util/color'
import { bpSpanPx } from '@jbrowse/core/util'
import { useClick } from "./useClick";
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


const childToParent = (childdata: any, selectedIndex: number, feature: any) => {
  console.log('childToParent :: ', childdata, feature);
  //let selectedIndex = 25;
  console.log("selectedIndex ", selectedIndex);
  // if(childdata[0] !== 0 && selectedIndex > -1 && childdata[0] !== qbt.charAt(selectedIndex)) {
  //   let qbtarr = feature.get("QBT");
  //   qbtarr[selectedIndex] = childdata[0];
  //   //qbtstr.replace("A", "a");
    
  //   setQbt(qbtarr.join(""));
  //  // feature0.set("name", "MODIFIED_"+childdata[0]);
  //   console.log("FEATURE 0 ", feature0);
  //   //setFeature(Array.from(features.values()));
  // }
  
}



export const KeyDown = (props: {OnSvgClick: any, selectedIndex: number, feature: any, regions: any, bpPerPx: number, height: any, theme: any}) => {
  //const [x, y] = useKeyDown();
  const {OnSvgClick, feature, selectedIndex, regions, bpPerPx, height, theme} = props;
  //const [selectedIndex, setSelectedIndex] = useState(-1);
  //{childToParent([x,y], selectedIndex, feature)}
  console.log("FEATURE ", feature);
  const [region] = regions || [];
  const width = (region.end - region.start) / bpPerPx
  const totalHeight = 500
  //const [selectedIndex, setSelectedIndex] = useState(-1);

  // const clickHandler = useCallback(
  //   (event: React.MouseEvent) => {
  //     console.log("SVG CLICKED ", event);
  //     const target: any = event.target;
  //     const dataset = target?.dataset;
  //     const index = dataset?.index;
  //     console.log("index  :: ", index);
  //     setSelectedIndex(index);
  //     OnReactClick?.(event)
  //   },
  //   [],
  // )

  const svgClickHandler = (event: React.MouseEvent) => {
    OnSvgClick(event);
    //const index = useClick(event);
  }

  
  return (
    // <h1>
    //   The key is ({x}, {y}): from plugin
    
    //   <div>{feature}</div>
    // </h1>
    // <div onClick={clickHandler} >Testing </div>
      <svg
            data-testid="sequence_track_New"
            width={width}
            height={totalHeight}
            style={{ width, height: totalHeight - 100}}
            onClick={svgClickHandler}
          >
        <DNA height={height} feature={feature} region={region} bpPerPx={bpPerPx} theme={theme} />
      </svg>
  );
}

export default KeyDown;
